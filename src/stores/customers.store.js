import { writable } from "svelte/store";
import { BASE_URL, getData } from "../utils/http";

export const loading = writable(false);
export const error = writable(null);

let { update, set, subscribe } = writable([]);

const loadCustomers = async () => {
    loading.set(true);
    const resp = await getData(`${BASE_URL}/customers`);
    if (resp.status === 200) {
        set(await resp.json());
        await new Promise(resolve => setTimeout(resolve, 2000));
        loading.set(false);
        error.set(null);
    } else {
        loading.set(false);
        error.set("Can not load groups at the moment. Please try again later.");
    }
};

export const customersService = {
    update,
    set,
    subscribe,
    loadCustomers
}