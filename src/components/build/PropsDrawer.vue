<template>
  <div>
    <v-toolbar flat dark>
      <v-toolbar-title>{{
        $t("build.propsDrawer.title", { element: data.title })
      }}</v-toolbar-title>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  props: ["data"],
  computed: {},
  methods: {},
};
</script>
<style lang="scss">
#props {
  top: 64px !important;
}
</style>
