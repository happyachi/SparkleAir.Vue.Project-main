<template>
    <airtype_dropdownlistVue v-model="whenSelected"> </airtype_dropdownlistVue>



    <div class="editor">
        <ul>
            <li>Boeing 777-300ER</li>
            <li>架數：4</li>
            <li>
                座位數：323 (頭等艙：38 / 商務艙：0 / 豪華經濟艙：64 /
                經濟艙：221)
            </li>
        </ul>
    </div>
    <h3 style="font-weight: bold">座艙配置圖</h3>

    <img class="img container" src="https://www.evaair.com/zh-tw/images/B777-300-77M_tcm27-66562.jpg"
        alt="777-300ER seat" />

</template>


<script setup>
import airtype_dropdownlistVue from "@/components/flightWebComponents/Planes/airtype_dropdownlist.vue";
import { ref } from 'vue';



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
    list-style-type: disc;
    /* 恢復圓點 */
    font-size: 20px;
}

.editor p {
    margin: 5px 0;
    /* 根据需要调整边距 */
}

h3 {
    margin-left: 100px;
}
</style>
