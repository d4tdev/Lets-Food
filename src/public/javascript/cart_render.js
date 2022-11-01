const cartLength = document.querySelector('.navbar__cart__number')

const userId = document.querySelector('.user_id');

fetch(`/cart/show/${userId.attributes[0].value}`)
.then(data => {
   console.log(data.json());
})
.catch(err => {
   console.log(err);
});
