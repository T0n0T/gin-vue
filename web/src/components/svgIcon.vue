<template>
    <svg aria-hidden="true" class="svg-icon">
        <use :href="symbolId" :fill="color" />
    </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: ''
    }
})

const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style scoped>
.svg-icon {
    block-size: auto;
    background-color: #000;
}
</style>