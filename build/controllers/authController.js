"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.restrictTo = exports.protect = exports.signup = exports.login = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jwt = __importStar(require("jsonwebtoken"));
const ms_1 = __importDefault(require("ms"));
const error_1 = require("../error");
const signToken = (id, name, email, role) => {
    return jwt.sign({ id, name, email, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSignToken = (user, statusCode, res) => {
    const token = signToken(user._id.toString(), user.name, user.email, user.role);
    const cookieOptions = {
        expires: new Date(Date.now() + (0, ms_1.default)('7d')),
        httpOnly: true,
    };
    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new error_1.AppError('Please provide both email and password', 400);
        }
        const user = await userModel_1.default.findOne({ email }).select('+password');
        const isCorrectPassword = await (user === null || user === void 0 ? void 0 : user.correctPassword(password, user.password));
        if (!user || !isCorrectPassword) {
            throw new error_1.AppError('Incorrect email or password', 401);
        }
        createSignToken(user, 200, res);
    }
    catch (e) {
        next(e);
    }
};
exports.login = login;
const signup = async (req, res) => {
    try {
        const user = await userModel_1.default.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        createSignToken(user, 201, res);
    }
    catch (e) {
        res.send('User with this email already exists');
    }
};
exports.signup = signup;
const protect = (params = { allowNonAuthorized: false }) => async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            if (params.allowNonAuthorized) {
                return next();
            }
            throw new error_1.AppError('You are not logged in', 401);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await userModel_1.default.findById(decoded.id);
        if (!currentUser) {
            throw new error_1.AppError('The user no longer exists', 404);
        }
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    }
    catch (e) {
        next(e);
    }
};
exports.protect = protect;
const restrictTo = (role) => (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== role) {
        return next(new error_1.AppError('You are not permitted to perform this action', 401));
    }
    next();
};
exports.restrictTo = restrictTo;
const logout = (req, res) => {
    res.cookie('jwt', 'Logged Out', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map