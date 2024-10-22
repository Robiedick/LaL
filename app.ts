import express, { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import routes from './routes/index';
import users from './routes/user';
import { AddressInfo } from "net";

const debug = require('debug')('my express app');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', routes);
app.use('/users', users);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error('Not Found');
    (err as any)['status'] = 404;  // Type assertion to allow the 'status' property
    next(err);
});

// Error handler for development
if (app.get('env') === 'development') {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Error handler for production
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Start the server
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});
