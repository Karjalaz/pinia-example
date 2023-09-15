<script setup>
import { defineProps, ref, computed } from 'vue';


const props = defineProps({
    name: String,
    id: String,
    options: Array,
    callback: Function,
    noValueText: String
});

const chosen = ref(null);
const optionsVisible = ref(false);

const arrow = computed(() => (optionsVisible.value) ? '&#8624;' : '&#8628;');

function selectOption(option) {
    chosen.value = option;
    optionsVisible.value = false;

    props.callback(option);
}
</script>

<template>
    <div class="filter w-full flex flex-col">
        <label 
            :for="id"
            class="mb-2 font-medium">
            Filter by {{ name }}:
        </label>
        <div
            :id="id" 
            class="filter__content relative">
            <p class="filter__text flex items-center rounded 
                border border-2 border-primary p-3">
                {{ chosen ?? noValueText }}
                <span
                    class="ms-auto text-lg cursor-pointer"
                    @click="selectOption(null)">
                    &#9747;
                </span>
                <span 
                    class="ms-4 text-xl cursor-pointer"
                    v-html="arrow"
                    @click="optionsVisible = !optionsVisible">
                </span>
            </p>
            <transition 
                name="slide" 
                mode="out-in">
                <ul 
                    v-show="optionsVisible"
                    class="filter__items w-full absolute border border-1 border-secondary 
                        text-dark z-10 bg-white bg-opacity-95">
                    <li 
                        class="filter-item cursor-pointer p-2
                            hover:bg-secondary"
                        v-for="option in options"
                        :key="option.toLocaleUpperCase()"
                        :class="{'text-primary': chosen == option}"
                        @click="selectOption(option)">
                        {{ option }}
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>