<script setup>
import EventFilter from './../components/event-filter.vue';
import EventItem from './../components/event-item.vue';
import events from './../assets/events.json';

</script>

<template>
    <div class="page flex flex-row">
        <event-filter></event-filter>
        <section class="page__events flex flex-col">
            <h2 class="page__events-title font-bold">
                List
            </h2>
            <ul class="page__event-list">
                <li 
                    class="page__event"
                    v-for="event in events"
                    key="event.id">
                    <event-item :event="event"></event-item>
                </li>
            </ul>
        </section>
    </div>
</template>