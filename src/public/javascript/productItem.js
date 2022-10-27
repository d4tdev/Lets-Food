const productImage = document.querySelector('.product__img');
const productNameTitle = document.querySelector('.product-name');
const productName = document.querySelector('.product__name');
const productDesc = document.querySelector('.product__desc');
const productPrice = document.querySelector('.product__price--old');
const sliderProduct = document.querySelector('.slider__product__list');
const productDescIngredient = document.querySelector('.product__desc-ingredient');
const productDescProcess = document.querySelector('.product__desc-process');

const formatPrice = price => {
   const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
   });
   return formatter.format(price);
};


fetch('https://letsfood.click/product/get')
   .then(response => response.json())
   .then(data => {
      console.log(data);
      // lấy sản phẩm đầu tiên
      let product = data[0];

      productNameTitle.innerHTML = product.name;

      productImage.src = product.image;
      productImage.alt = product.name;
      productName.textContent = product.name;
      productDesc.textContent = product.description;
      productPrice.textContent = formatPrice(product.price);
      productDescIngredient.textContent = product.ingredient;
      productDescProcess.textContent = product.process;

      // hiện thị tên sản phẩm thành title của trang
      document.title = product.name;

      // hiện thị sản phẩm còn lại
      data.forEach(item => {
         sliderProduct.innerHTML += `
            <a class="slider__product__item">
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
