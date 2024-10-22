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
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const user_1 = __importDefault(require("./routes/user"));
const debug = require('debug')('my express app');
const app = (0, express_1.default)();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Serve static files
app.use(express_1.default.static(path.join(__dirname, '../public')));
// Routes
app.use('/', index_1.default);
app.use('/users', user_1.default);
// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404; // Type assertion to allow the 'status' property
    next(err);
});
// Error handler for development
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// Error handler for production
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
// Start the server
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    debug(`Express server listening on port ${server.address().port}`);
});
