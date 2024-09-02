<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, provide, watch, reactive } from "vue"

let props = defineProps({
  modelValue: {
    type: String,
    default: "",
  }
})

let tabs = ref([])

let activeTab = null

let addTab = (name) => {
  let tab = getTab(name)

  if (tab) return tab

  let newTab = reactive({
    name: name,
    isActive: false,
  })

  tabs.value.push(newTab)

  if (props.modelValue === name) activateTab(name)

  return newTab
}

let removeTab = (name) => {
  let index = tabs.value.findIndex((tab) => tab.value.name === name)

  if (index === -1) return

  tabs.value.splice(index, 1)
}

let getTab = (tab) => {
  return tabs.value.find((t) => t.name === tab);
};

let activateTab = (name) => {
  let tab = getTab(name)

  if (!tab || tab === activeTab) return

  tab.isActive = true
  if (activeTab) activeTab.isActive = false
  activeTab = tab
}

let handleTabsBarItemClick = (tab) => {
  activateTab(tab)
}

watch(() => props.modelValue, () => {
  activateTab(props.modelValue)
})

provide("tabs", { addTab, removeTab, handleTabsBarItemClick })
</script>
