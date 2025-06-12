import {
    CONSTANTS,
} from '../constants/constants.js';

const {
    SELECTOR: $
} = CONSTANTS;

import {
    UTILS
} from '../constants/utils.js';

const JS = (() => {
    const init = () => {
        console.log($.BODY);
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