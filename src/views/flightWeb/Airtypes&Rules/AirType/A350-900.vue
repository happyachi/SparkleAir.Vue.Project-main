<template>
    <airtype_dropdownlistVue></airtype_dropdownlistVue>
        <div class="editor ">
            <ul>
            <li>AIRBUS A350-900</li>
            <li>架數：4</li>
            <li>座位數：406 (頭等艙：4 / 商務艙：26 / 豪華經濟艙：36 / 經濟艙：240)</li>
        </ul>
    </div>   
    <h3 style="font-weight: bold;">座艙配置圖</h3>

    <div >
        <img src="https://webassets.starlux-airlines.com/zh-TW/Images/A350_mb_01_tcm5-7234.png" loading="lazy"
            class=" plane-img">
        <img src="https://webassets.starlux-airlines.com/zh-TW/Images/zh2_tcm5-3677.png" loading="lazy"
            class="right-image">

    </div>
</template>
    
<script setup >
 import airtype_dropdownlistVue from "@/components/flightWebComponents/Planes/airtype_dropdownlist.vue";   
</script>
    
<style scoped>

 .plane-img {
            max-width: 220px;
            height: auto;
            margin-left: 100px;
        }
        .right-image {
            background-color: #333;
            /* Dark background color */

            /* Add padding for spacing */

            /* Add padding for spacing */
            height: auto;
            /* 自動調整高度以保持原始比例 */
            max-width: 850px;
            /* 設置最大高度 */
            align-self: center;
            /* 將元素對齊到容器的右側 */
            margin-left: 100px;
            margin-bottom: 500px;
        }

        .right-image img {

            height: auto;
            /* 自動調整高度以保持原始比例 */
            max-width: 850px;
            /* 設置最大高度 */

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