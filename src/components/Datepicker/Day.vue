<template>
  <a
    href=""
    :class="getClassesByVariant()"
    @mouseenter="handleMouseOverDay(date)"
    @click.prevent="handleDayClicked(date, variant)"
  >
    <slot :date="date" :variant="variant">
      {{ variant === "adjacent" ? date : date.getDate() }}
    </slot>
  </a>
</template>

<script setup>
import { defineProps, inject, computed } from "vue";

let props = defineProps({
  date: {
    type: [Date, Number, String],
  },
  ["classSelected"]: {
    type: String,
    default: "",
  },
  ["classSelectedFirst"]: {
    type: String,
    default: "",
  },
  ["classSelectedLast"]: {
    type: String,
    default: "",
  },
  ["classSelectedMid"]: {
    type: String,
    default: "",
  },
  ["classToday"]: {
    type: String,
    default: "",
  },
  ["classAdjacent"]: {
    type: String,
    default: "",
  },
  ["classPartiallySelected"]: {
    type: String,
    default: "",
  },
  ["classUser"]: {
    type: [Function, String],
    default: undefined,
  },
});

let getDayVariant = inject("getDayVariant");
let { handleDayClicked, handleMouseOverDay } = inject("events");

let variant = computed(() => getDayVariant(props.date));

let getClassesByVariant = () => {
  let c = "";

  if (variant.value === "adjacent") {
    return props["classAdjacent"];
  }

  if (variant.value.selected) c += props["classSelected"] + " ";
  else if (variant.value.selectedFirst) c += props["classSelectedFirst"] + " ";
  else if (variant.value.selectedLast) c += props["classSelectedLast"] + " ";
  else if (variant.value.selectedMid) c += props["classSelectedMid"] + " ";
  else if (variant.value.partiallySelected)
    c += props["classPartiallySelected"] + " ";

  if (variant.value.today) c += props["classToday"] + " ";

  if (props["classUser"]) {
    if (typeof props["classUser"] === "function") {
      c += props["class:user"](props.date, variant.value);
    }
    if (typeof props["classUser"] === "string") {
      c += props["classUser"];
    }
  }

  return c;
};
</script>
