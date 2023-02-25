import { ChartDataInterface } from "../@types/data";

export const updateChartData = (
  chartData: ChartDataInterface,
  date: Date,
  fullCount: number | null,
  halfCount: number | null
): ChartDataInterface => {
  const dateObj = new Date(date);
  fullCount = fullCount
    ? fullCount
    : chartData.datasets[0].data[chartData.datasets[0].data.length - 1];
  fullCount = !fullCount ? 0 : fullCount;
  halfCount = halfCount
    ? halfCount
    : chartData.datasets[1].data[chartData.datasets[0].data.length - 1];
  halfCount = !halfCount ? 0 : halfCount;

  if (chartData.labels.length >= 10) {
    chartData.labels.shift();
    chartData.datasets[0].data.shift();
  }

  chartData.labels.push(
    `${dateObj.getHours()}:${dateObj
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dateObj.getSeconds().toString().padStart(2, "0")}`
  );

  chartData.datasets[0].data.push(fullCount);
  chartData.datasets[1].data.push(halfCount);

  return chartData;
};
