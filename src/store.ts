import { createStore, applyMiddleware, Middleware } from 'redux';

export const create = mainReducer => {
    const middlewares: Array<Middleware> = [];

    if (process.env.NODE_ENV !== `production`) {
        const { logger } = require(`redux-logger`);
        middlewares.push(logger);
    }

    const store = createStore(mainReducer, applyMiddleware(...middlewares));
    return store;
};
