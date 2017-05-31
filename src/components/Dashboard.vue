<template>
    <div>
        Your dashboard.

        <nav>
            <route-link to="/admin" @update="pathChange">Admin home</route-link>
            <route-link to="/admin/media" @update="pathChange">Media</route-link>
            <route-link to="/admin/pages" @update="pathChange">Pages</route-link>
            <route-link to="/admin/users" @update="pathChange">Users</route-link>
        </nav>

        <stats-page v-if="new RegExp(/\/admin\/?$/).test(currentRoute)" @update="pathChange"></stats-page>

        <media-page v-if="new RegExp(/\/admin\/media\/?$/).test(currentRoute)" @update="pathChange"></media-page>

        <pages-page v-if="new RegExp(/\/admin\/pages\/?$/).test(currentRoute)" @update="pathChange"></pages-page>
        <page-details-page v-if="new RegExp(/\/admin\/pages\/[^\/]+/).test(currentRoute)" @update="pathChange"></page-details-page>

        <users-page v-if="new RegExp(/\/admin\/users\/?$/).test(currentRoute)" @update="pathChange"></users-page>
        <user-details-page v-if="new RegExp(/\/admin\/users\/(?!add)[^\/]+/).test(currentRoute)" @update="pathChange"></user-details-page>
        <user-add-page v-if="new RegExp(/\/admin\/users\/add/).test(currentRoute)" @update="pathChange"></user-add-page>
    </div>
</template>

<script>
    import RouteLink from './RouteLink.vue'
    import MediaPage from './MediaPage.vue'
    import PageDetailsPage from './PageDetailsPage.vue'
    import PagesPage from './PagesPage.vue'
    import StatsPage from './StatsPage.vue'
    import UserAddPage from './UserAddPage.vue'
    import UserDetailsPage from './UserDetailsPage.vue'
    import UsersPage from './UsersPage.vue'

    export default {
        components: {
            RouteLink,
            MediaPage,
            PageDetailsPage,
            PagesPage,
            StatsPage,
            UserAddPage,
            UserDetailsPage,
            UsersPage
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