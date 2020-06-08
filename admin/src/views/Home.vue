<template>
  <div>
    <h4 class="mb-4">Bienvenue sur le dashboard de WizardMC.</h4>
    <div class="vx-row">
      <div class="w-full vx-col md:w-1/2 mb-base">
        <vx-card title="Visites">
          <VisitsPerDayChart :colors="themeColors"/>
        </vx-card>
      </div>
      <div class="w-full vx-col md:w-1/2 mb-base">
        <vx-card>
          <VueApexCharts
            type="area"
            height="350"
            :options="lineAreaChartSpline.chartOptions"
            :series="lineAreaChartSpline.series"
          ></VueApexCharts>
        </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <div class="w-full vx-col md:w-1/2 mb-base">
        <vx-card>
          <VueApexCharts
            type="bar"
            height="350"
            :options="columnChart.chartOptions"
            :series="columnChart.series"
          ></VueApexCharts>
        </vx-card>
      </div>
      <div class="w-full vx-col md:w-1/2 mb-base">
        <vx-card>
          <VueApexCharts
            type="bar"
            height="350"
            :options="columnChart.chartOptions"
            :series="columnChart.series"
          ></VueApexCharts>
        </vx-card>
      </div>
    </div>
  </div>
</template>


<script>
import VueApexCharts from 'vue-apexcharts'
import VisitsPerDayChart from '@/components/Charts/VisitsPerDayChart.vue'

export default {
  components: {
    VueApexCharts,
    VisitsPerDayChart
  },

  data () {
    return {
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
      columnChart: {
        series: [
          {
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }
        ],
        chartOptions: {
          colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
          plotOptions: {
            bar: {
              horizontal: false,
              // endingShape: 'rounded',
              columnWidth: '55%'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },

          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
          },
          yaxis: {
            title: {
              text: '$ (thousands)'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            // theme: 'light',
            y: {
              formatter (val) {
                return `$ ${val} thousands`
              }
            }
          }
        }
      },
      lineAreaChartSpline: {
        series: [
          {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
          }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
          }
        ],
        chartOptions: {
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
          xaxis: {
            type: 'datetime',
            categories: [
              '2018-09-19T00:00:00', '2018-09-19T01:30:00', '2018-09-19T02:30:00',
              '2018-09-19T03:30:00', '2018-09-19T04:30:00', '2018-09-19T05:30:00',
              '2018-09-19T06:30:00'
            ]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            }

          }
        }
      }
    }
  }
}
</script>