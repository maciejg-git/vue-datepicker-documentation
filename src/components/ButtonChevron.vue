<template>
  <button class="font-semibold flex justify-center items-center">
    <div>
      <slot></slot>
    </div>
    <chevron-up class="w-4 h-4 ml-2 duration-200" :class="{ 'rotate-180': isOpen }"></chevron-up>
  </button>
</template>

<script setup>
import ChevronUp from "./Icons/chevron-up-solid.js"
import ChevronDown from "./Icons/chevron-down-solid.js"

let props = defineProps({
  isOpen: {
    type: Boolean,
  }
})
</script>
