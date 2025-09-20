import { defineConfig } from "drizzle-kit";

// Only require DATABASE_URL when actually running drizzle commands
// This allows the app to build and run with in-memory storage
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("DATABASE_URL not set, drizzle operations will fail. Set DATABASE_URL for database operations.");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl || "postgresql://localhost:5432/placeholder",
  },
});
