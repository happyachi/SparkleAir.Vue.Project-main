// 航空網站

import Layout from "@/views/flightWeb/Layout/index.vue";
import Home from "@/views/flightWeb/Home/index.vue";
import Login from "@/views/flightWeb/Members/Login.vue";
import SignUp from "@/views/flightWeb/Members/SignUp.vue";
import NotFound from "@/views/flightWeb/Layout/404NotFound.vue";
import Marketing from "@/views/flightWeb/Campaigns/Marketing.vue";
import Coupon from "@/components/flightWebComponents/Campaigns/Coupon.vue";
import MyCoupon from "@/views/flightWeb/Campaigns/MyCoupon.vue";
import CouponAd from "@/components/flightWebComponents/Campaigns/CouponAd.vue";
import CouponInCart from "@/components/flightWebComponents/Campaigns/CouponInCart.vue";
import CouponCart from "@/components/flightWebComponents/Campaigns/CouponCart.vue";
import DiscountCart from "@/components/flightWebComponents/Campaigns/DiscountCart.vue";
import MarketingDetails from "@/views/flightWeb/Campaigns/MarketingDetails.vue";
import gloablTravel from "@/views/flightWeb/Airport/gloablTravel.vue";
import totalTravel from "@/views/flightWeb/Airport/totalTravel.vue";
import AirportDetail from "@/views/flightWeb/Airport/AirportDetail.vue";
import mileageindex from "@/views/flightWeb/Mileage/MileageIndex.vue";
import mileageapply from "@/views/flightWeb/Mileage/MileageApplyIndex.vue";
import mileageorder from "@/views/flightWeb/Mileage/MileageOrder.vue";
import LuggageIndex from "@/views/flightWeb/Luggage/LuggageIndex.vue";
import CabinRules from "@/views/flightWeb/Airtypes&Rules/CabinRules.vue";
import AirTypeIndex from "@/views/flightWeb/Airtypes&Rules/AirTypeIndex.vue";
import AirType78710 from "@/views/flightWeb/Airtypes&Rules/AirType/787-10.vue";
import AirType777300ER from "@/views/flightWeb/Airtypes&Rules/AirType/777-300ER.vue";
import AirTypeA321neo from "@/views/flightWeb/Airtypes&Rules/AirType/A321neo.vue";
import AirTypeA350900 from "@/views/flightWeb/Airtypes&Rules/AirType/A350-900.vue";
import LoginInOrder from "@/components/flightWebComponents/LoginInOrder.vue";
import FlightResultView from "@/views/flightWeb/AirFlights/FlightResultView.vue";
import RoundView from "@/views/flightWeb/AirFlights/RoundView.vue";
import returnMilePay from "@/views/Pay/returnMilePay.vue";
import returnLuggagePay from "@/views/Pay/returnLuggagePay.vue";
import returnTaxfreePay from "@/views/Pay/returnTaxfreePay.vue";
import returnTicketPay from "@/views/Pay/returnTicketPay.vue";
import ChooseServiceView from "@/views/flightWeb/AirFlights/ChooseServiceView.vue";
import PassengerInfoView from "@/views/flightWeb/AirFlights/PassengerInfoView.vue";
import BeautifulChatEmployee from "@/views/flightWeb/MessageAndChats/BeautifulChat.vue";
import RegisterSuccess from "@/views/flightWeb/Members/RegisterSuccess.vue";
import ActiveRegister from "@/views/flightWeb/Members/ActiveRegister.vue";
import MemberCenter from "@/views/flightWeb/Members/MemberCenter.vue";
import MemberInfo from "@/views/flightWeb/Members/MemberInfo.vue";
import BookingManagement from "@/views/flightWeb/Bookings/BookingManagement.vue";
import BookingAndOrderManagement from "@/views/flightWeb/Bookings/BookingAndOrderManagement.vue";
import BookingFinish from "@/views/flightWeb/Bookings/BookingFinish.vue";
import BookingReady from "@/views/flightWeb/Bookings/BookingReady.vue";
import BindThirdLogin from "@/views/flightWeb/Members/BindThirdLogin.vue";

// import 樣板
import flightWebTemplateRouter from "@/router/flightWebTemplateRouter.js";
import FlightSearchView from "@/views/flightWeb/AirFlights/FlightSearchView.vue";
import SearchingResultView from "@/views/flightWeb/AirFlights/SearchingResultView.vue";
import airtype_dropdownlistVue from "@/components/flightWebComponents/Planes/airtype_dropdownlist.vue";
import PayRadioButton from "@/components/flightWebComponents/Payment/Payradio.vue";
import TicketEmail from "@/views/flightWeb/AirFlights/components/TicketEmail.vue";
import Pay from "@/views/Pay/milePurchaseTest.vue";

// 這是阿奇測試用
// import ttt from "@/views/flightWeb/Members/ttt.vue";
import ttt from "@/components/tfWebComponents/loginComponents.vue";
// import TicketMemberInput from "@/components/flightWebComponents/TicketMemberInput/TicketMemberInput.vue";

