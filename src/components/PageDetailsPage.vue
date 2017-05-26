<template>
    <div>
        <h3>Edit Page</h3>

        <button type="button" @click="updatePage">Update</button>

        <br />

        <div>
            <h5>Page Config</h5>

            <ul v-if="config">
                <li v-for="(key, index) in config">
                    <input type="text" v-model="config[index].key" />
                    <input type="text" v-model="config[index].value" />
                    <button type="button" @click="removeOption(index)">-</button>
                </li>
            </ul>

            <button type="button" @click="addOption">Add option</button>
        </div>

        <div>
            <h5>Page Content</h5>
            <p>Content supports markdown.</p>

            <textarea v-model="content" rows="10"></textarea>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'page-details-page',

        computed: {
        },

        data() {
            return {
                page_id: window.location.pathname.split('/').pop(),
                config: [],
                content: ''
            }
        },

        mounted() {
            axios.get('/admin-ajax/pages/' + this.page_id).then((response) => {
                if (!response.data.error && response.data.page) {
                    let config = response.data.page.config;

                    this.content = response.data.page.content;

                    Object.keys(config).forEach((key, index) => {
                        this.config.push({ key: key, value: config[key] });
                    });
                }
            });
        },

        methods: {
            addOption: function() {
                this.config.push({ key: '', value: '' });
            },

            removeOption: function(index) {
                this.config.splice(index, 1);
            },

            updatePage: function() {
                let config = {};
                let content = this.content;

                this.config.forEach((row) => {
                    if (row.key.length) {
                        config[row.key] = row.value;
                    }
                });

                axios.post('/admin-ajax/pages/' + this.page_id, {config, content}).then((response) => {
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