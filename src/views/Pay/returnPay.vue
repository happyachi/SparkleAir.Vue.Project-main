<template>
    <div class="center-container">
        <el-row class="center-row">
            <el-col :sm="24" :lg="24">
                <el-result icon="success" title="付款成功!" sub-title="頁面跳轉中.....">
                    <template #extra>
                        <!-- <el-button type="primary"></el-button> -->
                    </template>
                </el-result>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.center-container {
    display: flex;
    justify-content: center;
    /* 水平置中 */
    align-items: center;
    /* 垂直置中 */
    height: 100vh;
    /* 使容器撐滿整個畫面 */
    max-width: 100%;
    /* 最大寬度100% */
    max-height: 100%;
    /* 最大高度100% */
}

.center-row {
    width: 100%;
    /* 確保內容可以適應父元素的寬度 */
}

.icon-success {
    font-size: 500px !important;
    /* 设置图标的字体大小 */
}

.el-result__title {
    font-size: 50px;
}
</style>