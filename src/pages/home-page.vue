<script setup>
import UserFilter from './../components/user-filter.vue';
import UserItem from './../components/user-item.vue';
import TheFooter from './../components/the-footer.vue'
import users from './../assets/users.json';

</script>

<template>
    <div class="page grid grid-cols-2 h-full justify-center items-center text-primary">
        <user-filter></user-filter>
        <section class="page__events flex flex-col">
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
        </section>
        <the-footer class="col-span-2 mt-auto"></the-footer>
    </div>
</template>