<template>
  <div>
    <h4 class="mb-4">Bienvenue sur le dashboard de WizardMC.</h4>
    <div class="vx-row">
      <div class="w-full vx-col md:w-1/2 mb-base">
        <vx-card title="Visites">
          <VisitsPerDayChart :colors="themeColors" />
        </vx-card>
      </div>
      <div class="w-full vx-col md:w-1/2 mb-base">
        <vx-card title="Inscriptions">
          <RegistrationsPerDayChart :colors="themeColors" />
        </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <div class="w-full vx-col mb-base">
        <vx-card title="Connectés">
          <PlayersPerQuarterChart :colors="themeColors" />
        </vx-card>
      </div>
      <!-- <div class="w-full vx-col md:w-1/2 mb-base">
        <vx-card></vx-card>
      </div> -->
    </div>
  </div>
</template>


<script>
import VueApexCharts from 'vue-apexcharts'
import PlayersPerQuarterChart from '@/components/Charts/PlayersPerQuarterChart.vue'
import RegistrationsPerDayChart from '@/components/Charts/RegistrationsPerDayChart.vue'
import VisitsPerDayChart from '@/components/Charts/VisitsPerDayChart.vue'

export default {
  components: {
    VueApexCharts,
    PlayersPerQuarterChart,
    RegistrationsPerDayChart,
    VisitsPerDayChart
  },

  data () {
    return {
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E']
    }
  }
}
</script>