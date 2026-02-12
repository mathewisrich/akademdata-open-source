// © 2026 Mathew Sekanjako. Psalms23Wave. All Rights Reserved.
'use client';

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { TooltipItem } from 'chart.js';

export default function ChartComponent({ data }: { data: { label: string; value: number }[] }) {
  if (data.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-base text-slate-500">Upload data to see chart</p>
      </div>
    );
  }

  const colors = [
    'rgba(168, 85, 247, 0.8)',   // purple-500
    'rgba(59, 130, 246, 0.8)',   // blue-500
    'rgba(236, 72, 153, 0.8)',   // pink-500
    'rgba(99, 102, 241, 0.8)',   // indigo-500
    'rgba(139, 92, 246, 0.8)',   // violet-500
    'rgba(14, 165, 233, 0.8)',   // sky-500
  ];

  const borders = [
    '#a855f7',
    '#3b82f6',
    '#ec4899',
    '#6366f1',
    '#8b5cf6',
    '#0ea5e9',
  ];

  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label: 'Enrollments',
        data: data.map(d => d.value),
        backgroundColor: data.map((_, i) => colors[i % colors.length]),
        borderColor: data.map((_, i) => borders[i % borders.length]),
        borderWidth: 0,
        borderRadius: 4,
        barThickness: 20,
        hoverBackgroundColor: '#ffffff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleFont: { size: 10, family: 'Inter' },
        bodyFont: { size: 12, family: 'Inter', weight: 700 }, // Fixed here: 'bold' -> 700 or 'bold' string type mismatch
        displayColors: false,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        callbacks: {
            title: function(tooltipItems: TooltipItem<"bar">[]) { 
                return tooltipItems[0].label;
            }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 9 }, color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
        border: { display: false }
      },
      x: {
        ticks: { font: { size: 9 }, color: '#94a3b8', maxRotation: 45, minRotation: 0 },
        grid: { display: false },
        border: { display: false }
      },
    },
  };

  return <div className="h-[180px] sm:h-[200px] w-full min-w-0"><Bar options={options as any} data={chartData} /></div>;
}

