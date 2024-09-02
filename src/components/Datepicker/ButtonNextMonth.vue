<template>
  <button @click="handleControlButtonClick('next-month')">
    <slot></slot>
  </button>
</template>

<script setup>
import { inject } from "vue" 

let { handleControlButtonClick } = inject("events")
</script>
