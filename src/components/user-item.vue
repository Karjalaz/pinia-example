<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
    user: Object
});

const addressInfoVisibility = ref(false);
const addressInfoFocused = ref(false);

function avatarClick() {
    addressInfoVisibility.value = !addressInfoVisibility.value;
}

function setAddressInfoVisibilityTimeout() {
    setTimeout(() => {
            if (!addressInfoFocused.value)
                addressInfoVisibility.value = false;
        }, 1000)
}

watch(addressInfoFocused, () => {
    setAddressInfoVisibilityTimeout();        
});
</script>

<template>
    <div class="user-item flex flex-row items-center justify-stretch text-start
        shadow p-2 my-2">
        <transition name="fade" mode="out-in">
            <div v-if="addressInfoVisibility" 
                class="user-item__address-info absolute z-10 text-primary 
                rounded p-2 mb-6 cursor-text bg-secondary bg-opacity-95"
                @mouseover="addressInfoFocused = true"
                @mouseleave="addressInfoFocused = false">
                <p class="user-item__score">
                    User score: 
                    <span class="text-dark">
                        {{ user.score }}
                    </span>
                </p>
                <p class="user-item__adddress font-medium">
                    Address: 
                    <span class="text-dark">
                        {{ user.address }}
                    </span>
                </p>
            </div>
        </transition>
        <img
            class="user-item__user-avatar object-cover rounded-full m-4 ms-0 
            hover:animate-squish cursor-pointer"
            :src="user.avatar"
            alt="Avatar"
            @click="avatarClick">
        <div class="user-item__info flex flex-col items-start h-full pb-1">
            <h3
                class="user-item__title font-semibold"
                v-html="user.title"></h3>
            <p 
                class="user-item__text text-dark"
                v-html="user.subtitle"></p>
        </div>

    </div>
</template>

<style scoped>
.user-item__user-avatar {
    width: clamp(1.75rem, 1.426rem + 1.728vw, 3.5rem);
    height: clamp(1.75rem, 1.426rem + 1.728vw, 3.5rem);
}

.user-item__text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
</style>