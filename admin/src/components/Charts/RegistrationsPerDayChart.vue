<template>
  <div v-if="loaded">
    <VueApexCharts
      type="bar"
      height="350"
      :options="columnChart.chartOptions"
      :series="columnChart.series"
    ></VueApexCharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    VueApexCharts
  },

  props: {
    colors: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      loaded: false,
      columnChart: {
        series: [
          {
            name: 'Inscriptions',
            data: []
          }
        ],
        chartOptions: {
          colors: this.colors,
          plotOptions: {
            bar: {
              horizontal: false,
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
            categories: []
          },
          yaxis: {
            title: {
              text: 'inscriptions'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter (val) {
                return Math.round(val)
              }
            }
          }
        }
      }
    }
  },

  async created () {
    try {
      const resp = await this.$axios.get('admin/stats/registrations')

      console.log('registrations', resp.data)

      this.columnChart.series[0].data = resp.data.map(x => x.count)
      this.columnChart.chartOptions.xaxis.categories = resp.data.map(x => new Date(x.registerdate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }))
    } catch (e) {
    }

    this.loaded = true
  }
}
</script>
