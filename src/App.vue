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
        <Container
          class="drag-container"
          behaviour="copy"
          group-name="1"
          drag-class="dragging"
        >
          <Draggable v-for="(item, i) in dragItems" :key="i">
            <v-list-item
              link
              class="draggable-item"
              @mouseover="onMoveDragItem(item)"
              @mouseenter="onMoveDragItem(item)"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </Draggable>
        </Container>
      </v-list>
    </v-navigation-drawer>

    <v-content class="mt-0">
      <Container @drop="onDropRemove">
        <v-container class="py-12">
          <div v-if="!dropItems.length" class="text-center mb-6">
            Drag some items in the container below
          </div>
          <v-card class="pa-6">
            <Container
              :class="`${this.$config.dropContainerClass}`"
              group-name="1"
              @drop="onDrop"
              non-drag-area-selector=".drag-item"
              drag-class="ghost"
              drop-class="ghost-drop"
              :drop-placeholder="dropPlaceholderOptions"
              :remove-on-drop-out="true"
            >
              <Draggable v-for="(item, i) in dropItems" :key="i">
                <div class="dropped-item" :data-item-index="i">
                  {{ item.title }}
                </div>
              </Draggable>
            </Container>
          </v-card>
        </v-container>
      </Container>
    </v-content>
  </v-app>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "./utils";

export default {
  components: { Container, Draggable },
  data() {
    return {
      currentItem: null,
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
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

  computed: {
    dropContainer() {
      return this.$element(`.${this.$config.dropContainerClass}`);
    },

    currentProps() {
      return this.dropContainer.getAttribute(this.$config.currentItemAttr)
        ? JSON.parse(
            this.dropContainer.getAttribute(this.$config.currentItemAttr)
          )
        : null;
    }
  },

  methods: {
    onDrop(dropResult) {
      dropResult.payload = this.currentItem;
      this.dropItems = applyDrag(this.dropItems, dropResult);
      this.currentItem = null;
    },

    onMoveDragItem(item) {
      if (!document.body.classList.contains(this.$config.touchDisabledClass)) {
        this.currentItem = item;
      }
    },

    onMouseOut() {},

    onDropRemove(dropResult) {
      console.log("Drag remove:", dropResult);
    },

    setCurrent(item) {
      this.dropContainer.setAttribute(
        this.$config.currentItemAttr,
        JSON.stringify(item)
      );
    },

    resetCurrent() {
      this.dropContainer.removeAttribute(this.$config.currentItemAttr);
    }
  },

  watch: {
    currentItem(items) {
      console.log(items);
    }
  }
};
</script>

<style lang="scss" >
#elements {
  overflow: visible !important;
}

.drag-container {
  .smooth-dnd-ghost {
    transform: translateY(-50px) !important;
  }
}

.drop-container {
  .drop-preview {
    background-color: rgba(150, 150, 200, 0.1);
    border: 1px dashed #abc;
    margin: 5px;
  }

  .dropped-item {
    cursor: pointer;
    border: 1px dashed transparent;
    padding: 20px;
    // transition: all 0.2s ease;

    &:hover {
      border-color: #ccc;
    }
  }

  .ghost {
    padding: 20px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>

