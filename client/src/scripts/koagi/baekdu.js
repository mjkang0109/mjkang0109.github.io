const JS = (() => {
    const init = () => {
        console.log('init');
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