import { ChartDataInterface } from "../@types/data";

export const updateChartData = (
  chartData: ChartDataInterface,
  date: Date,
  fullCount: number | null,
  halfCount: number | null
): ChartDataInterface => {

  const dateObj = new Date(date);

  if (chartData.labels.length >= 10) {
    chartData.labels.shift();
    chartData.datasets[0].data.shift();
  }

  chartData.labels.push(
    `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
  );

  chartData.datasets[0].data.push(fullCount);

  return chartData;
};
