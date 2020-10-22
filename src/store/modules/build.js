const state = () => ({
  items: [],
  currentItem: null,
});

const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload;
  },
  SET_CURRENT_ITEM(state, payload) {
    state.currentItem = payload;
  },
};

const actions = {
  setItems({ commit }, payload) {
    commit("SET_ITEMS", payload);
  },
  setCurrentItem({ commit }, payload) {
    commit("SET_CURRENT_ITEM", payload);
  },
};

const getters = {
  items: (state) => state.items,
  currentItem: (state) => state.currentItem,
};

// Export module
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
