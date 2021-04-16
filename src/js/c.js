$(document).ready(function() {
    $("form.has-calculator").change(function() {
        var a = this,
            b = $("input[name='product']", a).val(),
            c = $("input[name='length']:checked", a).val(),
            d = $("input[name='shag']:checked", a).val(),
            e = 0;
        e += calculatorData[b][c][d];
        var f = $(".jPrice", a),
            g = $(".jPriceOld", a),
            h = 0 < f.data("animateFrom") ? f.data("animateFrom") : 0;
        $({
            animateNumber: h
        }).animate({
            animateNumber: e
        }, {
            duration: 800,
            step: function step(a) {
                f.text((+a).toFixed()), g.text((+(a * 1.3)).toFixed())
            },
            complete: function complete() {
                f.data("animateFrom", (+e).toFixed())
            }
        })
    }), $("form.has-calculator").change()
});
