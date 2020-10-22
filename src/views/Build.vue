<template>
  <div>
    <v-btn
      id="toggle-elements"
      color="black"
      dark
      absolute
      top
      left
      fab
      @click="elementsDrawer = !elementsDrawer"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="elementsDrawer"
      id="elements"
      app
      temporary
      clipped
      dark
      :hide-overlay="true"
      width="200"
    >
      <ElementsDrawer @click-add-item="onClickAddItem" />
    </v-navigation-drawer>
    <v-content class="mt-0" @click="contentClick">
      <v-container class="py-12">
        <div v-if="!items.length" class="text-center mb-6">
          {{ $t("build.noElementsText") }}
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
            <DraggableItem
              v-for="(item, i) in items"
              :key="i"
              class="dropped-item-wrapper"
            >
              <div
                class="dropped-item"
                @click.stop.prevent="onItemClick($event, item)"
                @dblclick="selectItem($event, item)"
              >
                {{ item.title }}
              </div>
              <div class="dropped-item-actions">
                <v-btn
                  fab
                  color="black"
                  dark
                  x-small
                  @click.stop.prevent="
                    currentItem = item;
                    propsDrawer = true;
                  "
                  ><v-icon small>mdi-pencil</v-icon></v-btn
                >
              </div>
            </DraggableItem>
          </DropContainer>
        </v-card>
      </v-container>
    </v-content>
    <v-btn id="toggle-design" color="black" dark absolute top right fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="propsDrawer"
      id="props"
      app
      temporary
      clipped
      right
      dark
      :hide-overlay="false"
      overlay-opacity="0"
      width="400"
    >
      <PropsDrawer v-if="currentItem" :data="currentItem" />
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import ElementsDrawer from "@/components/build/ElementsDrawer";
import PropsDrawer from "@/components/build/PropsDrawer";

export default {
  components: {
    ElementsDrawer,
    PropsDrawer,
  },
  data() {
    return {
      elementsDrawer: false,
      propsDrawer: false,
      currentItem: null,
    };
  },

  computed: {
    ...mapGetters({
      items: "build/items",
      currentDragItem: "build/currentItem",
    }),
  },

  methods: {
    ...mapActions({
      setItems: "build/setItems",
      setCurrentDragItem: "build/setCurrentItem",
    }),

    // Events
    onDrop(dropResult) {
      console.log(dropResult);
      dropResult.payload = this.currentDragItem;
      const newitems = this.$utils.applyDrag(this.items, dropResult);
      this.setItems(newitems);
      this.setCurrentDragItem(null);
    },

    onClickAddItem(item) {
      const items = [...this.items];
      items.push(item);
      this.setItems(items);
    },

    onItemClick(e, item) {
      const itemEl = e.target;
      const wrapperEl = itemEl.parentElement;
      const containerEl = wrapperEl.parentElement;

      this.clearActive(containerEl);
      wrapperEl.classList.toggle("active");

      console.log("click item", e.target, item);
    },

    selectItem(e, item) {
      e.target.classList.add("active");
      this.currentItem = item;
      this.propsDrawer = true;
    },

    clearActive(container) {
      const active = container.querySelector(".active");
      if (active) active.classList.remove("active");
    },

    contentClick() {
      console.log("hey");
      this.clearActive(this.$dom.el(`.${this.$config.dropContainerClass}`));
    },
  },

  mounted() {
    document.addEventListener("click", (e) => {
      const container = this.$dom.el(`.${this.$config.dropContainerClass}`);
      // const active = container.querySelector(".active");

      console.log(e.target.className);

      if (
        e.target.className.search("v-application") > -1 ||
        e.target.className.search("v-main") > -1 ||
        e.target.className.search("container") > -1
      ) {
        this.clearActive(container);
      }
    });
  },
};
</script>

<style lang="scss">
#toggle-elements,
#toggle-props {
  top: 85px;
}
</style>
