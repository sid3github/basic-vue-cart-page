app.component("product-details", {
  template:
    /*html*/
    `
    <p>Product Details:</p> 
    <ul>
        <li v-for="detail in details">{{detail}}</li>
    </ul>  
    `,
  props: {
    details: {
      type: String,
      required: true,
    },
  },
});
