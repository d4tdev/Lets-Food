const addCartBtn = document.querySelector('.btn__add-cart');
const sliderProduct = document.querySelector('.slider__product__list');

let login = false;

const formatPrice = price => {
   const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
   });
   return formatter.format(price);
};

// const checkLogin = () => {
//    fetch('http://localhost:3000/check_login')
//       .then(res => res.json())
//       .then(data => {
//          if (data) {
//             return (login = true);
//          } else {
//             return (login = false);
//          }
//       });
// };

// checkLogin();

// addCartBtn.addEventListener('click', () => {
//    if (!login) {
//       addCartBtn.href = '/auth/getLoginLocal';
//    } else {
//       addCartBtn.href = `/cart/create/${addCartBtn.dataset.id}`;
//    }
// });

fetch('http://localhost:3000/product/get')
   .then(response => response.json())
   .then(data => {
      // hiện thị sản phẩm còn lại
      data.forEach(item => {
         sliderProduct.innerHTML += `
            <a class="slider__product__item" href="/product/get_one_product/${item._id}">
                  <img src="${item.image}" alt="${item.name}" class="slider__product__item-img">
                  <div class="slider__product__item-content">
                     <h4 class="slider__product__item-name">
                        ${item.name}
                     </h4>
                     <p class="slider__product__item-price">
                        ${formatPrice(item.price)}
                     </p>
                  </div>
            </a>
         `;
      });
   });
