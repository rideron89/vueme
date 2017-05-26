<template>
    <div>
        Your dashboard.

        <nav>
            <route-link to="/admin" @update="pathChange">Admin home</route-link>
            <route-link to="/admin/pages" @update="pathChange">Pages</route-link>
        </nav>

        <div v-if="currentRoute === '/admin'">Admin home</div>
        <pages-page v-if="new RegExp(/\/admin\/pages\/?$/).test(currentRoute)" @update="pathChange"></pages-page>
        <page-details-page v-if="new RegExp(/\/admin\/pages\/[^\/]+/).test(currentRoute)" @update="pathChange"></page-details-page>
    </div>
</template>

<script>
    import RouteLink from './RouteLink.vue'
    import PageDetailsPage from './PageDetailsPage.vue'
    import PagesPage from './PagesPage.vue'

    export default {
        components: {
            RouteLink,
            PageDetailsPage,
            PagesPage
        },

        props: [],

        computed: {
            computedRoute: function() {
                return this.currentRoute;
            }
        },

        data() {
            return {
                currentRoute: window.location.pathname
            }
        },

        mounted() {
            //
        },

        methods: {
            pathChange: function() {
                this.currentRoute = window.location.pathname;
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>