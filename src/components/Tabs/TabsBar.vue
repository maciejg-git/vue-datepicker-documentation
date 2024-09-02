<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script setup>
import { provide } from "vue";

let props = defineProps({
  ["class:item"]: {
    type: String,
    default: "",
  },
  ["class:itemActive"]: {
    type: String,
    default: "",
  },
});

provide("tabs-bar-props", props);
</script>
