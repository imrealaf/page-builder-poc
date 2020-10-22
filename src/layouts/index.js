import Vue from "vue";

// import Default from "./Default";
/**
 * Set layouts
 */
const layouts = {
  // "default-layout": Default,
};

/**
 * Assign layouts
 */
for (const key in layouts) {
  Vue.component(key, layouts[key]);
}
