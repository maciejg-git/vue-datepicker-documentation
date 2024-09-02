import * as datepicker from "./components"

export default {
  install(app, options = { prefix: "" }) {
    Object.entries(datepicker).forEach((component) => {
      app.component(options.prefix + component[0], component[1]);
    });
  }
}
