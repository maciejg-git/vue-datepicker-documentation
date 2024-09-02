<template>
  <div>
    <slot>
    {{ weekday }}
    </slot>
  </div>
</template>

<script setup>
import { defineProps } from "vue"

let props = defineProps({
  weekday: {
    type: String,
  }
})
</script>
