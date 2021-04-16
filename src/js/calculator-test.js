$(document).ready(function() {

    let btnSend = $('.form-btn');

    $('.calculator').on('input', () => {
        enableDisableButton();
    })
    const enableDisableButton = () => {
        if (CheckOnChecked(document.querySelectorAll('[data-option="length"]')) && 
                CheckOnChecked(document.querySelectorAll('[data-option="width"]')) &&
                CheckOnChecked(document.querySelectorAll('[data-option="step"]')) &&
                    CheckOnChecked2(document.querySelectorAll('[data-option="firstname"]')) && 
                    CheckOnChecked2(document.querySelectorAll('[data-option="tel"]'))) {
            btnSend.removeClass('disabled');
            document.getElementsByClassName('ps')[0].style.display = 'none';

        } else {
            console.log('Pls check all form')
        }
    }

    const CheckOnChecked = array => {
        let result = false;
        array.forEach(element => {
            if (element.checked) {
                result = true;
            }
        });

        return result;
    }

    const CheckOnChecked2 = array => {
        let result = false;
        array.forEach(element => {
            if (element.value.length != 0) {
                result = true;
            }
        });

        return result;
    }
});    
