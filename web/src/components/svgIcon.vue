<template>
    <svg aria-hidden="true" :style="styles" viewBox="0 0 1024 1024">
        <use :xlink:href="iconName" :fill="color" width="100%" height="100%"/>
    </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "#08bebe",
    },
    width: {
        type: String,
        default: "100%",
    },
    height: {
        type: String,
        default: "100%",
    },
});

const styles = computed(() => {
    return `width: ${props.width}; height:${props.height}; display: block;`;
});

const iconName = computed(() => {
    return `#icon-${props.name}`;
});
</script>

