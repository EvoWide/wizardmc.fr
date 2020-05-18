<!-- =========================================================================================
    File Name: StatisticsCard.vue
    Description: Statistics card component
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <vx-card class="overflow-hidden">
        <div slot="no-body">
            <div class="p-6 pb-0" :class="{'flex justify-between flex-row-reverse items-center': iconRight}">
                <feather-icon :icon="icon" class="p-3 inline-flex rounded-full" :class="[`text-${color}`, {'mb-4': !iconRight}]" :style="{background: `rgba(var(--vs-${color}),.15)`}"></feather-icon>
                <div>
                    <h2 class="mb-1 font-bold">{{ statistic }}</h2>
                    <span>{{ statisticTitle }}</span>
                </div>
            </div>

            <div class="line-area-chart" :id="chartData.id">
                <vue-apex-charts ref="apexChart" :type="type" height=100 width='100%' :options="chartData.chartOptions" :series="chartData.series"></vue-apex-charts>
            </div>
        </div>
    </vx-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default{
    props: {
        icon: {
            type: String,
            required: true
        },
        statistic: {
            type: [Number, String],
            required: true,
        },
        statisticTitle: {
            type: String,
        },
        chartData: {
            type: Object,
            required: true
        },
        color: {
            type: String,
            default: 'primary',
        },
        chartType: {
            type: String,
            default: 'line-chart',
        },
        type: {
            type: String,
            default: 'line'
        },
        iconRight: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        themePrimaryColor() {
            this.$refs.apexChart.updateOptions({ theme: { monochrome: { color: this.getHex() } } });
        }
    },
    computed: {
        themePrimaryColor() {
            return this.$store.state.themePrimaryColor;
        }
    },
    methods: {
        getHex() {
            let rgb  = window.getComputedStyle(document.documentElement).getPropertyValue(`--vs-${this.color}`);
            rgb = rgb.split(",");
            return "#" + ((1 << 24) + (Number(rgb[0]) << 16) + (Number(rgb[1]) << 8) + Number(rgb[2])).toString(16).slice(1);
        },
    },
    components: {
        VueApexCharts
    },
    created() {
        if(this.type == 'area') {
            this.chartData.chartOptions['theme'] = {
                monochrome: {
                    enabled: true,
                    color: this.getHex(this.color),
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                }
            }
        }
    }
}
</script>