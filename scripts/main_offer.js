/**
 * Получение массива товаров - акции, статсервис итд - для замены на главной странице товаров свёрстанных по умолчанию
 */

const productsEl = document.querySelectorAll('.product');

const productArr = [];

fetch('scripts/products_data.json')
	.then(response => response.json())
	.then(result => fillProductsData(result));

function fillProductsData(data) {

	data.forEach(element => {
		productArr.push(element);
	});

	for (i = 0; i < productsEl.length; i++) {
		imgEl = productsEl[i].querySelector('.product__img');
		imgEl.src = productArr[i].img;
		priceEl = productsEl[i].querySelector('.product__price');
		priceEl.textContent = `$ ${productArr[i].price}`;

		// так можно обновить каждое поле всех карточек
		// и назначить на кнопку add_cart каждой карточки id продукта

		addCard = productsEl[i].querySelector('.add__cart');
		addCard.setAttribute('id', productArr[i].id);
	}
}

/**
 * Работа с картой
 */

const cart = [];
const cartNotification = document.querySelector('.header__link-notifications');
const cartSection = document.querySelector('.cart__section');
const cartList = cartSection.querySelector('.cart__list');
cartList.classList.add('cart-details');
cartList.classList.add('center');
cartDisplay();

const productBox = document.querySelector('.product-box');
productBox.addEventListener('click', (e) => {
	let elem = e.target;
	if (elem.classList.contains('add__cart')) addToCart(elem.id);
});

const clearCartButton = cartSection.querySelector('.button-active');
clearCartButton.addEventListener('click', () => {
	cart.length = 0;
	cartDisplay();
});

function cartDisplay() {
	if (cart.length > 0) {
		cartNotification.removeAttribute('hidden');
		cartSection.removeAttribute('hidden');
	}
	else {
		cartNotification.setAttribute('hidden', true);
		cartSection.setAttribute('hidden', true);

		const listProducts = cartSection.getElementsByClassName('product__list');
		Array.from(listProducts).forEach((item) => item.remove());
	}
}

function addToCart(id) {
	// todo переделать с проверкой наличия товара
	// todo переделать с проверкой повторного добавления и увелечения количества
	cart.push(id);
	cartNotification.textContent = cart.length;
	const cartItem = document.createElement('div');
	cartItem.classList.add('product__list');
	cartItem.classList.add('cart-item');
	const p = productArr[id];
	cartItem.textContent = `${p.id} ${p.title} ${p.price}`;
	// todo переделать в соответствии с макетом
	cartList.appendChild(cartItem);
	cartDisplay();
}