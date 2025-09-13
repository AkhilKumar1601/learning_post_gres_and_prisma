import { Client } from 'pg';
import "dotenv/config";

async function insertData () {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

  try {
    await client.connect();
    const insertQuery = `INSERT INTO users (username, email) VALUES ('gemini2', 'gemini@google.com');DELETE FROM users WHERE username='akhil';');`;
    await client.query(insertQuery);
    console.log("Insertion success");
  } catch (e) {
    console.error("Error while inserting",e);
  } finally {
    await client.end();
  }
}

insertData();