const buttonMinus = document.querySelectorAll('.btn__minus');
const buttonPlus = document.querySelectorAll('.btn__plus');
const inputNumber = document.querySelectorAll('.input__number');

inputNumber.forEach((input, index) => {
    buttonMinus[index].addEventListener('click', () => {
        var count = parseInt(input.value - 1);
        count = count < 1 ? 1 : count;

        input.value = count;
        input.dispatchEvent(new Event('change'));

        console.log(input.value);

        return false;
    });

    buttonPlus[index].addEventListener('click', () => {
        var count = parseInt(input.value) + 1;
        input.value = count;

        input.dispatchEvent(new Event('change'));

        console.log(input.value);

        return false;
    });
});

// Xóa sản phẩm

const buttonDelete = document.querySelectorAll('.btn__delete');

// chọn sản phẩm cần xóa và cập nhật lại vị trí của các sản phẩm còn lại

buttonDelete.forEach((button, index) => {
    button.addEventListener('click', () => {
        var product = button.closest('.cart__item');
        product.remove();

        console.log(index);
    });
});

// Cập nhật lại giá trị số tiền khi thay đổi số lượng

const moneyProduct = document.querySelectorAll('.cart__item__price__title');
const totalMoneyProduct = document.querySelectorAll('.cart__item__total__title');

inputNumber.forEach((input, index) => {
    input.addEventListener('change', () => {
        totalMoneyProduct[index].innerHTML = input.value * moneyProduct[index].innerHTML;
    });
});

// Tính tổng tiền

const totalMoney = document.querySelector('.total__price__origin');

const shipPrice = document.querySelector('.ship__price');

const totalPrice = document.querySelector('.total__price');

inputNumber.forEach((input, index) => {
    input.addEventListener('change', () => {
        var sum = 0;

        totalMoneyProduct[index].innerHTML = input.value * moneyProduct[index].innerHTML;

        totalMoneyProduct.forEach(total => {
            sum += parseInt(total.innerHTML);
        });

        totalMoney.innerHTML = sum;
        totalPrice.innerHTML = sum + parseInt(shipPrice.innerHTML);
    });
});