// flightWeb 二級路由寫在這!!!!
const secondRouter = [
  {
    path: "",
    name: "Index",
    component: Home,
  },
  {
    path: ":pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "ttt",
    name: "ttt",
    component: ttt,
  },
  {
    path: "FlightSearchTest",
    name: "FlightSearchTest",
    component: FlightSearchView,
  },
  {
    path: "SearchingResult",
    name: "SearchingResult",
    component: SearchingResultView,
  },
  {
    path: "FlightResult",
    name: "FlightResult",
    component: FlightResultView,
  },
  {
    path: "RoundResult",
    name: "RoundResult",
    component: RoundView,
  },
  {
    path: "Email",
    name: "Email",
    component: TicketEmail,
  },
  {
    path: "globalTravel",
    name: "globalTravel",
    component: gloablTravel,
  },
  {
    path: "airports/detail/:id",
    component: AirportDetail,
  },
  {
    path: "totalTravel",
    name: "totalTravel",
    component: totalTravel,
  },
  // {
  //   path: "mileageindex",
  //   name: "mileageindex",
  //   component: mileageindex,
  // },
  // {
  //   path: "mileageapply",
  //   name: "mileageapply",
  //   component: mileageapply,
  // },
  {
    path: "mileageorder",
    name: "mileageorder",
    component: mileageorder,
  },
  {
    path: "MileOrderPayoutSuccess/:id",
    name: "MileOrderPayoutSuccess",
    component: returnMilePay,
  },
  {
    path: "LuggageOrderPayoutSuccess/:id",
    name: "LuggageOrderPayoutSuccess",
    component: returnLuggagePay,
  },
  {
    path: "TaxfreeOrderPayoutSuccess/:id",
    name: "TaxfreeOrderPayoutSuccess",
    component: returnTaxfreePay,
  },
  {
    path: "TicketOrderPayoutSuccess/:id",
    name: "TicketOrderPayoutSuccess",
    component: returnTicketPay,
  },
  {
    path: "LuggageIndex",
    name: "LuggageIndex",
    component: LuggageIndex,
  },
  {
    path: "marketing",
    name: "Marketing",
    component: Marketing,
    children: [],
  },
  {
    path: "marketing/detail",
    name: "MarketingDetails",
    component: MarketingDetails,
  },
  {
    path: "marketing/detail/:id",
    component: MarketingDetails,
  },
  {
    path: "CabinRules",
    name: "CabinRules",
    component: CabinRules,
  },
  {
    path: "AirTypeIndex",
    name: "AirTypeIndex",
    component: AirTypeIndex,
  },
  {
    path: "AirTypeIndex/787-10", // 子路徑
    name: "787-10", // 子路徑名稱
    component: AirType78710,
  },
  {
    path: "AirTypeIndex/777-300ER", // 子路徑
    name: "777-300ER", // 子路徑名稱
    component: AirType777300ER,
  },
  {
    path: "AirTypeIndex/A321neo", // 子路徑
    name: "A321neo", // 子路徑名稱
    component: AirTypeA321neo,
  },
  {
    path: "AirTypeIndex/A350-900", // 子路徑
    name: "A350-900", // 子路徑名稱
    component: AirTypeA350900,
  },
  {
    path: "/Pay/milePurchaseTest",
    name: "pay",
    component: Pay,
  },
  {
    path: "/Pay/milePurchaseTest/:id",
    name: "payDetail",
    component: Pay,
  },
  {
    path: "LoginInOrder",
    name: "LoginInOrder",
    component: LoginInOrder,
  },
  {
    path: "ChooseService",
    name: "ChooseService",
    component: ChooseServiceView,
  },
  {
    path: "PassengerInfo",
    name: "PassengerInfo",
    component: PassengerInfoView,
  },
  {
    path: "RegisterSuccess",
    name: "RegisterSuccess",
    component: RegisterSuccess,
  },
  {
    path: "ActiveRegister/:param?",
    name: "ActiveRegister",
    component: ActiveRegister,
  },
  {
    path: "BookingManagement/:ticketAndName?",
    name: "BookingManagement",
    component: BookingManagement,
  },
  {
    path: "sign-up",
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "MemberCenter",
    name: "MemberCenter",
    component: MemberCenter,
    children: [
      {
        path: "MyCoupon",
        name: "MyCoupon",
        component: MyCoupon,
      },
      {
        path: "MemberInfo",
        name: "MemberInfo",
        component: MemberInfo,
      },
      {
        path: "BookingAndOrderManagement",
        name: "BookingAndOrderManagement",
        component: BookingAndOrderManagement,
        children: [
          {
            path: "BookingReady",
            name: "BookingReady",
            component: BookingReady,
          },
          {
            path: "BookingFinish",
            name: "BookingFinish",
            component: BookingFinish,
          },
        ],
      },
      {
        path: "mileageindex",
        name: "mileageindex",
        component: mileageindex,
      },
      {
        path: "mileageapply",
        name: "mileageapply",
        component: mileageapply,
      },
    ],
  },
];

const secondChildrenRouter = secondRouter.concat(flightWebTemplateRouter);

// flightWeb 一級路由寫在這!!!!
const flightWebRouter = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: secondChildrenRouter,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  {
    path: "/coupon",
    name: "Coupon",
    component: Coupon,
  },
  {
    path: "/couponad",
    name: "CouponAd",
    component: CouponAd,
  },
  {
    path: "/couponInCart",
    name: "CouponInCart",
    component: CouponInCart,
  },
  {
    path: "/couponCart",
    name: "CouponCart",
    component: CouponCart,
  },
  {
    path: "/discountCart",
    name: "DiscountCart",
    component: DiscountCart,
  },
  {
    path: "/BeautifulChatEmployee",
    name: "BeautifulChatEmployee",
    component: BeautifulChatEmployee,
  },
  {
    path: "/BindThirdLogin",
    name: "BindThirdLogin",
    component: BindThirdLogin,
  },
];

export default flightWebRouter;
