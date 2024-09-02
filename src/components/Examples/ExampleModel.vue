<template>
    <datepicker
      class="w-[320px] overflow-hidden rounded-md border bg-white px-2 pb-2 text-center text-gray-800 dark:border-neutral-800 dark:bg-neutral-800 dark:bg-neutral-800 dark:text-gray-300"
      v-model="date"
      :model-format="example.modelFormat"
      v-slot="{ days }"
    >
      <date-control-bar class="my-4 grid grid-flow-col grid-cols-6">
        <button-prev-year
          class="mx-auto flex flex-col justify-center rounded px-2 py-1 leading-none focus:outline-none focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-400"
        >
          <chevron-double-left />
        </button-prev-year>
        <button-prev-month
          class="mx-auto flex flex-col justify-center rounded px-2 py-1 leading-none focus:outline-none focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-400"
        >
          <chevron-left />
        </button-prev-month>

        <current-date class="col-span-2 inline-block font-bold"></current-date>

        <button-next-month
          class="mx-auto flex flex-col justify-center rounded px-2 py-1 leading-none focus:outline-none focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-400"
        >
          <chevron-right />
        </button-next-month>
        <button-next-year
          class="mx-auto flex flex-col justify-center rounded px-2 py-1 leading-none focus:outline-none focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-400"
        >
          <chevron-double-right />
        </button-next-year>
      </date-control-bar>

      <weekday-bar class="mb-2 grid grid-cols-7" v-slot="{ weekdays }">
        <weekday
          v-for="weekday in weekdays"
          :weekday="weekday"
          class="text-sm font-semibold dark:text-gray-300"
        ></weekday>
      </weekday-bar>

      <days-container class="relative mb-2 grid grid-cols-7">
        <day
          v-for="day in days"
          :date="day"
          class="mx-1 my-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full py-1 text-sm font-semibold"
          class:today="!font-bold text-gray-400 dark:text-violet-400 border border-violet-400"
          class:adjacent="pointer-events-none text-gray-800/10 dark:text-gray-200/10"
          class:selected="!text-white dark:text-gray-200 bg-violet-400 dark:bg-violet-500 hover:bg-violet-600 dark:hover:bg-violet-700"
          class:selected-first="!text-white dark:text-gray-200 bg-violet-400 dark:bg-violet-500 hover:bg-violet-600 dark:hover:bg-violet-700"
          class:selected-last="!text-white dark:text-gray-200 bg-violet-400 dark:bg-violet-500 hover:bg-violet-600 dark:hover:bg-violet-700"
          class:selected-mid="!text-white dark:text-gray-200 bg-violet-400 dark:bg-neutral-600 hover:bg-violet-600 dark:hover:bg-neutral-500"
          class:partially-selected="text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-neutral-700"
        >
        </day>
      </days-container>

      <datepicker-footer
        class="bg-gray-100 py-1 text-sm font-semibold dark:bg-neutral-700 dark:text-gray-300"
      >
      </datepicker-footer>
    </datepicker>
</template>

<script setup>
import { ref, reactive } from "vue";

let date = ref(null);
let example = reactive({
  modelFormat: "date",
})
</script>
