const express = require("express");
const fs = require("fs");
const router = express.Router(); //активируем Роутер - обрабатывает любые запросы
const handler = require("./handler");
// при получении запроса к корзине сервер обрабатывает его
//"/" === /api/cart
router.get("/", (req, res) => {
  // считываем локальный файл server/db/userCart.json с объектами корзины
  fs.readFile("server/db/userCart.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      //data- исходник корзины
      res.send(data);
    }
  });
});
//обновление данных корзины (вставка нового товара)
router.post("/", (req, res) => {
  handler(req, res, "add", "server/db/userCart.json");
});
// обновление данных корзины (добавление)
router.put("/:id", (req, res) => {
  ///:id === ${find.id_product} из cartComponents
  //handler - описана в handler.js
  // принимаем в параметр req - запрос на сервер, res - ответ сервера, "change" - что хотим сделать, server/db/userCart.json - файл который изменяем
  handler(req, res, "change", "server/db/userCart.json");
});
//удаление данных корзины
router.delete("/:id", (req, res) => {
  handler(req, res, "remove", "server/db/userCart.json");
});

module.exports = router;
