import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PropertiesView from "@/views/PropertiesView.vue";
import AdvertisementsView from "@/views/AdvertisementsView.vue";
import AppointmentsView from "@/views/AppointmentsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/properties",
      name: "properties",
      component: PropertiesView,
    },
    // {
    //   path: "/advertisements",
    //   name: "Advertisements",
    //   component: AdvertisementsView,
    // },

    {
      path: "/properties/:propertyId/advertisements",
      name: "PropertyAdvertisements",
      component: AdvertisementsView,
      props: true, // Allows passing route params as props
    },
    {
      path: "/appointments",
      name: "Appointments",
      component: AppointmentsView,
    },
  ],
});

export default router;
