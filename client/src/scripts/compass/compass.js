const JS = (() => {
    const init = () => {
    };

    return {
        init,
    };
})();

if (document.readyState === 'complete') {
    JS.init();
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', JS.init);
}


_$(function () {
    _$('.input-datepicker').datepicker({
        showButtonPanel: true
    });
});