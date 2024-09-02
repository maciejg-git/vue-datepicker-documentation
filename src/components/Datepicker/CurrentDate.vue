<template>
  <div>
    <slot>
      {{ months[current.month] }} {{ current.year }}
    </slot>
  </div>
</template>

<script setup>
import { inject } from "vue" 

let { months } = inject("names")
let current = inject("current")
</script>
