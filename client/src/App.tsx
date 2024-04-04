import React, { useEffect, useMemo, useState } from "react";
import { getTables } from "./services/table.services";
import BarChart from "./components/charts/Bar";

type TableData = {
  table_name: string;
  table: { [key: string]: number | string }; // Corrected the spelling of "patient"
};

function App() {
  const [apiData, setApiData] = useState<TableData[]>();
  const dataCall = async () => {
    const data: TableData[] = await getTables();
    console.log(data);
    setApiData(data);
  };
  useEffect(() => {
    dataCall();
  }, []);
  // {table_name: table: [string]}
  const filteredBtnNames = useMemo(() => {
    if (!apiData || apiData.length === 0) {
      return []; // Return empty array if apiData is null or empty
    }

    const filteredData = apiData?.map((ele: TableData) => {
      if (ele?.table_name !== "_prisma_migrations") {
        return {
          table_name: ele?.table_name,
          table: Object.keys(ele.table[0]),
        };
      }
    });
    return filteredData;
  }, [apiData]);

  return (
    <div className="p-4 flex">
      <div className="flex flex-col">
        {filteredBtnNames?.map((ele) => {
          return (
            <div className="flex flex-col w-36" key={ele?.table_name}>
              {ele?.table_name && (
                <button
                  className="p-2 bg-cyan-400 text-white rounded-sm m-2"
                  disabled
                >
                  {ele?.table_name}
                </button>
              )}
              {ele?.table.map((tableHeads) => {
                return (
                  <button
                    className="p-2 bg-purple-500 text-white rounded-sm m-2"
                    key={tableHeads}
                  >
                    {tableHeads}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <BarChart />
    </div>
  );
}

export default App;
