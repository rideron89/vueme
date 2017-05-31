<template>
    <div>
        <h3>Site Stats</h3>

        <div>
            <label>Total pages: <route-link :to="'/admin/pages/'" @update="pathChange">{{ page_count }}</route-link></label>
        </div>

        <div>
            <label>Total users: <route-link :to="'/admin/users/'" @update="pathChange">{{ user_count }}</route-link></label>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import RouteLink from './RouteLink.vue'

    export default {
        components: {
            RouteLink
        },

        data() {
            return {
                page_count: 0,
                user_count: 0
            }
        },

        mounted() {
            axios.get('/admin-ajax/stats').then((response) => {
                if (!response.data.error && response.data.stats) {
                    this.page_count = response.data.stats.page_count;
                    this.user_count = response.data.stats.user_count;
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

<style lang="scss" scoped>
</style>