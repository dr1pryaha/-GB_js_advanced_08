import cart from "./CartComponent";
import filter from "./FilterComp";

const header = {
  props: ["cartItems"],
  components: {
    cart,
    "filter-el": filter,
  },
  template: /*html*/ `
  <div class="header">
  <div class="container">
    <div class="header-menu">
    <div class="header-menu-logo">
      <img class="header-menu-logo-svg" src="img/logo.png" alt="" />
      <filter-el ref="filter-el"></filter-el>
    </div>
    </div>
      <cart ref="cart"></cart>
  </div>
</div>
  `,
};
export default header;

// import Vue from "Vue";
// export default Vue.component("header-el", {
//   template: /*html*/ `
//   <div class="header">
//   <div class="container">
//     <div class="header-menu">
//     <div class="header-menu-logo">
//       <img class="header-menu-logo-svg" src="img/logo.png" alt="" />
//       <filter-el ref="filter-el"></filter-el>
//     </div>
//     </div>
//       <cart ref="cart"></cart>
//   </div>
// </div>
//   `,
// });
