import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

export const CircularChart = ({ data }: any) => {
  const chartData = {
    labels: data.map((item: { label: any; }) => item.label),
    datasets: [
      {
        label: 'Cantidad de videos',
        data: data.map((item: { difference: any; }) => item.difference),
        backgroundColor: [
          'rgba(236, 182, 32, 0.2)',
          'rgba(0, 140, 255, 0.2)',
          'rgba(255, 30, 0, 0.2)',
          'rgba(72, 207, 18, 0.2)',
          // Agrega más colores según sea necesario
        ],
        borderColor: [
          'rgba(236, 182, 32, 1)',
          'rgba(0, 140, 255, 1)',
          'rgba(255, 30, 0, 1)',
          'rgba(72, 207, 18, 1)',
          // Agrega más colores según sea necesario
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut data={chartData} className='CircularChart'/>
  )
}