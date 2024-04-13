<script lang="ts" setup>
import { ref, computed ,watch } from 'vue';
import { ElMessage } from 'element-plus'
import { getSessionTokenData } from "@/utils/sessionHelper"; //奇哥會員
//const memberData = ref(getSessionTokenData());//奇哥會員

//element plus 的框框
const open2 = () => {
  ElMessage({
    message: '行李加購成功',
    type: 'success',
  })
}


const amount = ref();
const bookingprice = ref(0);
//const price1 = computed(() => amount.value * bookingprice.value) //變成隨時監聽計算
const btnisVisible=ref(true);
const alert =ref();
const TicketinvoicingId =ref(4); //等奇哥!!!!!!!!!!!!
const showmoney =ref();

const loadprice = async (TicketinvoicingId) =>{

  const res =await fetch(`http://localhost:8889/api/LuggageOrder/GetLuggageprice/${TicketinvoicingId}`) //先設編號id 4
  const data = await res.json()
  bookingprice.value = data
  console.log(bookingprice.value);

}

loadprice(TicketinvoicingId.value)


//const btn = document.querySelctor("#btn");

//計算數量金錢與按鈕消失
const salary = () =>{
showmoney.value =amount.value * bookingprice.value 
  if(amount.value < 0 ){
    btnisVisible.value=false; //隱藏購買按鈕
    alert.value = "不能購買負數!!"
   
  }else if(amount.value > 5)
  {
    btnisVisible.value=false; //隱藏購買按鈕
    alert.value = "最多加購5件"
    showmoney.value=0
    amount.value =0
   
  }else if (/[^a-zA-Z0-9]/.test(amount.value)) {
    btnisVisible.value=false; //隱藏購買按鈕
  alert.value = "不能輸入中文或符號,只能輸入數字!!!!";
 }else if (!/^\d+$/.test(amount.value)) {
    btnisVisible.value=false; //隱藏購買按鈕
  alert.value = "不能輸入英文或中文,只能輸入數字!!";
 }else{
    btnisVisible.value=true; //顯示購買按鈕
    alert.value = ""
  }
}
//用於存session 的 Luggage物件
const Luggage = computed(() => ({
  showmoney: showmoney.value,
  amount: amount.value,
}));

watch(Luggage, (newValue) => {  //Luggage 是上面設定的ref() ,要監聽的東西
    //存成session
  sessionStorage.setItem("Luggagepurchase", JSON.stringify(newValue)); //Luggagepurchase 是session中顯示名字
});



//觸發購買按鈕
const buyclick = async()=>{
    
    //todo

}

const dialog = ref(true)

</script>

<template>
    <!-- Main Content Start -->
    <div class="page-content m-0">
        <!-- Flight-Booking Start -->
        <section
            class="flight-booking"      
        >
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-8">
                        <div class="booking-form">
                            <form
                                action="flight-booking.html"
                                id="flight-form"
                                method="post"
                                role="form"
                                class="contact-form form-wizard"
                            >
                                <div class="form-wizard-header">
                                </div>
                                <div
                                    class="wizard-content overflow-visible mb-24"
                                >
                                    <fieldset
                                        id="step-2"
                                        class="tab-pane show wizard-fieldset p-0"
                                    >
                                        <div id="wizardValidator">
                                            <div class="detail-form mb-32">
                                                <h4 class="black p-0 mb-40">
                                                <div><li>最多加購五件</li></div> 
                                                  <br>                                      
                                                  <li><span>購買託運件數:　</span></li>  <span class="text-danger">{{ alert }}</span> 
                                                </h4>
                                               
                                                <div class="row">
                                                    <div class="col-sm-5 mb-40">
                                                        <input v-model="amount" v-on:keyup="salary"
                                                            type="number" max="5" min="0"
                                                            class="form-control wizard-required"
                                                            id="first-name"
                                                            name="first-name"
                                                            placeholder="請輸入託運件數"
                                                        />
                                                        <div
                                                            class="wizard-form-error"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="d-flex gap-24">
                                            <!-- <a
                                                href="javascript:;"
                                                id="btn"
                                                v-if="btnisVisible"
                                                v-on:click="buyclick"
                                                class="form-wizard-next-btn cus-btn w-100"
                                            >
                                                加購
                                            </a> -->
                                            <el-button :plain="true" @click="open2" class="form-wizard-next-btn cus-btn w-100 " :style="{ display: btnisVisible ? 'block' : 'none' , height: '50px' }">加購</el-button>
                                        </div>
                                    </fieldset>
                                </div>
                               
                            </form>
                        </div>
                    </div>

                    <!--這裡是price summary-->
                    <div class="col-xl-4 mb-lg-0 mb-32">
                        <div class="flight-booking-detail light-shadow">
                            <div class="flight-title">
                                <h4 class="color-white">Price Summary</h4>
                            </div>
                            <div class="box bg-white p-24"> 
                                <div
                                    class="d-flex align-items-center justify-content-between mb-24"
                                >
                                    <div>
                                        <h4 class="color-black">託運件數:</h4>
                                        <p class="dark-gray">
                                          <h4>{{amount}}</h4>  
                                        </p>
                                    </div>
                                    <h5 class="color-black">${{ showmoney }}</h5>
                                </div>                                                            
                               
                                <div
                                    class="d-flex align-items-center justify-content-between"
                                >
                                    <div>
                                        <h4 class="color-black">Total</h4>
                                    </div>
                                    <h4 class="color-black">${{ showmoney }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Flight-Booking End -->
    </div>
    <!-- Main Content End -->
</template>

<style scoped>
</style>
