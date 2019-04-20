export default {
  state: { name: '哈尔滨' },
  mutations: {
    setCity(state, city) {
      state.name = city
    }
  }
}
