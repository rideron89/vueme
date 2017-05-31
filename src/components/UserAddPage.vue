<template>
    <div>
        <h3>Add a user</h3>

        <button type="button" @click="saveUser">Save</button>

        <p v-if="error">{{ error }}</p>

        <div>
            <label>Username:</label>
            <br />
            <input type="text" v-model="user.username" />
        </div>

        <div>
            <label>Email:</label>
            <br />
            <input type="email" v-model="user.email" />
        </div>

        <div>
            <label>Password:</label>
            <br />
            <input type="password" v-model="user.password" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                error: '',
                user: {
                    username: '',
                    email: '',
                    password: ''
                }
            }
        },

        methods: {
            validate: function() {
                if (this.user.username.length < 3) {
                    this.error = 'Please enter at least 3 characters for the username.';
                    return false;
                }

                if (new RegExp(/\S+@\S+/).test(this.user.email) === false) {
                    this.error = 'Please enter a valid email address.';
                    return false;
                }

                if (this.user.password.length < 3) {
                    this.error = 'Please enter at least 3 characters for the password.';
                    return false;
                }

                return true;
            },

            saveUser: function() {
                if (this.validate() === false) { return; }

                axios.post('/admin-ajax/users/', this.user).then((response) => {
                    if (response.data.error) {
                        this.error = response.data.message;
                    } else {
                        this.error = '';
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>