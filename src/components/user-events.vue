<script setup>
import UserItem from './../components/user-item.vue';
import { useFilterStore } from './../stores/filter';
import { ref, onMounted, reactive } from 'vue';


const userList = reactive({
    items: []
});
const usersRequestUrl = 'https://github.com/Karjalaz/pinia-example/blob/master/src/assets/users';

function fetchUsers() {
    var request = new XMLHttpRequest();
    request.open("GET", usersRequestUrl);

    request.responseType = "json";
    request.send();

    request.onload = function () {
        var users = request.response;
        console.log(users);
        populateHeader(superHeroes);
        showUsers(users);
    };  
}

function showUsers(users) {
    userList.items = users;
}

onMounted(() => {
    fetchUsers();
})
</script>

<template>
    <section class="events flex flex-col">
        <h3 class="events__title font-medium">
            List
        </h3>
        <ul v-show="userList.items.length > 0"
            class="events__list">
            <li 
                class="event__item"
                v-for="user in userList.items"
                :key="user.id">
                <user-item :user="user"></user-item>
            </li>
        </ul>
    </section>
</template>