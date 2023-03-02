"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const collectionRoutes_1 = __importDefault(require("./routes/collectionRoutes"));
const likeRoutes_1 = __importDefault(require("./routes/likeRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
const featuredRoute_1 = __importDefault(require("./routes/featuredRoute"));
const globalErrorHandler_1 = require("./error/globalErrorHandler");
const error_1 = require("./error");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: `${process.env.CLIENT_URL_DEV}`, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/users', userRoutes_1.default);
app.use('/api/items', itemRoutes_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
app.use('/api/collections', collectionRoutes_1.default);
app.use('/api/likes', likeRoutes_1.default);
app.use('/api/search', searchRoutes_1.default);
app.use('/api/featured', featuredRoute_1.default);
app.all('*', (req, res, next) => {
    next(new error_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map