const inputOldPass = document.querySelector('.input-oldPass');
const inputNewPass = document.querySelector('.input-newPass');
const inputNewPass2 = document.querySelector('.input-newPass2');

const btnChangePass = document.querySelector('.btn');

// alert
const alertError = document.querySelector('.alert-error');
const alertErrorDesc = document.querySelector('.alert-error__desc');

// lấy giá trị của input
const oldPass = inputOldPass.value;

btnChangePass.addEventListener('click', () => {
   if (inputNewPass.value != inputNewPass2.value) {
      alertError.classList.add('active');
      alertErrorDesc.innerHTML = 'Mật khẩu mới không khớp';
   }
});

inputNewPass.addEventListener('change', () => {
   if (inputOldPass.value == inputNewPass.value) {
      alertError.classList.add('active');
      alertErrorDesc.innerHTML = 'Mật khẩu mới không được trùng mật khẩu cũ';
   }
})
