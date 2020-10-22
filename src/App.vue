<template>
  <component v-bind:is="layout"></component>
</template>
<script>
// import AOS from "aos";

// import { mapActions, mapGetters } from "vuex";

export default {
  // meta() {
  //   return {
  //     titleTemplate: `%s ${this.$dictionary.app.title}`,
  //   };
  // },

  computed: {
    // ...mapGetters(["loaded"]),

    layout() {
      const layout = this.$route.meta.layout;
      return `${layout || this.$config.DEFAULT_LAYOUT}-layout`;
    },
  },

  methods: {
    // ...mapActions({
    //   setUser: "auth/setUser",
    //   setUserProfile: "auth/setUserProfile",
    //   getSettings: "settings/getAll",
    // }),
  },

  watch: {
    $route(to) {
      document.body.setAttribute("id", to.name);
    },
  },

  created() {
    // console.log(process.env.NODE_ENV);
    // AOS.init({});
    // document.body.setAttribute("id", this.$route.name);
    // this.getSettings();
    // this.$auth.onAuthStateChanged(async (user) => {
    //   if (!user) {
    //     try {
    //       await this.$auth.signInAnonymously();
    //       this.getSettings();
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   } else if (user && !user.isAnonymous) {
    //     // set user
    //   }
    // });
  },
};
</script>
