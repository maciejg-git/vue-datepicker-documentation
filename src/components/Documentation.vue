<template>
  <div
    class="sticky top-0 z-50 flex h-12 items-center bg-[#212121] px-12 text-xl font-bold text-gray-300 shadow-lg"
  >
    Vue Datepicker
  </div>

  <div class="mx-auto max-w-screen-lg text-gray-300">
    <h4 class="my-10 text-2xl font-semibold text-gray-300">Props reference</h4>

    <reference-table :items="referenceProps.props"></reference-table>

    <h4 class="my-10 text-2xl font-semibold text-gray-300">
      Example - simple datepicker
    </h4>

    <div
      class="overflow-auto rounded-md border bg-gray-50 p-6 py-8 dark:border-neutral-700 dark:bg-[#171717]"
    >
      <example-simple></example-simple>
    </div>

    <collapse>
      <template #reference="{ isOpen, onTrigger }">
        <button-chevron v-on="onTrigger" :isOpen="isOpen" class="ml-auto mt-2"
          >Source</button-chevron
        >
      </template>
      <div class="overflow-hidden">
        <description name="ExampleSimple"></description>
      </div>
    </collapse>

    <h4 class="my-10 text-2xl font-semibold text-gray-300">
      Example - simple datepicker
    </h4>

    <div
      class="bg-ray-50 overflow-auto rounded-md border p-6 py-8 dark:border-neutral-700 dark:bg-[#171717]"
    >
      <div class="flex">
        <example-model v-model="date"></example-model>
        <div class="ml-10 font-mono">v-model: {{ date }}</div>
      </div>
    </div>

    <collapse>
      <template #reference="{ isOpen, onTrigger }">
        <button-chevron v-on="onTrigger" :isOpen="isOpen" class="ml-auto mt-2"
          >Source</button-chevron
        >
      </template>
      <div class="overflow-hidden">
        <description name="ExampleModel"></description>
      </div>
    </collapse>
  </div>
  <div class="h-[120px]"></div>
</template>

<script setup>
import referenceProps from "../datepicker.json";
import { ref } from "vue";

let date = ref(null);
</script>
