<template>
  <transition :name="transition" mode="out-in">
    <div :key="current.month.toString() + current.year.toString()">
      <slot></slot>
    </div>
  </transition>
</template>

<script setup>
import { inject, provide, computed } from "vue";

let selectedSingle = inject("selectedSingle");
let selectedRange = inject("selectedRange");
let rangeMode = inject("rangeMode");
let rangeState = inject("rangeState");
let mouseOverDate = inject("mouseOverDate");
let today = inject("today");
let { transitionName, transitionDirection } = inject("transition");
let current = inject("current");
let customVariants = inject("customVariants");
let rangeSelectionStates = inject("rangeSelectionStates");

let transition = computed(() => {
  return `${transitionName.value}-${transitionDirection.value}`;
});

let isPartiallySelected = (date) => {
  if (rangeMode.value && rangeState.value == 1) {
    return (
      (mouseOverDate.value >= date && date >= selectedRange.value[0]) ||
      (mouseOverDate.value <= date && date <= selectedRange.value[0])
    );
  }
  return false;
};

let isSelectedDay = (date) => {
  if (rangeMode.value) return false;
  return (
    !!selectedSingle.value && selectedSingle.value.getTime() == date.getTime()
  );
};

let isSelectedFirst = (date) => {
  if (
    rangeMode.value &&
    (rangeState.value === rangeSelectionStates.FROM_SELECTED ||
      rangeState.value === rangeSelectionStates.TO_SELECTED)
  ) {
    return selectedRange.value[0].getTime() == date.getTime();
  }
  return false;
};

let isSelectedLast = (date) => {
  if (
    rangeMode.value &&
    rangeState.value === rangeSelectionStates.TO_SELECTED
  ) {
    return selectedRange.value[1].getTime() == date.getTime();
  }
  return false;
};

let isSelectedMid = (date) => {
  if (
    rangeMode.value &&
    rangeState.value === rangeSelectionStates.TO_SELECTED
  ) {
    return selectedRange.value[0] < date && date < selectedRange.value[1];
  }
  return false;
};

let isToday = (date) => today.getTime() == date.getTime();

let getDayVariant = (date) => {
  if (typeof date === "number" || date === "") return "adjacent";

  let variants = {};

  if (customVariants) {
    for (let variant in customVariants) {
      if (typeof customVariants[variant] === "function") {
        variants[variant] = customVariants[variant](date);
      }
    }
  }

  return {
    ...variants,
    selected: isSelectedDay(date),
    today: isToday(date),
    partiallySelected: isPartiallySelected(date),
    selectedFirst: isSelectedFirst(date),
    selectedLast: isSelectedLast(date),
    selectedMid: isSelectedMid(date),
  };
};

provide("getDayVariant", getDayVariant);
</script>

<style scoped>
.fade-next-enter-active,
.fade-next-leave-active,
.fade-prev-enter-active,
.fade-prev-leave-active {
  transition: opacity 0.1s ease;
}
.fade-next-enter-from,
.fade-next-leave-to,
.fade-prev-enter-from,
.fade-prev-leave-to {
  opacity: 0;
}

.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.12s ease;
}
.slide-prev-enter-from {
  transform: translateX(-100%);
}
.slide-prev-leave-to {
  transform: translateX(100%);
}

.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 0.12s ease;
}
.slide-next-enter-from {
  transform: translateX(100%);
}
.slide-next-leave-to {
  transform: translateX(-100%);
}
</style>
