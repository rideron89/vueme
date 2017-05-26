<template>
    <div>
        Pages page.

        <ul>
            <page-item :page="page" v-for="page in pages" :key="page.title" @update="pathChange"></page-item>
        </ul>

        <ul>
            <li v-for="page in pages">
                <route-link :to="'/admin/pages/' + page.id" @update="pathChange">{{ page.config.title }}</route-link>
                -
                Template: {{ page.config.template }}
                Title: {{ page.config.title }}
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    import PageItem from './PageItem.vue'
    import RouteLink from './RouteLink.vue'

    export default {
        components: {
            PageItem,
            RouteLink
        },

        data() {
            return {
                pages: []
            }
        },

        mounted() {
            axios.get('/admin-ajax/pages').then((response) => {
                if (!response.data.error && response.data.pages) {
                    this.pages = response.data.pages;
                }
            });
        },

        methods: {
            pathChange: function() {
                this.$emit('update');
            }
        }
    }
</script>

<style lang="scss" scope>
</style>