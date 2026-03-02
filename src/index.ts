import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './db/schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function main() {
  await db.insert(usersTable).values({ name: 'John', age: 30, email: 'john@example.com' });
  const allUsers = await db.select().from(usersTable);
  console.log(allUsers);
}

main();