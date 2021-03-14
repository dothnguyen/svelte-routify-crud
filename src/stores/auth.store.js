import { derived, writable } from "svelte/store";
import { BASE_URL, postData } from "../utils/http";

let authState = {
    authenticated: false,
    user: null,
};

const { subscribe, set, update } = writable(authState);
export const loading = writable(false);
export const error = writable(null);

const init = () => {
    console.log("init auth");
    let _user = localStorage.getItem("user");

    update((state) => {
        return {
            ...state,
            authenticated: !!_user,
            user: _user ? JSON.parse(_user) : null,
        };
    });
};

const login = async (email, password) => {
    loading.set(true);

    try {
        const resp = await postData(`${BASE_URL}/login`, {
            email: email,
            password: password,
        });

        if (resp.status == 200) {
            let user = {
                username: email,
                firstName: "Test",
                lastName: "Info",
                id: "abcd1234",
                token: await resp.json(),
            };

            localStorage.setItem("user", JSON.stringify(user));

            set({ authenticated: true, user: user });

            loading.set(false);
            error.set(null);
        } else if (resp.status != 200) {
            error.set("Invalid username or password");
            loading.set(false);
        }
    } catch (e) {
        error.set(e.message);
        loading.set(false);
    }
};

const logout = () => {
    localStorage.removeItem("user");
    update((_) => {
        return { authenticated: false, user: null };
    });
};

export const authStore = {
    subscribe,
    init,
    login,
    logout,
};
