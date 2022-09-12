const express = require("express"); //импорт модуля
const fs = require("fs"); //импорт модуля
const app = express(); // объект для обработки запросов на сервер
const cart = require("./cartRouter"); //обработчик всех запросов корзины (расположен локально созадем его в папке server)

app.use(express.json()); // активируем работу JSON
app.use("/", express.static("dist/public")); //express.static('public') - запускает папку public, в которой лежит файл index.html
app.use("/api/cart", cart); // при запросе к /api/cart (GET, PUT, POST etc) перенаправляем в обработчик cart= require("./cartRouter")

//ожидание запроса к /api/products
app.get("/api/products", (req, res) => {
  //читаем файл по пути server/db/products.json
  fs.readFile("dist/server/db/products.json", "utf-8", (err, data) => {
    // data - исходник, который читаем по адресу server/db/products.json
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data); // возвращаем клиенту исходник если не было ошибки
    }
  });
});

// app.get('/api/cart/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));
