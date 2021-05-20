/*ЗАДАНИЕ 2 НА СТРОКЕ 42
 ЗАДАНИЕ 1 НАЧИНАЕТСЯ СО СТРОКИ 55*/

class GoodsItem {
    constructor(title = 'Название товара отсутствует', description = 'Оисание товара отсутствует', price = 0) {
        this.title = title;
        this.description = description;
        this.price = price;
    }

    render() {
        return `<div class="goods-item">
            <div class="image"></div>
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p>${this.price}</p>
            </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
    this.goods = [
        {title: 'Shirt', price: 150, quantity: 20},
        {title: 'Socks', price: 50, quantity: 15},
        {title: 'Jacket', price: 350, quantity: 10},
        {title: 'Shoes', price: 250, quantity: 7},
    ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.description, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    //В объекты товаров в массиве goods дописал количество товаров для более убедительной работы метода
    catalogTotalPrice() {
        return this.goods.reduce((finalPrice, product) => finalPrice + product.quantity * product.price, 0);
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.catalogTotalPrice());

//КОРЗИНА
/*Так как корзина по идее одна в условном магазине, решил сразу создать объект без описания класса*/
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
        }
        else this.container.innerHTML = 'Корзина пуста';
    },

    //стоимость всей корзины
    cartPrice() {
        return this.products.reduce((finalPrice, cartProduct) => finalPrice + cartProduct.quantity * cartProduct.price, 0);
    },

    //кошличество товаров в корзине
    cartQuantity() {
        return this.products.reduce((finalQuantity, cartProduct) => finalQuantity + cartProduct.quantity, 0);
    },

    //добавление товара в корзину (используетя гипотетический id товара, но можно заменить на название или что-то еще...
    addToCart(product) {
        let findInCart = this.products.find((item) => product.articleNumber === item.articleNumber);
        findInCart ? findInCart.quantity++ : this.products.push({...product,quantity: 1});

        cart.init();
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

/*Элемент корзины товаров*/
class CartItem {
    constructor(item) {
        this.id = item.id;
        this.description = item.description;
        this.imageSource = item.imageSource;
        this.price = item.price;
        this.quantity = 0; //(или 1, смотря как писать код) так как количество должно считаться в методе добавления товара в корзину

    }
}