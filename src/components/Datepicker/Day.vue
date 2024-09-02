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
  ["class:selected"]: {
    type: String,
    default: "",
  },
  ["class:selectedFirst"]: {
    type: String,
    default: "",
  },
  ["class:selectedLast"]: {
    type: String,
    default: "",
  },
  ["class:selectedMid"]: {
    type: String,
    default: "",
  },
  ["class:today"]: {
    type: String,
    default: "",
  },
  ["class:adjacent"]: {
    type: String,
    default: "",
  },
  ["class:partiallySelected"]: {
    type: String,
    default: "",
  },
  ["class:user"]: {
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
    return props["class:adjacent"];
  }

  if (variant.value.selected) c += props["class:selected"] + " ";
  else if (variant.value.selectedFirst) c += props["class:selectedFirst"] + " ";
  else if (variant.value.selectedLast) c += props["class:selectedLast"] + " ";
  else if (variant.value.selectedMid) c += props["class:selectedMid"] + " ";
  else if (variant.value.partiallySelected)
    c += props["class:partiallySelected"] + " ";

  if (variant.value.today) c += props["class:today"] + " ";

  if (props["class:user"]) {
    if (typeof props["class:user"] === "function") {
      c += props["class:user"](props.date, variant.value);
    }
    if (typeof props["class:user"] === "string") {
      c += props["class:user"];
    }
  }

  return c;
};
</script>
