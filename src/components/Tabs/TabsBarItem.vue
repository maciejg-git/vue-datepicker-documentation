<template>
  <li>
    <button @click="handleTabsBarItemClick(props.for)" v-bind="$attrs" :class="getClassesByVariant">
      <slot :tab="tab"></slot>
    </button>
  </li>
</template>

<script setup>
import { inject, onMounted, ref, computed, onUnmounted } from "vue";

defineOptions({
  inheritAttrs: false
})

let props = defineProps({
  for: {
    type: String,
  },
  ["class:item"]: {
    type: String,
    default: "",
  },
  ["class:itemActive"]: {
    type: String,
    default: "",
  },
});

let tab = ref(null);

let { addTab, removeTab, handleTabsBarItemClick } = inject("tabs");
let tabsBarProps = inject("tabs-bar-props");

tab = addTab(props.for);

onUnmounted(() => {
  removeTab(props.for)
})

let getClassesByVariant = computed(() => {
  return tab.isActive
    ? props["class:itemActive"]
      ? props["class:itemActive"]
      : tabsBarProps["class:itemActive"]
    : props["class:item"]
    ? props["class:item"]
    : tabsBarProps["class:item"];
});
</script>
