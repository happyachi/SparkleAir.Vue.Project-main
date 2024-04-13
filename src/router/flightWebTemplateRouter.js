// 航空網站 樣式
import Booking from "@/views/flightWeb/LayoutTemplate/Booking/index.vue";
import Contact from "@/views/flightWeb/LayoutTemplate/Contact/index.vue";
import EventList from "@/views/flightWeb/LayoutTemplate/EventList/index.vue";
import Detail from "@/views/flightWeb/LayoutTemplate/Detail/index.vue";
import FlightSearch from "@/views/flightWeb/LayoutTemplate/FlightSearch/index.vue";

const flightWebTemplateRouter = [
  {
    path: "/Event",
    name: "Event",
    component: EventList,
  },
  {
    path: "/Contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/FlightSearch",
    name: "FlightSearch",
    component: FlightSearch,
  },
  {
    path: "/Booking",
    name: "Booking",
    component: Booking,
  },
  {
    path: "/Detail",
    name: "Detail",
    component: Detail,
  },
];

export default flightWebTemplateRouter;
