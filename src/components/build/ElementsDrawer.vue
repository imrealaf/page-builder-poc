<template>
  <v-navigation-drawer id="elements" app permanent clipped>
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
  </v-navigation-drawer>
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
  },

  methods: {
    ...mapActions({
      setCurrentItem: "build/setCurrentItem",
    }),

    isDragging() {
      return this.$dom.body.classList.contains(this.$config.isDraggingClass);
    },

    // Drag item events
    onOverItem(item) {
      if (!this.isDragging()) {
        this.setCurrentItem(item);
      }
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
}
</style>
