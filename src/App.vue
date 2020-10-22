<template>
  <v-app>
    <v-app-bar app color="primary" dark style="left: 0">
      <div class="d-flex align-center title">
        Builder POC
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer id="elements" app permanent clipped>
      <v-list dense nav>
        <dnd-container
          :class="$config.dragContainerClass"
          behaviour="copy"
          :group-name="$config.dropContainerId"
        >
          <dnd-item v-for="(item, i) in dragItems" :key="i">
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
          </dnd-item>
        </dnd-container>
      </v-list>
    </v-navigation-drawer>

    <v-content class="mt-0">
      <v-container class="py-12">
        <div v-if="!dropItems.length" class="text-center mb-6">
          Drag some items in the container below
        </div>
        <v-card class="pa-6">
          <dnd-container
            :id="$config.dropContainerId"
            :class="`${this.$config.dropContainerClass}`"
            :group-name="$config.dropContainerId"
            @drop="onDrop"
            non-drag-area-selector=".drag-item"
            drag-class="ghost"
            drop-class="ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
            :remove-on-drop-out="true"
          >
            <dnd-item v-for="(item, i) in dropItems" :key="i">
              <div class="dropped-item" :data-item-index="i">
                {{ item.title }}
              </div>
            </dnd-item>
          </dnd-container>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      currentItem: null,
      dropPlaceholderOptions: this.$config.dropPlaceholderOptions,
      dragItems: [
        {
          title: "Heading",
          icon: "title",
          props: {
            label: "",
            value: ""
          }
        },
        {
          title: "Text",
          icon: "short_text",
          props: {
            label: "",
            value: ""
          }
        },
        {
          title: "Button",
          icon: "smart_button",
          props: {
            label: "",
            value: ""
          }
        }
      ],
      dropItems: [],
      right: null
    };
  },

  computed: {},

  methods: {
    isDragging() {
      return this.$dom.body.classList.contains(this.$config.isDraggingClass);
    },

    // Container events
    onDrop(dropResult) {
      dropResult.payload = this.currentItem;
      this.dropItems = this.$utils.applyDrag(this.dropItems, dropResult);
      this.currentItem = null;
    },

    // Drag item events
    onOverItem(item) {
      if (!this.isDragging()) {
        this.currentItem = item;
      }
    }
  }
};
</script>

<style lang="scss" >
#elements {
  overflow: visible !important;
}
</style>

