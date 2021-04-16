import "../../node_modules/focus-visible/dist/focus-visible";
import '../sass/style.scss';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../../public/lib/fancybox/jquery.fancybox.min.js';
import '../js/c.js';
import '../../node_modules/swiper/swiper-bundle';
import '../js/swiper';
import '../js/calculator-test';



$(document).ready(function () {
    // Form submit
    $("form").submit(function (event) {
        event.preventDefault();

        if (typeof sessionStorage !== 'undefined') {
            if (sessionStorage.getItem('formSubmitted')) {
                if (!confirm('Вы уже отправили заявку, повторить?')) { return false }
            } else {
                sessionStorage.setItem('formSubmitted', 'true')
            }
        }
        let data = $(this).serializeArray();
        data.push({
            name: "source",
            value: "Sellhozby"
        });
        data.push({
            name: "title",
            value: "Теплица"
        });
        data.push({
            name: "link",
            value: location.href
        });
        
        // console.log(JSON.stringify(data));
        // return false; // Testing

        $.ajax({
            type: "POST",
            url: atob('aHR0cHM6Ly9za2lka2EtdHV0LmJ5L2FjdGlvbi9pbmRleC5waHA='),
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            dataType: "json",
            data: data,
        }).done(function () {
            // alert(response.text);
            $('#modal-order').modal('hide');
            $('#modal-thanks').modal('show');

            
        }).fail(function (error, textStatus) {
            console.log(error, textStatus);
            alert('Извините, произошла ошибка запроса. Свяжитесь с менеджером по телефону!');
        });

        // Event dispatcher for IE9+ included
        if (typeof (Event) === 'function') {
            document.dispatchEvent(new Event('app.form.send'));
        } else {
            let ev = document.createEvent('Event');
            ev.initEvent('app.form.send', false, false);
            document.dispatchEvent(ev);
        }

        console.log(JSON.stringify(data));
        return false
    });
});    
