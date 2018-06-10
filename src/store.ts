import { createStore, applyMiddleware, Middleware, Reducer } from 'redux';

export const create = (mainReducer: Reducer<{}>) => {
    const middlewares: Array<Middleware> = [];

    if (process.env.NODE_ENV !== `production`) {
        const { logger } = require(`redux-logger`);
        middlewares.push(logger);
    }

    const store = createStore(mainReducer, applyMiddleware(...middlewares));
    return store;
};
