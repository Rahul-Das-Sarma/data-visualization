const db = require("./db/db");

// Function to fetch table names and execute dynamic query
async function fetchDataAndQuery() {
  try {
    await db.connectToDatabase();
    const tableNames = await db.getTableNames();
    const tableName = tableNames[1]; // Choose a table name dynamically
    const dynamicQuery = `SELECT * FROM "${tableName}"`;
    const result = await db.executeQuery(dynamicQuery);
    console.log("Query result:", result);
  } catch (error) {
    console.error("Error fetching data and executing query", error);
  } finally {
    await db.closeConnection();
  }
}

// Call the function to fetch data and execute query
fetchDataAndQuery();
