"use strict";
exports.__esModule = true;
exports.sum = void 0;
var sum = function (a, b) {
    if ('development' === process.env.NODE_ENV) {
        console.log('dev only output');
    }
    return a + b;
};
exports.sum = sum;
//# sourceMappingURL=index.js.map