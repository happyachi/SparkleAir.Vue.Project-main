<template>
    <h3><strong>里程折抵</strong></h3>
    <h4 class="black p-0 mb-40">
        <li>目前可折抵里程數:　{{ getsomeonemileage }}</li>
        <br />
        <li>
            里程折抵:　<span v-if="showmile">{{ mileage }} </span>
            <span v-if="showalert" class="text-danger">{{ alert }}</span>
          </li>
          <br />
          <li>折抵金額:　{{PriceFormat(parseInt(price))}}</li>
        </h4>
        <h4></h4>
        <div class="row">
          <div class="col-sm-5 mb-40">
            <input
                v-model="mileage"
                v-on:keyup="discount"
                type="number"
                :max="getsomeonemileage"
                min="0"
                class="form-control wizard-required"
                id="first-name"
                name="first-name"
                placeholder="請輸入折抵的里程數"
            />
            <div class="wizard-form-error"></div>
        </div>
    </div>
    <!-- <div class="d-flex gap-24">
                                            <a
                                                href="javascript:;"
                                                id="btn"
                                                v-on:click="buyclick"
                                                class="form-wizard-next-btn cus-btn w-100"
                                            >
                                                折抵
                                            </a>
                                        </div> -->
</template>

<script setup>
//import { getMileageDetail } from "@/apis/MileageDetail.js";
import { ref, onMounted, watch, computed } from "vue";
import { PriceFormat } from "@/views/flightWeb/AirFlights/components/flightJS/CabinHelper" //小歐價錢格式
import { getSessionTokenData } from "@/utils/sessionHelper"; //奇哥會員
const memberData = ref(getSessionTokenData("memberToken")); //奇哥會員
const mileage = defineModel("mileage"); //子傳父
const price = defineModel("price"); //子傳父
console.log(PriceFormat(price));
// const props = defineProps({
//   mileage: {
//     type: Number,
//     default: () => 0,
//   },
//   price: {
//     type: Number,
//     default: () => 0,
//   },
// });

const getIdDetail = ref();
// const mileage = ref(); //輸入里程
const alert = ref(); //alert內容
// const price = ref(); // 價格在這!!

const showmile = ref(true); //顯示輸入折抵里程數
const showalert = ref(false); // 顯示警示語

let id = ref();
if (
  memberData.value != null &&
  memberData.value != undefined &&
  memberData.value.MemberId
) {
  id.value = memberData.value.MemberId; //奇哥要再改!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

const getsomeonemileage = ref(); //某會員的最後一筆finalmile
const loadmileage = async (id) => {
  const res = await fetch(
    `http://localhost:8889/api/MileageDetail/Getfinalmile/${id}`
  ); //先設編號id 1
  const data = await res.json();
  getsomeonemileage.value = data;
  console.log(data);
};
if (
  memberData.value != null &&
  memberData.value != undefined &&
  memberData.value.MemberId
) {
  //getMemberId();
  loadmileage(id.value); //執行
}

//keyup事件
const discount = () => {
    var money = Math.floor(mileage.value * 0.4);
    price.value = money;
  if (mileage.value < 0) {
    showmile.value = false;
    showalert.value = true;
    price.value = 0;
    mileage.value = 0;
    alert.value = "不能輸入負數!!";
  } else if (/[^a-zA-Z0-9]/.test(mileage.value)) {
    showmile.value = false;
    showalert.value = true;
    alert.value = "不能輸入中文或符號,只能輸入數字!!!!";
  } else if (!/^\d+$/.test(mileage.value)) {
    showmile.value = false;
    showalert.value = true;
    alert.value = "不能輸入英文或中文,只能輸入數字!!";
  } else if (mileage.value > getsomeonemileage.value) {
    showmile.value = false;
    showalert.value = true;
    alert.value = "您的里程不夠折抵";
    props.value.price = 0;
  } else {
    showmile.value = true;
    showalert.value = false;
    alert.value = "";
  }
};

onMounted(() => {});

//用於存session 的 DisMile物件
const DisMile = computed(() => {
  return [
    {
      price: price.value,
      mileage: mileage.value,
    },
  ];
});

//監聽 DisMile session
watch(DisMile, (Value) => {
    //存成session
    sessionStorage.setItem("DiscountMile", JSON.stringify(Value)); //Luggagepurchase 是session中顯示名字
});

//監聽 mileage.value 不可超過最多可折抵里程數
watch(
    () => mileage.value,
    (newValue) => {
        mileage.value =
            newValue > getsomeonemileage.value
                ? getsomeonemileage.value
                : newValue;
        console.log(newValue);
    }
);
</script>

<style scoped></style>
