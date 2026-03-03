import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { postsTable } from './db/schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function main() {
  await db.insert(postsTable).values({
    title: "MY first title",
    lead: "Short lead for my first post",
    content: "Content of the first post"
  }).returning();
  const allPosts = await db.select().from(postsTable);
  console.log(allPosts);
}

main();