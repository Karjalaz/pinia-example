<script setup>
import UserFilter from './../components/user-filter.vue';
import UserEvents from '../components/user-events.vue';
import TheFooter from './../components/the-footer.vue'
</script>

<template>
    <div class="page grid grid-cols-2 h-full text-primary">
        <user-filter></user-filter>
        <user-events></user-events>
        <the-footer class="col-span-2 mt-auto"></the-footer>
    </div>
</template>

<style scoped>
.page {
    padding-top: clamp(2rem, 1.236rem + 4.074vw, 6.125rem);
}
</style>