import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as dotenv from "dotenv"
import * as schema from "../../../migrations/schema"
import { migrate } from "drizzle-orm/postgres-js/migrator";

if (!process.env.DATABASE_URL) {
    console.log("Cannot Find Database Url :(");
}

const client = postgres(process.env.DATABASE_URL as string, {max : 1})
const db = drizzle(client, {schema})

const migrateDB = async () => {
    try {
        console.log("Migrating Client....");
        await migrate( db, {migrationsFolder: "migrations"})
        console.log("Migration Successfull...!!!");
    } catch (error) {
       console.log("Client Migration Error" ,error);
    }
}
migrateDB()
export default db;