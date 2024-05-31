const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const { migrate } = require('drizzle-orm/neon-http/migrator');
const { config } = require('dotenv');

config({ path: '.env' });

const sql = neon(process.env.NEON_DATABASE_URL);
const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });

    console.log('Migration completed');
  } catch (error) {
    console.error('Error during migration:', error);

    process.exit(1);
  }
};

main();
