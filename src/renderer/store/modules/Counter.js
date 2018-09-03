const state = {
  selectedTissue: 0,
  machines: []
}

const mutations = {
  setSelectedTissue (treeid) {
    state.selectedTissue = treeid
  },
  setMachines (machines) {
    state.machines = machines
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
