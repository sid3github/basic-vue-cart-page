const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      premium: false,
    };
  },
  methods: {
    updateAddCart() {
      this.cart += 1;
    },
    updateDelCart() {
      this.cart -= 1;
    },
  },
});
