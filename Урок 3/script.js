// Задание 1 на строке 26
// Задание 2
    // метод добавления товара в корзину строка 136
    // метод удаления товара из корзины - строка 144
    // получение списка товаров корзины - строка 120

// const makeGETRequest = (url, callback) => {
//   let xhr;
//   //Проверка браузера (у ИЕ другой объект за это отвечает)
//   if (window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest();
//   }
//   else if (window.ActiveXObject) {
//     xhr = new ActiveXObject('Microsoft.XMLHTTP');
//   }
//
//   xhr.onreadystatechange = function() {
//       if (xhr.readyState === 4) {
//           callback(xhr.responseText);
//       }
//   };
//
//   xhr.open('GET', url, true);
//   xhr.send();
// }
function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        let xhr;
        //Проверка браузера (у ИЕ другой объект за это отвечает)
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.description, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    //В объекты товаров в массиве goods дописал количество товаров для более убедительной работы метода
    // catalogTotalPrice() {
    //     return this.goods.reduce((finalPrice, product) => finalPrice + product.quantity * product.price, 0);
    // }
}

class GoodsItem {
    constructor(title = 'Название товара отсутствует', description = 'Оисание товара отсутствует', price = 0) {
        this.product_name = title;
        this.description = description;
        this.price = price;
    }

    render() {
        return `<div class="goods-item">
            <div class="image"></div>
            <h3>${this.product_name}</h3>
            <p>${this.description}</p>
            <p>${this.price}</p>
            </div>`;
    }
}

const list = new GoodsList();
list.fetchGoods(() => list.render());

/*
//КОРЗИНА
/!*Так как корзина по идее одна в условном магазине, решил сразу создать объект без описания класса*!/
const cart = {
    container: null,
    clearCartButton: null,
    buyButton: null,
    products: [],

    //инициализируем элементы корзины
    init() {
        this.container = document.querySelector(".cart");
        this.clearCartButton = document.querySelector(".cart-button");
        this.clearCartButton.addEventListener('click', () => this.clearCart());

        this.generateCart();
    },

    //метод очистки корзины
    clearCart() {
        this.products = [];
        this.generateCart();
    },

    //инициализируем корзину
    generateCart() {
        this.container.innerHTML = '';
        if (this.products.length) {
            this.products.forEach(product => this.container.insertAdjacentHTML('beforeend', this.create(product)));
            this.container.insertAdjacentHTML('beforeend', `В корзине ${this.cartQuantity()} товаров(a) на сумму: ${this.cartPrice()}`);
        } else this.container.innerHTML = 'Корзина пуста';
    },

    //стоимость всей корзины
    cartPrice() {
        return this.products.reduce((finalPrice, cartProduct) => finalPrice + cartProduct.quantity * cartProduct.price, 0);
    },

    //количество товаров в корзине
    cartQuantity() {
        return this.products.reduce((finalQuantity, cartProduct) => finalQuantity + cartProduct.quantity, 0);
    },

    //добавление товара в корзину (используетя гипотетический id товара, но можно заменить на название или что-то еще...
    addToCart(product) {
        let findInCart = this.products.find((item) => product.articleNumber === item.articleNumber);
        findInCart ? findInCart.quantity++ : this.products.push({...product, quantity: 1});
        cart.init();
    },

    //удаление товара из корзины
    deleteFromCart(product) {
        for (let i = 0; i < this.products.length; i++) {
            if (product.articleNumber === this.products[i].articleNumber) {
                this.products.splice(i, 1);
                cart.init();
            }
        }
    },

    //отрисовка продуктов корзины
    create(product) {
        return `<div class = "product">
            <div><b>Наименование:</b> ${product.productName}</div>
            <div><b>Цена:</b> ${product.price}</div>
            <div><b>Количество:</b> ${product.quantity}</div>
            <div><b>Итого:</b> ${product.quantity * product.price}</div>
        </div>`;
    },
};

// Элемент корзины товаров
class CartItem {
    constructor(item) {
        this.id = item.id;
        this.description = item.description;
        this.imageSource = item.imageSource;
        this.price = item.price;
        this.quantity = 0; //(или 1, смотря как писать код) так как количество должно считаться в методе добавления товара в корзину
    }
}
*/
