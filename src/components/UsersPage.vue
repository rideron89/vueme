<template>
    <div>
        <h3>Users</h3>

        <route-link :to="'/admin/users/add'" @update="pathChange">Add user</route-link>

        <ul v-if="users">
            <li v-for="user in users">
                <route-link :to="'/admin/users/' + user.id" @update="pathChange">{{ user.username }}</route-link>
            </li>
        </ul>
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
                users: []
            }
        },

        mounted() {
            axios.get('/admin-ajax/users').then((response) => {
                if (!response.data.error && response.data.users) {
                    this.users = response.data.users;
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