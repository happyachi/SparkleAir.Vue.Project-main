import { createRouter, createWebHistory } from "vue-router";
// import 網站Router
import flightWebRouter from "@/router/flightWebRouter.js";
import tfWebRouter from "@/router/ftWebRouter.js";

const totalRouter = flightWebRouter.concat(tfWebRouter);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: totalRouter,
});

export default router;
