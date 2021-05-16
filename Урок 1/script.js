/*3. *Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?
    Массив преобразовывался в строку, а так как разделитель элементов массива - это запятая, поэтому она также отображалась
    в коде. Исправлено в коде ниже*/

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = 'Название отсутствует', description = 'Описание отсутствует',price = 0) => {
    return `<div class="goods-item">
            <div class="image"></div>
            <h3>${title}</h3>
            <p>${description}</p>
            <p>${price}</p>
            </div>`;
};

const renderGoodsList = (list = []) => {
    let finalCode = '';
    list.forEach(item => finalCode += renderGoodsItem(item.title, item.description, item.price));
    document.querySelector('.goods-list').innerHTML = finalCode;
};

renderGoodsList(goods);
