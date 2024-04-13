// 免稅品
import TaxFreeLayout from "@/views/TFWeb/Layout/index.vue";
import TaxFreeHome from "@/views/TFWeb/Home/index.vue";
import TaxFreeBlogRightSidebar from "@/views/TFWeb/BlogRightSidebar/index.vue";
import TaxFreeCart from "@/views/TFWeb/Cart/index.vue";
import TaxFreeCheckout from "@/views/TFWeb/Checkout/index.vue";
import TaxFreeConfirmation from "@/views/TFWeb/Confirmation/index.vue";
import TaxFreeDashBoard from "@/views/TFWeb/DashBoard/index.vue";
import TaxFreeFAQ from "@/views/TFWeb/FAQ/index.vue";
import TaxFreeLogin from "@/views/TFWeb/Login/index.vue";
import TaxFreeOrder from "@/views/TFWeb/Order/index.vue";
import TaxFreeProductSingle from "@/views/TFWeb/ProductSingle/index.vue";
import TaxFreeShop from "@/views/TFWeb/Shop/index.vue";
import TaxFree404Page from "@/views/TFWeb/ErrorPage/404Error.vue";
import TaxFreeLogin2 from "@/views/TFWeb/Login/index2.vue";

const tfWebRouter = [
  {
    path: "/tax-free",
    name: "tax-free",
    component: TaxFreeLayout,
    children: [
      {
        path: "",
        name: "TaxFreeIndex",
        component: TaxFreeHome,
      },
      {
        path: "TaxFreeBlogRightSidebar",
        name: "TaxFreeBlogRightSidebar",
        component: TaxFreeBlogRightSidebar,
      },
      {
        path: "TaxFreeCart",
        name: "TaxFreeCart",
        component: TaxFreeCart,
      },
      {
        path: "TaxFreeCheckout",
        name: "TaxFreeCheckout",
        component: TaxFreeCheckout,
      },
      {
        path: "TaxFreeConfirmation",
        name: "TaxFreeConfirmation",
        component: TaxFreeConfirmation,
      },
      {
        path: "TaxFreeDashBoard",
        name: "TaxFreeDashBoard",
        component: TaxFreeDashBoard,
      },
      {
        path: "TaxFreeFAQ",
        name: "TaxFreeFAQ",
        component: TaxFreeFAQ,
      },
      {
        path: "TaxFreeLogin",
        name: "TaxFreeLogin",
        component: TaxFreeLogin,
      },
      {
        path: "TaxFreeOrder",
        name: "TaxFreeOrder",
        component: TaxFreeOrder,
      },
      {
        path: "TaxFreeProductSingle",
        name: "TaxFreeProductSingle",
        component: TaxFreeProductSingle,
      },
      {
        path: "TaxFreeShop",
        name: "TaxFreeShop",
        component: TaxFreeShop,
      },
      {
        path: ":pathMatch(.*)*",
        name: "TaxFree404Page",
        component: TaxFree404Page,
      },
    ],
  },
];

export default tfWebRouter;
