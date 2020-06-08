<template>
  <div v-if="loaded">
    <VueApexCharts
      type="area"
      height="350"
      :options="lineAreaChartSpline.chartOptions"
      :series="lineAreaChartSpline.series"
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
      lineAreaChartSpline: {
        series: [
          {
            name: 'joueurs',
            data: []
          }
        ],
        chartOptions: {
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          colors: this.colors,
          xaxis: {
            type: 'datetime',
            categories: []
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            }

          }
        }
      }
    }
  },

  async created () {
    try {
      const resp = await this.$axios.get('admin/stats/players')

      console.log('players', resp.data)

      this.lineAreaChartSpline.series[0].data = resp.data.map(x => x.count)
      this.lineAreaChartSpline.chartOptions.xaxis.categories = resp.data.map(x => x.created_at)
    } catch (e) {
    }

    this.loaded = true
  }
}
</script>
