<script>
import Card from '../ui/Card.vue';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
} from 'chart.js';
  

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  ChartDataLabels
);

export default {
  name: 'Dashboard',
  components: {
    Card,
  },
  data() {
    return {
      salesData: null,
      returnsData: null,
      ratingsData: null,
      overviewData: null,
      commissionsData: null,
      // sellerId: 'seller001',
      sellerId: localStorage.getItem('sellerId')
    };
  },
  methods: {
    async fetchData(endpoint) {
      try {
        const response = await fetch(`http://localhost:8083/api/dashboard/${endpoint}/${this.sellerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async loadDashboardData() {
      this.salesData = await this.fetchData('sales');
      this.returnsData = await this.fetchData('returns');
      this.ratingsData = await this.fetchData('ratings');
      console.log(this.returnsData)
      this.overviewData = await this.fetchData('overview');
      this.commissionsData = await this.fetchData('commissions');
      this.renderCharts();
    },
    renderCharts() {
      // Sales Line Chart
      if (this.salesData) {
        const ctx = document.getElementById('salesChart');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.salesData.map((sale) => sale.saleDate),
            datasets: [
              {
                label: 'Revenue',
                data: this.salesData.map((sale) => sale.revenue),
                borderColor: '#4ADE80',
                backgroundColor: 'rgba(74, 222, 128, 0.2)',
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: '#000000',
                  font: {
                    size: 14,
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#000000',
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
              },
              y: {
                ticks: {
                  color: '#000000',
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
              },
            },
          },
        });
      }

      // Returns Pie Chart
      if (this.returnsData) {
                                  const reasons = ['Defective', 'Damaged', 'Wrong Item'];
                                  const aggregatedReturns = reasons.map((reason) => {
                                    return this.returnsData
                                      .filter((ret) => ret.returnReason === reason)
                                      .reduce((total, ret) => total + ret.totalReturns, 0);
                                  });

                                  const ctx = document.getElementById('returnsChart');
                          new Chart(ctx, {
                            type: 'pie',
                            data: {
                              labels: reasons,
                              datasets: [
                                {
                                  data: aggregatedReturns,
                                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                },
                              ],
                            },
                            options: {
                              responsive: true,
                              plugins: {
  legend: {
    display: true,
    labels: {
      color: '#000000',
      font: {
        size: 14,
      },
    },
    position: 'bottom',
  },
  datalabels: {
    display: true,
    color: '#000000',
    font: {
      size: 14,
      weight: 'bold',
    },
    formatter: (value, context) => {
      const label = context.chart.data.labels[context.dataIndex];
      return `${label}: ${value}`;
    },
    anchor: 'end', 
    align: 'start', 
    offset: 1, 
    padding: 5, 
  },
  tooltip: {
    callbacks: {
      label: function (context) {
        const label = context.label || '';
        const value = context.raw || 0;
        return `${label}: ${value}`;
      },
    },
  },
},

                            },
                          });

      }

      // Ratings Bar Chart
      if (this.ratingsData) {
        const ctx = document.getElementById('ratingsChart');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.ratingsData.map((rating) => rating.productName),
            datasets: [
              {
                label: 'Ratings',
                data: this.ratingsData.map((rating) => rating.rating),
                backgroundColor: '#F472B6',
                borderColor: '#EC4899',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: '#000000',
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#000000',
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
              },
              y: {
                ticks: {
                  color: '#000000',
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
              },
            },
          },
        });
      }
    },
  },
  mounted() {
    this.loadDashboardData();
  },
};
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Dashboard</h1>

    <div class="card-container">
      <div class="card">
        <h2 class="card-title">Sales Overview</h2>
        <canvas id="salesChart" class="chart"></canvas>
      </div>

      <div class="card">
        <h2 class="card-title">Ratings</h2>
        <canvas id="ratingsChart" class="chart"></canvas>
      </div>

      <div class="card">
        <h2 class="card-title">Returns Overview</h2>
        <canvas id="returnsChart" class="chart"></canvas>
      </div>

      <div class="card">
        <h2 class="card-title">Overview Summary</h2>
        <div v-if="overviewData" class="card-content">
          <table class="overview-table">
            <tbody>
              <tr>
                <td><strong>Total Revenue:</strong></td>
                <td>{{ overviewData.totalRevenue }}</td>
              </tr>
              <tr>
                <td><strong>Total Orders:</strong></td>
                <td>{{ overviewData.totalOrders }}</td>
              </tr>
              <tr>
                <td><strong>Total Returns:</strong></td>
                <td>{{ overviewData.totalReturns }}</td>
              </tr>
              <tr>
                <td><strong>Average Rating:</strong></td>
                <td>{{ overviewData.avgRating }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h2 class="card-title">Commissions</h2>
        <ul class="commissions-list">
          <li v-for="(commission, index) in commissionsData" :key="index">
            <strong>{{ commission.category }}:</strong> {{ commission.totalCommission }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Dashboard Container */
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #ffffff;
  color: #000000;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Dashboard Title */
.dashboard-title {
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
}

/* Card Container */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem; /* Increased gap for better spacing */
  width: 100%;
  /* max-width: 1400px; */
}

/* Card Styling */
.card {
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

/* Card Title */
.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

/* Chart Styling */
.chart {
  width: 100%;
  height: 16rem;
}

/* Overview Table */
.overview-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.overview-table td {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  color: #1f2937;
}

/* Commissions List */
.commissions-list {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
  text-align: left;
  width: 100%;
}

.commissions-list li {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #1f2937;
}

/* Adjustments for Mobile Screens */
@media (max-width: 768px) {
  .card-container {
    grid-template-columns: 1fr; /* Single column on smaller devices */
  }
}
</style>



