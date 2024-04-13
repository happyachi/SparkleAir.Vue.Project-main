<template>
    <div class="counter quantity">
        <input
            class="decrement"
            type="button"
            value="-"
            @click="minus"
            :disabled="passengeTotalCount === 0"
        />
        <input type="text" v-model="count" class="number" readonly />
        <input
            class="increment"
            type="button"
            value="+"
            @click="add"
            :disabled="passengeTotalCount === 9"
        />
    </div>
</template>
<script setup>
import { defineModel, defineProps } from 'vue'

const count = defineModel({ type: Number })
const {
    passengeTotalCount,
    min = 0,
    max = 9
} = defineProps(['passengeTotalCount', 'min', 'max'])

const add = () => {
    if (count.value < max) {
        count.value += 1
    }
}

const minus = () => {
    if (count.value > min) {
        count.value -= 1
    }
}
</script>
