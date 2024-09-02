<template>
  <div>
    <slot>
      {{ todayFormatted }}
    </slot>
  </div>
</template>

<script setup>
import { inject } from "vue"

let todayFormatted = inject("todayFormatted")
</script>
