export default {
  _state: {},
  get(key) {
    return this._state.key;
  },
  set(key, value) {
    this._state = {
      ...this._state,
      [key]: value,
    }
  },
};
