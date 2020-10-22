<template>
  <div>
    <v-toolbar dense flat dark>
      <v-toolbar-title>{{ $t("build.elementsDrawer.title") }}</v-toolbar-title>
    </v-toolbar>
    <v-list dense nav>
      <DropContainer
        :class="$config.dragContainerClass"
        behaviour="copy"
        :group-name="$config.dropContainerId"
      >
        <DraggableItem v-for="(item, i) in items" :key="i">
          <v-list-item
            link
            class="draggable-item"
            @dblclick.stop.prevent="clickAddItem(item)"
            @mouseover="onOverItem(item)"
            @mouseenter="onOverItem(item)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </DraggableItem>
      </DropContainer>
    </v-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import items from "@/data/elements";

export default {
  data() {
    return {
      items,
    };
  },

  computed: {
    ...mapGetters({
      currentItem: "build/currentItem",
    }),

    show: {
      get() {
        return this.value;
      },
      set(newVal) {
        return newVal;
      },
    },
  },

  methods: {
    ...mapActions({
      setCurrentItem: "build/setCurrentItem",
    }),

    // Drag item events
    onOverItem(item) {
      if (!this.$utils.isDragging) {
        this.setCurrentItem(item);
      }
    },

    clickAddItem(item) {
      this.$emit("click-add-item", item);
    },
  },

  watch: {
    currentItem(value) {
      console.log(value);
    },
  },
};
</script>
<style lang="scss">
#elements {
  overflow: visible !important;
  top: 64px !important;
}
</style>
