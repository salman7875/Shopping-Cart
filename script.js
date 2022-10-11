'use strict';

const productElement = document.querySelector('.products');
const cartItem = document.querySelector('.cart-items');
const cartSubtotal = document.querySelector('.subtotal');
const cartTotalItem = document.querySelector('.total-items-in-cart');

// Render Product
const renderProduct = function() {
    products.forEach(cur => {
        productElement.innerHTML += `
        <div class="item">
            <div class="item-container">
                <div class="item-img">
                    <img src="${cur.imgSrc}" alt="${cur.name}">
                </div>
                <div class="desc">
                    <h2>${cur.name}</h2>
                    <h2><small>$</small>${cur.price}</h2>
                    <p>${cur.description}</p>
                </div>
                <div class="add-to-wishlist">
                    <img src="./icons/heart.png" alt="add to wish list">
                </div>
                <div class="add-to-cart" onClick="addToCart(${cur.id})">
                    <img src="./icons/bag-plus.png" alt="add to cart">
                </div>
            </div>
        </div>
        `; 
    });
}
renderProduct();

// Cart
let cart = [];

// Adding product to Cart
const addToCart = function(id) {
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits('plus', id)
    } else {
        const item = products.find((cur) => cur.id === id);
        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }
    updateCart();
}

// Updating Cart
const updateCart = function() {
    renderCartItem();
    renderSubTotal();
}

// Render Cart Item
const renderCartItem = function() {
    cartItem.innerHTML = '';
    cart.forEach((cur) => {
        cartItem.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onClick="removeFromCart(${cur.id})">
                <img src="${cur.imgSrc}" alt="${cur.name}">
                <h4>${cur.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${cur.price}
            </div>
            <div class="units">
                <div class="btn minus" onClick="changeNumberOfUnits('minus', ${cur.id})">-</div>
                <div class="number">${cur.numberOfUnits}</div>
                <div class="btn plus" onClick="changeNumberOfUnits('plus', ${cur.id})">+</div>           
            </div>
        </div>
        `;
    });
}

const changeNumberOfUnits = function(action, id) {
    cart = cart.map(item => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === 'minus' && numberOfUnits > 1) {
                --numberOfUnits;
            } else if (action === 'plus' && numberOfUnits < item.instock) {
                ++numberOfUnits;
            }
        }

        return {
            ...item,
            numberOfUnits,
        }
    });
    updateCart();
}

const renderSubTotal = function() {
    let totalItem = 0, totalPrice = 0;
    cart.forEach(item => {
        totalItem += item.numberOfUnits;
        totalPrice += item.price * item.numberOfUnits;
    })
    cartSubtotal.innerHTML = `Subtotal (${totalItem} items): $${totalPrice.toFixed(2)}`;
    cartTotalItem.innerHTML = totalItem;
}

const removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id)

    updateCart();
}