<template>
  <transition name="fade" mode="out-in">
    <div v-show="tab && tab.isActive">
      <slot></slot>
    </div>
  </transition>
</template>

<script setup>
import { inject, onMounted, ref, onUnmounted } from "vue"

let props = defineProps({
  name: {
    type: String,
  }
})

let tab = ref(null)

let { addTab, removeTab } = inject("tabs")

tab = addTab(props.name)

onUnmounted(() => {
  removeTab(props.name)
})

// let beforeLeaveTransition = (el) => {
//   el.style.display = "none";
// };
</script>

<style>
.fade-leave-active,
.fade-side-slide-leave-active,
.fade-top-slide-leave-active {
  position: absolute;
  top: 0;
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.2s ease;
}

.fade-enter-active {
  transition-delay: 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
