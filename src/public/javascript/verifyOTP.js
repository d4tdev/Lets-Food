const inputList = document.querySelectorAll('.input_otp');
let inputHidden = document.querySelector('.input_otp_hidden');

inputList[0].focus();

inputList.forEach((input, index) => {
   input.addEventListener('keydown', e => {
      if (e.key >= 0 && e.key <= 9) {
         input.value = '';
         setTimeout(() => inputList[index + 1].focus(), 10);
      } else if (e.key === 'Backspace') {
         setTimeout(() => inputList[index - 1].focus(), 10);
      }
   });
});

let arrInput = [];
inputList.forEach((input, index) => {
   input.addEventListener('keydown', e => {
      if (e.key === 'Backspace') {
         arrInput.pop(index - 1);
      }
   });
   input.addEventListener('input', e => {
      if (e.key === 'Backspace') {
         arrInput.pop(index - 1);
      }
   });
});

arrInput = arrInput.join('');
inputHidden.value=arrInput;
console.log(inputHidden.attributes[2].value);

