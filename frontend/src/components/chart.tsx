import { Bar } from 'react-chartjs-2';

interface DataItem {
  label: string;
  value: number;
}

interface VisualizationProps {
  data: DataItem[];
}

const Visualization = ({ data }: VisualizationProps) => {
  const chartData = {
    labels: data.map((item: { label: any; }) => item.label),
    datasets: [
      {
        label: 'Value',
        data: data.map((item: { value: any; }) => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default Visualization;
