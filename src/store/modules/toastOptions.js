export default {
  state: {
    txt: 'Loading...',
    mask: true
  },
  getters: {
    options({ txt, mask }, getters, rootState) {
      return {
        txt,
        mask
      }
    }
  }
}
