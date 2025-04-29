import axios from "axios";
import {store} from "../stores/store.ts";
import {toast} from "react-toastify";
import {router} from "../../app/router/Routes.tsx";

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// When request is one its way out
agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
})

agent.interceptors.response.use(
    async (response) => {
        await sleep(0);
        store.uiStore.isIdle();
        return response;
    },
    async error => {
        await sleep(1000);
        store.uiStore.isIdle();

        const {status, data} = error.response;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                toast.error('Unauthorised');
                break;
            case 404:
                await router.navigate("/not-found");
                break;
            case 500:
                await router.navigate("/server-error", {state: {error: data}});
                break;
            default:
                break;
        }

        // rethrow the error for the react query to handle
        return Promise.reject(error);
    }
);

export default agent;