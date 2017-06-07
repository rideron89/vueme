<template>
    <div>
        <h2>Admin Dashboard</h2>

        <form @submit="submitForm">
            <fieldset>
                <label for="username">Username:</label>
                <input type="text" v-model="username" />
            </fieldset>

            <fieldset>
                <label for="password">Password:</label>
                <input type="password" v-model="password" />
            </fieldset>

            <fieldset>
                <label><input type="checkbox" v-model="remember" /> Remember me</label>
            </fieldset>

            <p v-if="error" v-html="error"></p>

            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        props: [],

        data() {
            return {
                username: '',
                password: '',
                remember: false,
                error: false
            }
        },

        mounted() {
            //
        },

        methods: {
            submitForm: function(ev) {
                ev.preventDefault();

                if (!this.username || !this.password) {
                    this.error = 'Please fill out the form.';

                    return;
                } else {
                    let params = new URLSearchParams();

                    params.append('username', this.username);
                    params.append('password', this.password);

                    axios.post('/login', params).then((response) => {
                        if (response.data.error) {
                            this.error = response.data.message;
                        } else if (!response.data.token) {
                            this.error = 'Could not receive login token.';
                        } else {
                            this.error = false;

                            sessionStorage.setItem('jwt', response.data.token);

                            if (this.remember) {
                                localStorage.setItem('jwt', response.data.token);
                            }

                            window.location.reload();
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>