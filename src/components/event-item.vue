<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    event: Object
})
</script>

<template>
    <div class="event-item">
        {{ event.title }}
    </div>
</template>