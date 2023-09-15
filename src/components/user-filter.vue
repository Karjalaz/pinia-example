<script setup>
import { ref, computed } from 'vue';
import { useFilterStore } from './../stores/filter';



const countries = ['Russia', 'USA', 'Mexico'];
const scores = ['below 10', 'inbetween 10 and 20', 'above 20'];

const store = useFilterStore()

const countryOptionsVisible = ref(false);
const scoreOptionsVisible = ref(false);

const countryArrow = computed(() => (countryOptionsVisible.value) ? '&#8624;' : '&#8628;');
const scoreArrow = computed(() => (scoreOptionsVisible.value) ? '&#8624;' : '&#8628;');

const chosenCountry = computed(() => store.countryFilter);
const chosenScore = computed(() => store.scoreFilter);

function selectCountry(country) {
    store.selectCountry(country);
    countryOptionsVisible.value = false;
}

function selectScore(score) {
    store.selectScore(score);
    scoreOptionsVisible.value = false;
}
</script>

<template>
    <section class="event-filter flex flex-col gap-6">
        <div class="event-filter__country w-full flex flex-col">
            <label 
                for="countries"
                class="mb-2">
                Filter by country:
            </label>
            <div
                id="countries" 
                class="event-filter__country-filter relative">
                <p class="event-filter__country-filter flex items-center rounded 
                    border border-2 border-primary p-3"
                    @click="countryOptionsVisible = !countryOptionsVisible">
                    {{ chosenCountry ?? 'Choose country' }}
                    <span 
                        class="ms-auto text-lg cursor-pointer"
                        v-html="countryArrow">
                    </span>
                </p>
                <transition 
                    name="slidess" 
                    mode="out-in">
                    <ul 
                        v-show="countryOptionsVisible"
                        class="event-filter__countries w-full absolute border border-1 border-secondary 
                            text-dark z-10 bg-white bg-opacity-95">
                        <li 
                            class="event-filter__country-item cursor-pointer p-2
                                hover:bg-secondary"
                            v-for="country in countries"
                            :key="country.toLocaleUpperCase()"
                            :class="{'text-primary': chosenCountry == country}"
                            @click="selectCountry(country)">
                            {{ country }}
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
        <div class="event-filter__score w-full flex flex-col">
            <label 
                for="score"
                class="mb-2">
                Filter by score:
            </label>
            <div
                id="scores" 
                class="event-filter__score-filter relative">
                <p class="event-filter__score-filter flex items-center rounded 
                    border border-2 border-primary p-3"
                    @click="scoreOptionsVisible = !scoreOptionsVisible">
                    {{ chosenScore ?? 'Choose score range' }}
                    <span 
                        class="ms-auto text-lg cursor-pointer"
                        v-html="scoreArrow">
                    </span>
                </p>
                <transition 
                    name="slidess" 
                    mode="out-in">
                    <ul 
                        v-show="scoreOptionsVisible"
                        class="event-filter__scores w-full absolute border border-1 border-secondary 
                            text-dark z-10 bg-opacity-95">
                        <li 
                            class="event-filter__score-item cursor-pointer p-2
                                hover:bg-secondary"
                            v-for="score in scores"
                            :key="score.toLocaleUpperCase()"
                            :class="{'text-primary': chosenScore == score}"
                            @click="selectScore(score)">
                            {{ score }}
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
    </section>
</template>

<style scoped>
.event-filter__countries {
    max-height: 200px
}

.slide-enter-active, .slide-leave-active {
    transition: max-height .8s;
}

.slide-enter-from, .slide-leave-to {
    max-height: 0;
}

.slide-enter-to, .slide-leave-from {
    max-height: 100%;
}
</style>