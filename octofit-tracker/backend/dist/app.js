import cors from 'cors';
import express from 'express';
import apiRouter from './routes/index.js';
export function createApp() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api', apiRouter);
    app.use((error, _request, response, _next) => {
        response.status(500).json({
            ok: false,
            message: 'Unexpected server error',
            error: error.message,
        });
    });
    return app;
}
