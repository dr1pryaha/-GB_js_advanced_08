const cart = require("./cart");
const fs = require("fs");

const actions = {
  add: cart.add,
  change: cart.change,
  remove: cart.remove,
};
//HANDLER отвечает за изменение данных в самом файле
let handler = (req, res, action, file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      //actions[action]===cart.change, которая описана в cart.js
      //JSON.parse(data) - исходник корзины, преобразуем в объект
      //req - получение данных от клиента
      let newCart = actions[action](JSON.parse(data), req);
      //записываем в файл данные полученные от запроса newCart, описанные в cart.js
      fs.writeFile(file, newCart, err => {
        if (err) {
          res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
          res.send(JSON.stringify({ result: 1 }));
        }
      });
    }
  });
};

module.exports = handler;
