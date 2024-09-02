import * as tabs from "./components"

export default {
  install(app, options = { prefix: "" }) {
    Object.entries(tabs).forEach((component) => {
      app.component(options.prefix + component[0], component[1])
    })
  }
}
