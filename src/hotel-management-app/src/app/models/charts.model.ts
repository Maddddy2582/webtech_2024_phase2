  export interface ChartData {
    labels: string[];
    datasets: Array<{
      data: number[];
      backgroundColor: string[];
    }>;
  }
  
  export interface ChartOptions {
    responsive: boolean;
    maintainAspectRatio: boolean;
    scales?: {
      y?: {
        beginAtZero: boolean;
      }
    }
  }
  