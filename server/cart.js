let add = (cart, req) => {
  //req.body - массив товаров полученный после запроса
  cart.contents.push(req.body);
  return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
  //ищем в cart.contents по запросу клиента +req.params.id id товара в корзине el.id_product
  let find = cart.contents.find(el => el.id_product === +req.params.id);
  //найденному товару корзины прибавляем данные из тела запроса
  find.quantity += req.body.quantity;
  //возвращаем обратно данные в виде строки
  return JSON.stringify(cart, null, 4);
};
let remove = (cart, req) => {
  let find = cart.contents.find(el => el.id_product === +req.params.id);
  if (find.quantity > 1) {
    find.quantity -= req.body.quantity;
  } else {
    cart.contents.splice(cart.contents.indexOf(find), 1);
  }
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  remove,
};
