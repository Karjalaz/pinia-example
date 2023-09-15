<script setup>
import UserFilter from './../components/user-filter.vue';
import UserEvents from '../components/user-events.vue';
import TheFooter from './../components/the-footer.vue'

</script>

<template>
    <div class="page grid grid-cols-2 h-full justify-center items-center text-primary">
        <user-filter></user-filter>
        <!-- <section class="page__events flex flex-col">
            <h3 class="page__events-title font-medium">
                List
            </h3>
            <ul class="page__event-list">
                <li 
                    class="page__event"
                    v-for="user in users"
                    :key="user.id">
                    <user-item :user="user"></user-item>
                </li>
            </ul>
        </section> -->
        <user-events></user-events>
        <the-footer class="col-span-2 mt-auto"></the-footer>
    </div>
</template>