"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
process.on('uncaughtException', (err) => {
    console.log(err.stack);
    console.log('UNCAUGHT EXCEPTION!!');
    process.exit(1);
});
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 5001;
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(process.env.DB, () => {
    console.log('DB connection successful');
});
const server = app_1.default.listen(port, () => {
    console.log(`App started on ${port} port`);
});
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION');
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=server.js.map