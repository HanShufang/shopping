export default {
  get (key) {
    if (!key) {
      key = this.keyDefault;
    }
    return JSON.parse(localStorage.getItem(key) || '{}');
  },
  set (option, key) {
    if (!key) {
      key = this.keyDefault;
    }
    localStorage.setItem(key, JSON.stringify(option));
  },
  keyDefault: 'vic-user'
};
