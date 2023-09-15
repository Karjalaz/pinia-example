<script setup>
import UserFilter from './../components/user-filter.vue';
import UserEvents from '../components/user-events.vue';
import TheFooter from './../components/the-footer.vue'
</script>

<template>
    <div class="page flex flex-col h-full text-primary">
        <section class="content flex items-stretch flex-col gap-6
            md:flex-row overflow-hidden">
            <user-filter class="col-span-2 md:col-span-1 
                md:px-2 md:w-2/3 lg:w-1/2 xl:w-1/3"></user-filter>
            <user-events class="col-span-2 md:col-span-1 md:mt-0 md:w-2/3"></user-events>
        </section>
        <the-footer class="w-full mt-auto"></the-footer>
    </div>
</template>

<style scoped>
.page {
    padding-top: clamp(2rem, 1.236rem + 4.074vw, 6.125rem);
}
</style>