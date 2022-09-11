// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component("cart", {
  data() {
    return {
      cartItems: [],
      showCart: false,
    };
  },
  mounted() {
    //api/cart - виртуальный адрес по которому делается запрос к серверу
    //this.$parent.getJson - метод задан в файле main.js
    this.$root.getJson(`/api/cart`).then(data => {
      for (let item of data.contents) {
        this.$data.cartItems.push(item);
      }
    });
  },
  methods: {
    addProduct(item) {
      let find = this.cartItems.find(el => el.id_product === item.id_product);
      if (find) {
        //проверяем id товара и запускаем не getJSON а putJSON (находится в main.js) для внесения изменений в корзину
        this.$root
          .putJson(`/api/cart/${find.id_product}`, { quantity: 1 }) //${find.id_product} - параметр GET-запроса, { quantity: 1 } - тело запроса
          .then(data => {
            if (data.result === 1) {
              find.quantity++;
            }
          });
      } else {
        const prod = Object.assign({ quantity: 1 }, item);
        // this.$set(item,'quantity',1);
        this.$root.postJson(`/api/cart`, prod).then(data => {
          if (data.result === 1) {
            this.cartItems.push(prod);
          }
        });
      }
    },

    remove(product) {
      if (product.quantity > 1) {
        this.$root
          .putJson(`/api/cart/${product.id_product}/`, {
            quantity: -1,
          })
          .then(data => {
            if (data.result) {
              product.quantity--;
            }
          });
      } else {
        this.$root
          .delJson(`/api/cart/${product.id_product}/`, product)
          .then(data => {
            if (data.result) {
              this.cartItems.splice(this.cartItems.indexOf(product), 1);
            } else {
              console.log("error");
            }
          });
      }
    },
  },
  template: /*html*/ `
  <div class="rightHeader">
  <img src="img/bars.png" alt="" />
      <img class="userIcon" src="img/user.png" alt="" />
    <span class="cartIconWrap" type="button" @click="showCart = !showCart">
    <img class="cartIcon" src="img/cart.png" alt="" />
        <span>0</span></span>
        <div class="cart-block" v-show="showCart">
            <p v-if="!cartItems.length">В корзине нет товаров</p>
            <cart-item 
            v-for="item of cartItems" 
            :key="item.id_product" 
            :img="item.imgProduct" 
            :cart-item="item" 
            @remove="remove">
            </cart-item>
        </div>
  </div>
    `,
});

Vue.component("cart-item", {
  props: ["img", "cartItem"],
  template: /*html*/ `
    <div class="cart-item">
                    <div class="product-bio">
                        <img class="cart-img" :src="img" alt="cartItem.product_name">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price.toFixed(2) }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{(cartItem.quantity*cartItem.price).toFixed(2)}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `,
});
