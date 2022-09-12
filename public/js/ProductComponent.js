const product = {
  props: ["product", "img"],
  template: /*html*/ `
            <div class="featuredItem">
              <div class="featuredImgWrap">
                <img :src="img" :alt="product.product_name">
                
                <div class="featuredImgDark">
                  <button class="addToCart" @click="$emit('add-product', product)">
                    <img src="./img/cart.svg" alt="" />
                      Add to Cart
                  </button>
                </div>
              </div>
              <div class="featuredData">
                <div class="featuredName">{{product.product_name}}</div>
                <div class="featuredText">
                  {{product.description}}
                </div>
                <div class="featuredPrice">$ {{product.price.toFixed(2)}}</div>
              </div>
            </div> 
    `,
};
const products = {
  data() {
    return {
      filtered: [],
      products: [],
    };
  },
  components: {
    product,
  },
  mounted() {
    //api/products - виртуальный адрес по которому делается запрос к серверу
    //this.$parent.getJson - метод задан в файле main.js
    this.$parent.getJson(`/api/products`).then(data => {
      for (let item of data) {
        this.$data.products.push(item);
        this.$data.filtered.push(item);
      }
    });
  },
  methods: {
    filter(userSearch) {
      let regexp = new RegExp(userSearch, "i");
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    },
  },
  template: /*html*/ `
            <div class="featured container">
              <h2 class="featuredHeader">Fetured Items</h2>
              <div class="featuredTitle">
                Shop for items based on what we featured in this week
              </div>
              <div class="featuredItems">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :product="item"
                :img="item.imgProduct"
                @add-product="$parent.$refs.cart.addProduct"></product>
              </div>
            </div>`,
};

export default products;

// import Vue from "Vue";
// export default Vue.component("products", {
//   data() {
//     return {
//       filtered: [],
//       products: [],
//     };
//   },
//   components: {
//     product,
//   },
//   mounted() {
//     //api/products - виртуальный адрес по которому делается запрос к серверу
//     //this.$parent.getJson - метод задан в файле main.js
//     this.$parent.getJson(`/api/products`).then(data => {
//       for (let item of data) {
//         this.$data.products.push(item);
//         this.$data.filtered.push(item);
//       }
//     });
//   },
//   methods: {
//     filter(userSearch) {
//       let regexp = new RegExp(userSearch, "i");
//       this.filtered = this.products.filter(el => regexp.test(el.product_name));
//     },
//   },
//   template: /*html*/ `
//             <div class="featured container">
//               <h2 class="featuredHeader">Fetured Items</h2>
//               <div class="featuredTitle">
//                 Shop for items based on what we featured in this week
//               </div>
//               <div class="featuredItems">
//                 <product v-for="item of filtered"
//                 :key="item.id_product"
//                 :product="item"
//                 :img="item.imgProduct"
//                 @add-product="$parent.$refs.cart.addProduct"></product>
//               </div>
//             </div>`,
// });
// Vue.component("product", {
//   props: ["product", "img"],
//   template: /*html*/ `
//             <div class="featuredItem">
//               <div class="featuredImgWrap">
//                 <img :src="img" :alt="product.product_name">

//                 <div class="featuredImgDark">
//                   <button class="addToCart" @click="$emit('add-product', product)">
//                     <img src="./img/cart.svg" alt="" />
//                       Add to Cart
//                   </button>
//                 </div>
//               </div>
//               <div class="featuredData">
//                 <div class="featuredName">{{product.product_name}}</div>
//                 <div class="featuredText">
//                   {{product.description}}
//                 </div>
//                 <div class="featuredPrice">$ {{product.price.toFixed(2)}}</div>
//               </div>
//             </div>
//     `,
// });
