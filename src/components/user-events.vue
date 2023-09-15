<script setup>
import UserItem from './../components/user-item.vue';
import { useFilterStore } from './../stores/filter';
import { ref, onMounted, reactive, computed } from 'vue';



const store = useFilterStore();

// subscribed to store state change 
store.$subscribe((_, state) => {
    if (state?._countryFilter)
        filterUsersByCountry(state._countryFilter);
    else 
        dropFilterByCountry(state);

    if (state?._scoreFilter) 
        filterUsersByScore(state._scoreFilter);
    else 
        dropFilterByScore(state);
});

const userList = reactive({
    items: []
});
// url for source json 
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
    filteredUsers.items = users;
    usersLoading.value = false;

    if (store.countryFilter || store.scoreFilter) {
        filterUsersByCountry(store.countryFilter);
        filterUsersByScore(store.scoreFilter);
    }
}

const filteredUsers = reactive({
    items: null
});

const filteredByCountry = reactive({
    filtered: false,
    items: []
});

const filteredByScore = reactive({
    filtered: false,
    items: []
});

function filterUsersByCountry(country) {
    usersLoading.value = true;

    //check if already filtered by country
    let arrayToFilter = (filteredByCountry.filtered) ? userList.items : filteredUsers.items;

    filteredByCountry.items = arrayToFilter.filter(user => user.country == country);

    if (filteredByScore.filtered )
        filteredUsers.items = filteredByCountry.items.filter(user => filteredByScore.items.includes(user));
    else 
        filteredUsers.items = filteredByCountry.items;
    
    filteredByCountry.filtered = true;

    usersLoading.value = false;
}

function dropFilterByCountry() {
    usersLoading.value = true;

    filteredByCountry.filtered = false;
    if (filteredByScore.filtered)
        filteredUsers.items = filteredByScore.items;
    else 
        filteredUsers.items = userList.items;

    usersLoading.value = false;
}

function filterUsersByScore(score) {
    usersLoading.value = true;

    // check if already filtered by score
    let arrayToFilter = (filteredByScore.filtered) ? userList.items : filteredUsers.items;

    filteredByScore.items = arrayToFilter.filter(user => user.score == score);
    
    switch (score) {
        case 'below 10':
            filteredByScore.items = arrayToFilter.filter(user => user.score < 10);
            break;
        case 'inbetween 10 and 20':
            filteredByScore.items = arrayToFilter.filter(user => user.score >= 10 && user.score <= 20);
            break;
        case 'above 20':
            filteredByScore.items = arrayToFilter.filter(user => user.score > 20);
            break;
    }

    if (filteredByCountry.filtered)
        filteredUsers.items = filteredByScore.items.filter(user => filteredByCountry.items.includes(user));
    else 
        filteredUsers.items = filteredByScore.items;

    filteredByScore.filtered = true;

    usersLoading.value = false;
}

function dropFilterByScore() {
    usersLoading.value = true;

    filteredByScore.filtered = false;
    if (filteredByCountry.filtered)
        filteredUsers.items = filteredByCountry.items;   
    else
        filteredUsers.items = userList.items;

    usersLoading.value = false;
}

const emptyList = computed(() => filteredUsers.items?.length == 0);

onMounted(() => {
    loadUsers();
});
</script>

<template>
    <section class="events flex flex-col h-1/2 justify-start">
        <h3 class="events__title font-medium">
            List
        </h3>
        <transition 
            name="fade" 
            mode="out-in">
            <div v-if="usersLoading" 
                class="events__loader flex h-full justify-center items-center">
                <p class="animate-bounce text-primary text-lg">...</p>
            </div>
            <ul v-else
                class="events__list flex flex-col overflow-y-scroll h-full mx-1"
                :class="{'items-center': emptyList}">
                <li 
                    class="event__item"
                    v-for="user in filteredUsers.items"
                    :key="user.id">
                    <user-item :user="user"></user-item>
                </li>
                <div v-if="emptyList"
                    class="flex items-center justify-center self-center h-full">
                    No users found
                </div>
            </ul>
        </transition>
    </section>
</template>

<style scoped>

</style>