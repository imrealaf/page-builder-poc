<template>
  <div>
    <ElementsDrawer />
    <v-content class="mt-0">
      <v-container class="py-12">
        <div v-if="!items.length" class="text-center mb-6">
          Drag some items in the container below
        </div>
        <v-card class="pa-6">
          <DropContainer
            :id="$config.dropContainerId"
            :class="$config.dropContainerClass"
            :group-name="$config.dropContainerId"
            @drop="onDrop"
            non-drag-area-selector=".drag-item"
            drag-class="ghost"
            drop-class="ghost-drop"
            :drop-placeholder="$config.dropPlaceholderOptions"
            :remove-on-drop-out="true"
          >
            <DraggableItem v-for="(item, i) in items" :key="i">
              <div class="dropped-item">
                {{ item.title }}
              </div>
            </DraggableItem>
          </DropContainer>
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import ElementsDrawer from "@/components/build/ElementsDrawer";

export default {
  components: {
    ElementsDrawer,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      items: "build/items",
      currentItem: "build/currentItem",
    }),
  },

  methods: {
    ...mapActions({
      setItems: "build/setItems",
      setCurrentItem: "build/setCurrentItem",
    }),

    // Events
    onDrop(dropResult) {
      console.log(this.currentItem);
      dropResult.payload = this.currentItem;
      const newitems = this.$utils.applyDrag(this.items, dropResult);
      this.setItems(newitems);
      this.setCurrentItem(null);
    },
  },
};
</script>

<style lang="scss">
#elements {
  overflow: visible !important;
}
</style>
