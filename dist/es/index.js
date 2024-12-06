Object.defineProperty(exports, "__esModule", { value: true });
exports.sub = exports.add = void 0;
const sub_1 = require("./sub");
Object.defineProperty(exports, "sub", { enumerable: true, get: function () { return sub_1.sub; } });
function add(a, b) {
    return a + b;
}
exports.add = add;
