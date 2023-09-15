<script setup>
import UserItem from './../components/user-item.vue';
import { useFilterStore } from './../stores/filter';
import { ref, onMounted, reactive } from 'vue';



const store = useFilterStore();

store.$subscribe((mutation, state) => {
    console.log('a change happened');
    console.log(state);
    if (state)
        filterUsersByCountry(state._countryFilter);
});


const userList = reactive({
    items: []
});
const usersRequestUrl = 'https://karjalaz.github.io/pinia-example/public/users.json';

const usersLoading = ref(true);

function loadUsers() {
    usersLoading.value = true;
    var request = new XMLHttpRequest();
    request.open('GET', usersRequestUrl);

    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var users = request.response;
        showUsers(users);
    };  
}

function showUsers(users) {
    userList.items = users;
    usersLoading.value = false;
}

const filterUsersByCountry = (country) => userList.items.filter(user => user.country == country);


onMounted(() => {
    loadUsers();
});
</script>

<template>
    <section class="events flex flex-col">
        <h3 class="events__title font-medium">
            List
        </h3>
        <ul v-if="userList.items.length > 0"
            class="events__list">
            <li 
                class="event__item"
                v-for="user in userList.items"
                :key="user.id">
                <user-item :user="user"></user-item>
            </li>
        </ul>
        <div v-else class="events__loader animate-bounce">
            ...
        </div>
    </section>
</template>