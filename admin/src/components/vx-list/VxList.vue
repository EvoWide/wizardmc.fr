<!-- =========================================================================================
    File Name: VxList.vue
    Description: list Component
    Component Name: VxList
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <ul class="list">
        <li class="list__item" v-for="(item, index) in list" :key="index">
            <feather-icon :icon="icon" class="w-5 h-5 mr-1"></feather-icon><span v-html="item"></span>
        </li>
    </ul>
</template>

<script>
export default {
    name: "vx-list",
    props: {
        list: {
            type: Array,
            required: true,
        },
        icon: {
            type: String,
            default: "ChevronsRightIcon",
        },
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxList.scss";
</style>