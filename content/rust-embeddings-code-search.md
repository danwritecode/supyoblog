---
title: "semantic code search using Rust and OpenAi's Ada-002"
description: "using Rust, pgvector, and OpenAi to generate vector embeddings for code to enable semantic code search." 
img: "https://storage.googleapis.com/pai-images/830feb8afd1342049295ce86bdf62196.png"
---

Our mission: **semantic code search.**

### Steps to achieve our mission:
1. Generate vector embeddings for strings of text that represent code functions
2. Store those embeddings in postgres using pgvector extension
3. Accept a search query which we will also generate an embedding for
4. Use embedding from search query to run KNN (nearest neighbor) search in postgres
5. Profit

Note: the code here is very much a proof of concept. I'm breaking a lot of rules here, it's sloppy and it's purpose was just to see how well it worked.


## Generate embeddings for functions

I started by taking some of the functions that I wrote for this proof of concept and converted them into strings and saved them to a local file:

```rust
fn main() {
    let contents = std::fs::read_to_string("/home/dan/documents/apps/temp/somewhere").unwrap();
    let contents = contents
        .lines()
        .map(|l| l.trim())
        .collect::<String>();

    std::fs::write("/home/dan/documents/apps/temp/somewhere", contents).unwrap();
}
```

Next I took each one of these strings (I abbreviated the contents) and dropped them into a vec of strings and generated then stored these embeddings into my postgres db with pgvector extension installed:

```rust
async fn create_seed_embeddings(pool: &Pool<Postgres>) {
    let vals = vec![
        r#"async fn search(pool: &Pool<Postgres>)"#,
        r#"async fn generate_embeddings(vals: Vec<&str>)"#,
        r#"async fn save_embeddings(pool: &Pool<Postgres>, body: &str, embedding: Vec<f64> )"#,
        r#"async fn get_table_info(pool: &Pool<Postgres>)"#,
    ];
    let embeddings = generate_embeddings(vals.clone()).await;

    if let Ok(embs) = embeddings {
        for (i, emb) in embs.data.iter().enumerate() {
            println!("{:?}", emb.vec);
            save_embeddings(pool, vals[i], emb.vec.clone()).await.unwrap();
        }
    }
}

async fn generate_embeddings(vals: Vec<&str>) -> Result<Embeddings, OpenAiError> {
    dotenv().ok();
    set_key(env::var("OPENAI_KEY").unwrap());

    return Embeddings::create("text-embedding-ada-002", vals, "12312312312").await.unwrap();
}

async fn save_embeddings(pool: &Pool<Postgres>, body: &str, embedding: Vec<f64> ) -> Result<(), sqlx::Error> {
    sqlx::query("INSERT INTO posts (body, embedding) VALUES ($1, $2)")
        .bind(body)
        .bind(embedding)
        .execute(pool)
        .await?;

    Ok(())
}
```

Vectors stored in the DB:
![Postgres vectors](/img/pg_vector_ss.png)


## Searching using nearest neighbor

Now that we have our vectors stored in our DB, we can perform some searches:

```rust
async fn search(pool: &Pool<Postgres>) {
    let search_val = "I'm looking for the function that saves embeddings to the database";
    let embedding = generate_embedding(search_val).await.unwrap().vec;

    let embedding:Vec<f32> = embedding
        .into_iter()
        .map(|e| e as f32)
        .collect();

    let rows = sqlx::query("SELECT * FROM posts ORDER BY embedding <-> $1 LIMIT 5")
        .bind(pgvector::Vector::from(embedding))
        .fetch_all(pool)
        .await
        .unwrap();

    let first_val = rows
        .first()
        .map(|r| {
            let code: String = r.try_get("body").unwrap();
            return code.chars().take(50).collect::<String>();
        });

    println!("result: {:?}", first_val);
}
```

The search value above resulted in the following output: 
```
result: Some("async fn save_embeddings(pool: &Pool<Postgres>, bo")
```

## Conclusion
Getting this working with Rust, Postgres (on supabase), and OpenAi is a pretty simple and straightforward task.

### What's next? 
Ultimately my goal with semantic code search is to help with context limitations with gpt-4. More to come on that. 

