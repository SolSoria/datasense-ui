import { store } from '../index'

/**
 * Returns the access token
 */
export const getAccessToken = () => {
    const state = store.getState();
    return state.auth.token;
}