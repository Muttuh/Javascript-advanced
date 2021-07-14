// *Некая сеть фастфуда предлагает несколько видов гамбургеров:
//
//     ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий).
// ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).
// ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру
// класса из методички, но можно использовать и свою.

const sizes = [
    {name: 'big', cals: 40, price: 100},
    {name: 'small', cals: 20, price: 50}
];
const types = [
    {name: 'cheese', cals: 20, price: 10},
    {name: 'salad', cals: 5, price: 20},
    {name: 'potato', cals: 10, price: 15},
];
const stuffs = [
    {name: 'spices', cals: 0, price: 15},
    {name: 'mayonnaise', cals: 5, price: 20}
];

const Hamburger = {
    size: null,
    type: null,
    stuffing: [],
    finalCals: 0,
    finalPrice: 0,
    sizes,
    types,
    stuffs,

    //считываем данные из переданной формы
    getSize() {
        this.size = document.querySelector('input[name="size"]:checked').value;
    },
    getType() {
        this.type = document.querySelector("input[name='type']:checked").value;
    },
    getStuffing() {
        let stuffs = document.querySelectorAll("input[name='add']:checked");
        for (let i = 0; i < stuffs.length; i++) {
            this.stuffing.push(stuffs[i].value);
        }
    },

    // конечный метод
    getHamburger() {
        document.querySelector('#button').addEventListener('click', (e) => { //вешаем обработку события
            this.resetData();
            this.getSize();             //считываем данные о размере
            this.getType();             //считываем данные о типе
            this.getStuffing();         //считываем данные о добавках
            this.countCalsAndPrice();   //считаем калории и стоимость конечного бургера
            this.showResult(this.finalPrice, this.finalCals);
            e.preventDefault();
        });
    },
    //функция для рассчета стоимости и калорийности
    calculate(type, types) {
        if (Array.isArray(type) === false) {
            types.forEach(item => {
                if (item.name === type) {
                    this.finalCals += item.cals;
                    this.finalPrice += item.price;
                }
            });
        } else {
            types.forEach(item => {
                for (let i = 0; i < type.length; i++) {
                    if (item.name === type[i]) {
                        this.finalCals += item.cals;
                        this.finalPrice += item.price;
                    }
                }
            })
        }
    },
    //Cчитаем стоимость и калорийность бургера
    countCalsAndPrice() {
        this.calculate(this.size, this.sizes);
        this.calculate(this.type, this.types);
        this.calculate(this.stuffing, this.stuffs);
    },
    //отображаем результат на странице
    showResult(price, calories) {
        document.querySelector('#price').innerHTML = `<b>Стоимость:</b> ${price} рублей`;
        document.querySelector('#calories').innerHTML = `<b>Калорийность:</b> ${calories} кКал`;
    },
    resetData() {
        this.finalCals = 0;
        this.finalPrice = 0;
        this.size = null;
        this.type = null;
        this.stuffing = [];
    }

};
Hamburger.getHamburger();
