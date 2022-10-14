const inputList = document.querySelectorAll('input');

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
