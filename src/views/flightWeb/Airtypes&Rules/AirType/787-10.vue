<template>
        <airtype_dropdownlistVue v-model="whenSelected"> </airtype_dropdownlistVue>
         <div class="editor ">
        <ul>
            <li>Boeing 787-10</li>
            <li>架數：4</li>
            <li>座位數：342 (頭等艙：0 / 商務艙：34 / 豪華經濟艙：0 / 經濟艙：308)</li>
        </ul>


    </div>
        <h3 style="font-weight: bold;">座艙配置圖</h3>
        <img class="img container"
        src="https://www.evaair.com/zh-tw/images/%E6%A9%9F%E9%9A%8A%E5%BA%A7%E8%89%99%E9%85%8D%E7%BD%AE%E5%9C%96_942x1450_342%E5%BA%A7%E4%BD%8D_0205_tcm27-89754.jpg"
        alt="787-10 seat">

</template>
    
<script setup >
import airtype_dropdownlistVue from "@/components/flightWebComponents/Planes/airtype_dropdownlist.vue";
import { ref } from 'vue';

const whenSelected = ref(''); // 设置初始值

</script>

<style scoped>
     

        .img {
            flex: 1;
            /* 讓圖片彈性增長以佔據剩餘空間 */
            max-width: 40%;
            /* 圖片最大寬度為父元素寬度的一半 */
            background: #ffffff;
        }

        .editor {
            display: flex;
            flex-direction: column;
            margin: 50px 0 80px 120px;
        
            /* 让子元素垂直排列 */
        }
        .editor ul {
    list-style-type: disc; /* 恢復圓點 */
    font-size: 20px;
   
}

        .editor p {
            margin: 5px 0;
            /* 根据需要调整边距 */
        }

        
        h3{
                margin-left: 100px;

        }
</style>