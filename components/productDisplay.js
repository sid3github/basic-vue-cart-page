app.component("product-display", {
  template:
    /*html*/
    `
      <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img v-bind:src="image" :class="{'out-of-stock-img': !onSale}" />
          </div>
          <div class="product-info">
            <h1>{{title}}</h1>
            <p>Shipping: {{shipping}}</p>
            <p v-if="onSale">On Sale</p>
            <p v-else="onSale">Coming Soon</p>
            <p>{{inventory}}</p>
            
            <product-details :details="details"></product-details>

            <div
              v-for="(variant,index) in variants"
              :key="variant.id"
              class="color-circle"
              @mouseover="updateVariant(index)"
              :style="{backgroundColor: variant.color}"
            ></div>

            <h3>Sock Sizes:</h3>
            <ul>
              <li v-for="size in sizes" v-bind:key="size.id">
                {{size.measurement}}
              </li>
            </ul>
            <div class="button-container">
              <button
                class="button"
                :class="{disabledButton: !onSale}"
                :disabled="!onSale"
                @click="addToCart"
              >
                Add to Cart
              </button>
              <button
                class="button"
                :class="{disabledButton: cart == 0 }"
                @click="delFromCart"
              >
                Del from Cart
              </button>
            </div>
          </div>
        </div>

        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>

      </div>
    `,
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
    cart: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      //details: "This is vue js best cotton sock.",
      details: ["50% cotton", "30% wool", "20% polyester"],
      sizes: [
        { id: 01, measurement: "Small" },
        { id: 02, measurement: "Medium" },
        { id: 03, measurement: "Large" },
      ],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
          saleMsg: "Vue Mastery is on sale!",
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
          saleMsg: "Vue Mastery is coming soon!",
        },
      ],
      selectedVariant: 0,
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart");
    },
    delFromCart() {
      if (this.cart > 0) {
        this.$emit("del-from-cart");
      }
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    onSale() {
      return this.variants[this.selectedVariant].quantity;
    },
    inventory() {
      return this.variants[this.selectedVariant].saleMsg;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return "2.99";
    },
  },
});
