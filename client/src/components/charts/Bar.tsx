import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie, Bubble } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Orange", "Blue"],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
    {
      label: "Popularity of colours",
      data: [55, 23, 96],
      // you can set indiviual colors for each bar
      backgroundColor: [
        "rgba(201, 66, 66, 0.6)",
        "rgba(66, 122, 226, 0.6)",
        "rgba(111, 233, 137, 0.6)",
      ],
      borderWidth: 1,
    },
  ],
};

const BarChart = (props: any) => {
  // const [chartData, setChartData] = useState({
  //   labels: Data.map((data) => data.year),
  //   datasets: [
  //     {
  //       label: "Users Gained ",
  //       data: Data.map((data) => data.userGain),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",

  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  return (
    <div className="App">
      <Pie data={data} />
      <Line data={data} />
      <Doughnut data={data} />
      <Bar data={data} />
      <Bubble
        data={{
          labels: ["Red", "Orange", "Blue"],
          // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
          datasets: [
            {
              label: "Popularity of colours",
              data: [
                {
                  x: 20,
                  y: 30,
                  r: 15,
                },
                {
                  x: 40,
                  y: 10,
                  r: 10,
                },
              ],
              // you can set indiviual colors for each bar
              backgroundColor: [
                "rgba(201, 66, 66, 0.6)",
                "rgba(66, 122, 226, 0.6)",
                "rgba(111, 233, 137, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;
