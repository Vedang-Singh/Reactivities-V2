import axios from "axios";
import {store} from "../stores/store.ts";

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// When request is one its way out
agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
})

agent.interceptors.response.use(async (response) => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    } finally {
        // When response is received
        store.uiStore.isIdle();
    }
});

export default agent;