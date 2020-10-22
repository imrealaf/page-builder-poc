<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark style="left: 0">
      <v-toolbar-title>{{ $t("appTitle") }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <router-view />
  </v-app>
</template>
<script>
export default {};
</script>
