<template>
  <div>
    <slot :weekdays="weekdays"></slot>
  </div>
</template>

<script setup>
import { inject } from "vue";
  
let { weekdays } = inject("names");
</script>
