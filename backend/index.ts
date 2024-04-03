const db = require("./db/db");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;
app.use(cors());
app.use(express.json());

type tableInfo = { table_name: string; table: [] }[];

// Function to fetch table names and execute dynamic query
async function fetchDataAndQuery() {
  try {
    await db.connectToDatabase();
    const finalRes: tableInfo = [];
    const tableNames = await db.getTableNames();

    // Use map instead of forEach to create an array of promises
    const promises = tableNames.map(async (tableName: string) => {
      const dynamicQuery = `SELECT * FROM "${tableName}"`;
      const result = await db.executeQuery(dynamicQuery);
      finalRes.push({ table_name: tableName, table: result });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
    console.log("Query result", finalRes);
    return finalRes;
  } catch (error) {
    console.error("Error fetching data and executing query", error);
  }
  // finally {
  //   await db.closeConnection();
  // }
}

// Call the function to fetch data and execute query
// fetchDataAndQuery();
app.get("/", async (req: Request, res: Response) => {
  const data = (await fetchDataAndQuery()) as tableInfo;
  console.log(data);
  // @ts-ignore
  res.send(data);
});

app.listen(8000, () => {
  console.log("Port is running on ", PORT);
});
