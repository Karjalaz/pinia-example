<script setup>
import filterComponent from './filter-component.vue';
import { useFilterStore } from './../stores/filter';


const countries = ['Russia', 'USA', 'Mexico'];
const scores = ['below 10', 'inbetween 10 and 20', 'above 20'];

const store = useFilterStore()
</script>

<template>
    <section class="event-filter flex flex-col gap-6">
        <filter-component
            id="countries"
            name="country"
            :options="countries"
            :callback="store.selectCountry"
            no-value-text="Choose country">
        </filter-component>
        <filter-component
            id="scores"
            name="score"
            :options="scores"
            :callback="store.selectScore"
            no-value-text="Choose score range">
        </filter-component>
    </section>
</template>