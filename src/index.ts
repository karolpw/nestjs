import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { postsTable } from './db/schema';
import { eq } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

let mode = 1; // 0 - insert 1 - update
let IdToUpdate = "8d13221e-cbd9-4e2d-99e2-619142d578bf"; // podaj id do update

async function main() {
  if(mode === 0){
    
    await db.insert(postsTable).values({
      title: "MY first title",
      lead: "Short lead for my first post",
      content: "Content of the first post"
    }).returning();

    const allPosts = await db.select().from(postsTable);
    console.log(allPosts);
  }else if(mode === 1){
    await db.update(postsTable).set({
      title: "New first title" // dodaj kolejne kolumny z update z walidacja czy sa puste
    }).where(eq(postsTable.id, IdToUpdate.toString())).returning();
    
    const allPosts = await db.select().from(postsTable);
    console.log(allPosts);
  }
}


main();