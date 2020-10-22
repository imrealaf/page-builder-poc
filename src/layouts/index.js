import Vue from "vue";

import Default from "./Default";
import Protected from "./Protected";

/**
 * Set layouts
 */
const layouts = {
  "default-layout": Default,
  "protected-layout": Protected,
};

/**
 * Assign layouts
 */
for (const key in layouts) {
  Vue.component(key, layouts[key]);
}
