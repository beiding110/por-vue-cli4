<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    mounted() {
        if (!!window.ActiveXObject || 'ActiveXObject' in window) {
            window.addEventListener('hashchange', () => {
                let currentPath = window.location.hash.slice(1);
                if (this.$route.path !== currentPath) {
                    this.$router.push(currentPath);
                }
            }, false);
        }
    },
};
</script>

<style>
</style>
