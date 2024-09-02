import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import DatepickerPlugin from "./components/Datepicker"
import TabsPlugin from "./components/Tabs"
import Documentation from "./components/Documentation.vue"
import ReferenceTable from "./components/ReferenceTable.vue"
import Description from "./components/Description.vue"
import Code from "./components/Code.vue"
import Collapse from "./components/Collapse.vue"
import ButtonChevron from "./components/ButtonChevron.vue"
import "./tailwind.css"
import "./styles/hljs/google-light.css";
// dark style
// import "../styles/hljs/vs2015.css";
import "./styles/hljs/oceanicnext.css";

let app = createApp(App)

const examples = import.meta.glob('./components/Examples/Example*.vue')
for (const path in examples) {
  let file = path.replace(/^.*[\\\/]/, '')
  file = file.substring(0, file.lastIndexOf('.'))
  app.component(file, defineAsyncComponent(examples[path]))
}

document.documentElement.classList.add("dark")

app.component("Documentation", Documentation)
app.component("ReferenceTable", ReferenceTable)
app.component("Description", Description)
app.component("HiglightedCode", Code)
app.component("Collapse", Collapse)
app.component("ButtonChevron", ButtonChevron)

app.use(DatepickerPlugin)
app.use(TabsPlugin)

app.mount('#app')
