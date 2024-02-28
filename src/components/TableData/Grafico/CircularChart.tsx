import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
type ChartData = {
  label: string,
  difference:number,
}
type Props = {
  data: ChartData[],
}
export const CircularChart = ({ data }: Props) => {
  const chartData = {
    labels: data.map((item: { label: string; }) => item.label),
    datasets: [
      {
        label: 'Cantidad de videos',
        data: data.map((item: { difference: any; }) => item.difference),
        backgroundColor: [
          'rgba(236, 182, 32, 0.2)',
          'rgba(0, 140, 255, 0.2)',
          'rgba(255, 30, 0, 0.2)',
          'rgba(72, 207, 18, 0.2)',
        ],
        borderColor: [
          'rgba(236, 182, 32, 1)',
          'rgba(0, 140, 255, 1)',
          'rgba(255, 30, 0, 1)',
          'rgba(72, 207, 18, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Doughnut data={chartData} className='CircularChart'/>
  )
}