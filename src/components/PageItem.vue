<template>
    <li>
        <route-link :to="'/admin/pages/' + page.id" @update="pathChange">{{ page.config.title }}</route-link>

        <ul v-if="page.children">
            <page-item :page="child" v-for="child in page.children" :key="child.title" @update="pathChange"></page-item>
        </ul>
    </li>
</template>

<script>
    import RouteLink from './RouteLink.vue'

    export default {
        name: 'PageItem',

        components: {
            RouteLink
        },

        props: ['page'],

        data() {
            return {}
        },

        methods: {
            pathChange: function() {
                this.$emit('update');
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>