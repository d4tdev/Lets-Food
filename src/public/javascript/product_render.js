const menuItems = document.querySelector('.menu__items');

const url = 'http://localhost:3000/product/get';

let login = false;

// format price to VND
const formatPrice = price => {
   const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
   });
   return formatter.format(price);
};

const checkLogin = () => {
   fetch('http://localhost:3000/check_login')
      .then(res => res.json())
      .then(data => {
         if (data) {
            return (login = true);
         } else {
            return (login = false);
         }
      });
};

checkLogin();

fetch(url).then(async res => {
   const data = await res.json();

   data.forEach(item => {
      menuItems.innerHTML += `
         <a href="/product/get_one_product/${item._id}">
            <div class="menu__item">
                        <img src="${item.image}" alt="${item.name}" class="img__menu" />
                        <div class="content__menu_item_text">
                            <h3 class="menu__title__item">${item.name}</h3>
                            <h4 class="menu__description__item">${item.description}</h4>
                        </div>
                        <div class="price__item">
                            <p>${formatPrice(item.price)}</p>
                            ${
                               login
                                  ? `<a href="/cart/create/${item._id}" class="menu__item-icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </a>
                                `
                                  : `<a href="/auth/getLoginLocal" class="menu__item-icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </a>
                                `
                            }
                        </div>
                    </div>
         </a>
            `;
   });
});
