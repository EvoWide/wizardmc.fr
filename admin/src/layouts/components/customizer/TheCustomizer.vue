<!-- =========================================================================================
    File Name: TheCustomizer.vue
    Description: Template Customizer
    Component Name: TheCustomizer
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div id="theme-customizer">
        <vs-button @click.stop="active=!active" color="primary" type="filled" class="customizer-btn" icon-pack="feather" icon="icon-settings"></vs-button>
        <vs-sidebar hidden-background position-right v-model="active" click-not-close class="items-no-padding">
            <div class="h-full">
                <div class="customizer-header mt-6 flex items-center justify-between px-6">
                    <div>
                        <h4>THEME CUSTOMIZER</h4>
                        <small>Customize & Preview in Real Time</small>
                    </div>
                    <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
                </div>
                <vs-divider class="mb-0"></vs-divider>

                <VuePerfectScrollbar class="scroll-area--customizer pt-4 pb-6" :settings="settings">
                    <div class="px-6">
                        <!-- THEME COLORS -->
                        <div>
                            <h5 class="mb-4">Theme Color</h5>
                            <ul class="clearfix">
                                <li @click="updatePrimaryColor(color)" v-for="color in themeColors" class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left" :style="{backgroundColor: color}" :class="{'shadow-outline': color == primaryColor}" :key="color"></li>
                                <li @click="updatePrimaryColor(customPrimaryColor)" class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left" :style="{backgroundColor: customPrimaryColor}" :class="{'shadow-outline': customPrimaryColor == primaryColor}"></li>
                                <li class="float-left"><input class="w-10 cursor-pointer h-10 rounded-lg m-2" v-model="customPrimaryColor" type="color" /></li>

                            </ul>
                        </div>
                        <vs-divider></vs-divider>

                        <!-- THEME -->
                        <div class="mt-4">
                            <!-- <vs-switch v-model="theme_dark" vs-icon-off="wb_sunny" vs-icon-on="brightness_2" color="dark" /> -->
                            <h5 class="mb-2">Dark Mode</h5>
                            <div>
                                <vs-radio class="mr-4" v-model="theme" vs-value="light">Light</vs-radio>
                                <vs-radio class="mr-4" v-model="theme" vs-value="dark">Dark</vs-radio>
                                <vs-radio v-model="theme" vs-value="semi-dark">Semi Dark</vs-radio>
                            </div>
                        </div>
                        <vs-divider></vs-divider>

                        <!-- COLLAPSE SIDEBAR -->
                        <div class="mt-4 flex justify-between">
                            <h5>Collapse Sidebar</h5>
                            <vs-switch v-model="reduced_sidebar"/>
                        </div>

                        <vs-divider></vs-divider>

                        <!-- NAVBAR COLOR -->
                        <div class="mt-4">
                            <h5>Navbar Color</h5>
                            <ul class="clearfix">

                                <!-- WHITE COLOR -->
                                <li
                                  class="w-10 m-2 h-10 rounded-lg bg-white float-left cursor-pointer border border-solid border-grey-light"
                                  :class="navbarColorOptionClasses('#fff')"
                                  @click="navbarColorLocal = '#fff' "/>

                                <!-- THEME COLORS -->
                                <li
                                  class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left"
                                  :class="navbarColorOptionClasses(color)"
                                  :style="{backgroundColor: color}"
                                  v-for="color in themeColors"
                                  :key="color"
                                  @click="navbarColorLocal = color" />

                                <!-- CUSTOM COLOR -->
                                <li
                                  class="w-10 cursor-pointer h-10 rounded-lg m-2 float-left"
                                  :class="navbarColorOptionClasses(navbarColorOptionClasses)"
                                  :style="{backgroundColor: customNavbarColor}"
                                  @click="navbarColorLocal = customNavbarColor" />

                                <li class="float-left">
                                  <input class="w-10 cursor-pointer h-10 rounded-lg m-2" v-model="customNavbarColor" type="color" />
                                </li>
                            </ul>
                        </div>
                        <vs-divider></vs-divider>

                        <!-- NAVBAR TYPE -->
                        <div class="mt-4">
                            <h5 class="mb-2">Navbar Type</h5>
                            <div>
                                <vs-radio class="mr-4" v-model="navbarTypeLocal" vs-value="navbar-hidden">Hidden</vs-radio>
                                <vs-radio class="mr-4" v-model="navbarTypeLocal" vs-value="navbar-static">Static</vs-radio>
                                <vs-radio class="mr-4" v-model="navbarTypeLocal" vs-value="navbar-sticky">Sticky</vs-radio>
                                <vs-radio v-model="navbarTypeLocal" vs-value="navbar-floating">Floating</vs-radio>
                            </div>
                        </div>
                        <vs-divider></vs-divider>

                        <!-- FOOTER TYPE -->
                        <div class="mt-4">
                            <h5 class="mb-2">Footer Type</h5>
                            <div>
                                <vs-radio class="mr-4" v-model="footerTypeLocal" vs-value="hidden">Hidden</vs-radio>
                                <vs-radio class="mr-4" v-model="footerTypeLocal" vs-value="static">Static</vs-radio>
                                <vs-radio v-model="footerTypeLocal" vs-value="sticky">Sticky</vs-radio>
                            </div>
                        </div>
                        <vs-divider></vs-divider>

                        <!-- SHOW SCROLL TO TOP -->
                        <div class="mt-4 flex justify-between">
                            <h5 class="mb-2">Hide Scroll To Top</h5>
                            <vs-switch v-model="hideScrollToTopLocal"/>
                        </div>
                        <vs-divider></vs-divider>

                        <!-- ROUTER ANIMATION -->
                        <div class="mt-4">
                            <h5 class="mb-2">Router Animation {{ routerTransitionLocal }}</h5>
                            <vs-select v-model="routerTransitionLocal">
                                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in routerTransitionsList" />
                            </vs-select>
                        </div>
                    </div>
                </VuePerfectScrollbar>
            </div>
        </vs-sidebar>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    props: {
        navbarType: {
            type: String,
            required: true,
        },
        navbarColor: {
            type: String,
            required: true,
            default: "#fff",
        },
        footerType: {
            type: String,
            required: true,
        },
        routerTransition: {
            type: String,
            required: true,
        },
        hideScrollToTop: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            active: false,
            themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
            customPrimaryColor: '#3DC9B3',
            customNavbarColor: '#3DC9B3',
            routerTransitionsList: [
                { text: 'Zoom Fade', value: 'zoom-fade' },
                { text: 'Slide Fade', value: 'slide-fade' },
                { text: 'Fade Bottom', value: 'fade-bottom' },
                { text: 'Fade', value: 'fade' },
                { text: 'Zoom Out', value: 'zoom-out' },
                { text: 'None', value: 'none' },
            ],
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
        }
    },
    computed: {
        theme: {
            get() {
                return this.$store.state.theme;
            },
            set(val) {
                this.$store.dispatch('updateTheme', val);
            }
        },
        reduced_sidebar: {
            get() { return this.$store.state.reduceButton },
            set(val) { this.$store.commit('TOGGLE_REDUCE_BUTTON', val) }
        },
        navbarTypeLocal: {
            get() {
              return 'navbar-' + this.navbarType
            },
            set(val) {
              this.$emit('updateNavbar', val.replace("navbar-", ""))
            }
        },
        navbarColorLocal: {
            get() { return this.navbarColor; },
            set(val) {
              if(this.navbarType == 'static') return
              this.$emit('updateNavbarColor', val)
            }
        },
        footerTypeLocal: {
            get() { return this.footerType; },
            set(val) { this.$emit('updateFooter', val) }
        },
        routerTransitionLocal: {
            get() { return this.routerTransition; },
            set(val) { this.$emit('updateRouterTransition', val) }
        },
        primaryColor: {
            get() { return this.$store.state.themePrimaryColor },
            set(val) { this.$store.commit('UPDATE_PRIMARY_COLOR', val) }
        },
        hideScrollToTopLocal: {
            get() { return this.hideScrollToTop },
            set(val) { this.$emit('toggleHideScrollToTop', val) }
        },

        // Navbar color options classes
        navbarColorOptionClasses() {
          return (color) => {
            let classes = {}
            if(color == this.navbarColorLocal) classes['shadow-outline'] = true
            if(this.navbarTypeLocal == 'static') classes['cursor-not-allowed'] = true
            return classes
          }
        }
    },
    methods: {
        updatePrimaryColor(color) {
            this.primaryColor = color;
            this.$vs.theme({ primary: color });
        }
    },
    components: {
        VuePerfectScrollbar,
    }
}
</script>

<style lang="scss">
#theme-customizer {
    .vs-sidebar{
        position: fixed;
        z-index: 52000;
        width: 400px;
        max-width: 90vw;
        @apply shadow-lg;
    }
}

.customizer-btn{
    position: fixed;
    top:50%;
    right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 50000;

    .vs-icon{
        animation: spin 1.5s linear infinite;
    }
}

.scroll-area--customizer {
    height: calc(100% - 5rem);
}
</style>
