import { writable } from "svelte/store";
import { BASE_URL, getData, postData } from "../utils/http";

export const loading = writable(false);
export const error = writable(null);
export const initialized = writable(false);

let { update, set, subscribe } = writable([]);

const loadCustomers = async () => {
    loading.set(true);
    const resp = await getData(`${BASE_URL}/customers`);
    if (resp.status === 200) {
        set(await resp.json());
        await new Promise(resolve => setTimeout(resolve, 2000));
        loading.set(false);
        error.set(null);
        initialized.set(true);
    } else {
        loading.set(false);
        error.set("Can not load groups at the moment. Please try again later.");
    }
};

const addCustomer = async (customer) => {
    const resp = await postData(`${BASE_URL}/customers`, customer);
    if (resp.status === 200) {
        var cust = await resp.json();
        update((values) => [...values, cust]);
        return true;
    } else {
        return false;
    }
};

export const customers = {
    update,
    set,
    subscribe,
    loadCustomers,
    addCustomer
}