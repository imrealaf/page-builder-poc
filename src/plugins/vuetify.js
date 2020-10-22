import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

const config = {
  customVariables: ["~/styles/vars.scss"],
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#AA00FF",
      },
      dark: {},
    },
  },
};

export default new Vuetify(config);
