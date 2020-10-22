import Vue from "vue";

// import {

// } from "@/utils";

const filters = {};

for (const key in filters) {
  Vue.filter(key, filters[key]);
}
