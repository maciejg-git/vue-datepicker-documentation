<template>
  <div v-if="templateCode || scriptCode">
    <tabs v-model="activeTab">
      <tabs-bar
        class="flex flex-auto items-center"
        class:item="border-transparent
        hover:bg-gray-50
        hover:dark:bg-neutral-700"
        class:item-active="shadow-none
        border-b-2
        border-violet-500"
      >
        <tabs-bar-item
          v-if="templateCode"
          for="template"
          class="-mb-px border-b-2 p-3 px-4 font-semibold transition-colors duration-200"
        >
          template
        </tabs-bar-item>
        <tabs-bar-item
          v-if="scriptCode"
          for="script"
          class="-mb-px border-b-2 p-3 px-4 font-semibold transition-colors duration-200"
        >
          script
        </tabs-bar-item>
      </tabs-bar>
      <tabs-container>
        <tab v-if="templateCode" name="template">
          <higlighted-code
            v-if="templateCode"
            :code="templateCode"
            template
            language="html"
          ></higlighted-code>
        </tab>
        <tab v-if="scriptCode" name="script">
          <higlighted-code
            v-if="scriptCode"
            :code="scriptCode"
            script
            language="javascript"
          ></higlighted-code>
        </tab>
      </tabs-container>
    </tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

let props = defineProps({
  name: String,
});

let templateCode = ref("");
let scriptCode = ref("");
let templateRegexp = /^<template>[\r\n]+([\s\S]*?)^<\/template>/m;
let scriptRegexp = /^<script(?: setup)?>([\s\S]*?)^<\/script>/gm;
let cutTemplateRegexp = /^.*<!-- CUT START -->([\s\S]*?)<!-- CUT END -->/gm;
let cutScriptRegexp =
  /^.*\/\* CUT START \*\/[\r\n]+([\s\S]*?)\/\* CUT END \*\//m;

import(`./Examples/${props.name}.vue?raw`).then((i) => {
  templateCode.value = i.default.match(templateRegexp);
  scriptCode.value = i.default.match(scriptRegexp);

  templateCode.value = templateCode.value && templateCode.value[1];
  scriptCode.value = scriptCode.value && scriptCode.value[0];

  templateCode.value =
    templateCode.value && templateCode.value.replace(cutTemplateRegexp, "");
  scriptCode.value =
    scriptCode.value && scriptCode.value.match(cutScriptRegexp, "")[1];
});

let activeTab = ref("template");
</script>
