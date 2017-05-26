<template>
    <a href="#" @click="handleClick"><slot></slot></a>
</template>

<script>
    export default {
        props: ['to'],

        data() {
            return {}
        },

        mounted() {
            //
        },

        methods: {
            handleClick: function(ev) {
                ev.preventDefault();

                history.pushState({}, '', this.to);

                this.$emit('update', this.to);
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>