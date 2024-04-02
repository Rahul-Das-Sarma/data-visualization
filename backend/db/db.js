const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// Database connection configuration
const connectionString = process.env.DATABASE_URL;

// Create a new client instance
const client = new Client({
  connectionString: connectionString,
});

// Function to connect to the database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

// Function to fetch table names from the database
async function getTableNames() {
  const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
    `;

  try {
    const result = await client.query(query);
    return result.rows.map((row) => row.table_name);
  } catch (error) {
    console.error("Error fetching table names", error);
    throw error;
  }
}

// Function to execute a dynamic query
async function executeQuery(query) {
  try {
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

// Function to close the database connection
async function closeConnection() {
  try {
    await client.end();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error closing database connection", error);
  }
}

module.exports = {
  connectToDatabase,
  getTableNames,
  executeQuery,
  closeConnection,
};
