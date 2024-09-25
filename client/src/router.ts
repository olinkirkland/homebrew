import { createRouter, createWebHistory, RouterOptions } from "vue-router";

const routerOptions: RouterOptions = {
    history: createWebHistory(),
    routes: []
}
export const router = createRouter(routerOptions);