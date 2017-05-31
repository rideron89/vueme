<template>
    <div>
        <h3>Media files</h3>

        <div>
            <input type="file" @change="changeFile" />
            <button @click="uploadFile">Upload file</button>
        </div>

        <p v-if="error">{{ error }}</p>

        <ul v-if="files">
            <li v-for="(file, index) in files">
                {{ file }}

                <a :href="'/media/' + file" target="_blank">
                    <img :src="'/media/' + file" />
                </a>

                <button @click="deleteFile(file, index)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                new_files: [],
                error: '',
                files: []
            }
        },

        mounted() {
            axios.get('/admin-ajax/media').then((response) => {
                if (!response.data.error && response.data.files) {
                    this.files = response.data.files;
                }
            });
        },

        methods: {
            changeFile: function(ev) {
                this.new_files = ev.target.files || ev.dataTransfer.files;
            },

            deleteFile: function(filename, index) {
                axios.delete('/admin-ajax/media/' + filename).then((response) => {
                    if (response.data.error) {
                        this.error = response.data.message;
                    } else {
                        this.error = '';

                        this.files.splice(index, 1);
                    }
                });
            },

            uploadFile: function() {
                let form_data = new FormData();

                if (this.new_files.length < 1) {
                    this.error = 'No file was selected.';
                    return;
                }

                form_data.append('file', this.new_files[0]);

                axios.post('/admin-ajax/media', form_data).then((response) => {
                    if (response.data.error) {
                        this.error = response.data.message;
                    } else {
                        this.error = '';

                        this.files.unshift(response.data.file);
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>