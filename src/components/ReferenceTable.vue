<template>
  <div
    v-if="items.length"
    class="bg-[#fbfbfb] dark:bg-[#1e1e1e] rounded-lg p-4 mt-4 mb-6 border dark:border-0"
    v-bind="$attrs"
  >
    <div
      v-for="(prop, index) in items"
      class="group mt-4 first:mt-0"
    >
      <div class="flex items-center">
        <!-- prop -->
        <code class="dark:text-gray-300">
          <span class="group-hover:underline">{{ prop.prop }}</span>
          <div
            v-if="prop.required"
            class="text-xs text-red-400"
          >
            (required)
          </div>
          <div
            v-if="prop.tags"
            class="text-xs text-blue-500"
          >
          ({{ prop.tags }})
          </div>
        </code>
        <!-- default value -->
        <code class="code-text mr-6 ml-auto">{{ prop.default }}</code>
        <!-- types -->
        <div class="flex flex-col gap-y-1 md:flex-row md:gap-y-0">
          <code
            v-for="type in prop.type"
            class="code-word"
          >
            {{ type }}
          </code>
        </div>
      </div>
      <div
        class="ml-[20px] md:ml-[200px] mb-4 mt-4 md:mt-2 text-gray-300"
        v-html="template(prop.description)"
      ></div>
      <div v-if="index < items.length - 1" class="border-b dark:border-neutral-700"></div>
    </div>
  </div>
</template>

<script setup>
  let props = defineProps({
    items: {
      type: Array,
      default: [],
    }
  })  

    let template = (string) => {
      return string
        .replace(
          new RegExp("(?<!<[^>]*)('[^']*')|(\\bv-\\w+\\S+)|`([^`]*)`", "ig"),
          `<code class="code-text">$1$2$3</code>`
        )
        .replace(
          new RegExp("@(\\S*)", "ig"),
          `<code class="code-word">$1</code>`
        );
    };
</script>

<style>
.code-text {
  @apply text-red-600 dark:text-yellow-600 font-semibold text-sm
}
.code-word {
  @apply text-sm bg-indigo-300 text-black dark:text-gray-100 dark:bg-indigo-500 rounded px-1 py-0.5 mr-1 text-sm;
}
</style>
