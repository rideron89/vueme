<template>
    <div>
        <h3>Edit User</h3>

        <button type="button" @click="updateUser">Update</button>

        <br />

        <div>
            <label>Username:</label>
            <br />
            <input type="text" v-model="user.username" disabled="disabled" />
            <span>Username cannot be changed.</span>
        </div>

        <div>
            <label>Email:</label>
            <br />
            <input type="email" v-model="user.email" />
        </div>

        <div>
            <h5>Change Password</h5>

            <div>
                <label>Current password:</label>
                <br />
                <input type="password" v-model="password.old" />
            </div>

            <div>
                <label>New password:</label>
                <br />
                <input type="password" v-model="password.new" />
            </div>

            <div>
                <label>Confirm password:</label>
                <br />
                <input type="password" v-model="password.confirm" />
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                user_id: window.location.pathname.split('/').pop(),
                user: {},
                password: {
                    old: '',
                    new: '',
                    confirm: ''
                }
            }
        },

        mounted() {
            axios.get('/admin-ajax/users/' + this.user_id).then((response) => {
                if (!response.data.error && response.data.user) {
                    this.user = response.data.user;
                }
            });
        },

        methods: {
            checkPassword: function() {
                if (this.password.old.length < 3) { return false; }
                if (this.password.new.length < 3) { return false; }
                if (this.password.confirm.length < 3) { return false; }
                if (this.password.new !== this.password.confirm) { return false; }

                return true;
            },

            updateUser: function() {
                let data = {};

                Object.keys(this.user).forEach((key) => {
                    if (key !== 'password') {
                        data[key] = this.user[key];
                    }
                });

                if (this.checkPassword()) {
                    data.old_password = this.password.old;
                    data.new_password = this.password.new;
                }

                axios.put('/admin-ajax/users/' + this.user_id, data).then((response) => {
                    if (!response.data.error) {
                        //
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>