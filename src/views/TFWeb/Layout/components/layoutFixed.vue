<script setup>
// vueUse
import { useScroll } from '@vueuse/core'
import { gettfitem, gettfcategory, gettfcategoryID } from '@/apis/taxfree.js';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
const { y } = useScroll(window)


const router = useRouter();

const getCategories = async () => {
    try {
        const response = await gettfcategory();
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    };
};


// //輸入ID後顯示商品分類
// const getcategoryID = ref([]);
// gettfcategoryID().then((res) => {
//     getcategoryID.value = res;
//     // console.log(getcategory.value);
// });
//輸入ID後顯示商品分類
const getcategory = ref([]);
gettfcategory().then((res) => {
    getcategory.value = res;
    // console.log(getcategory.value);
});


</script>


<template>

    <!-- Main Menu Section -->
    <section class="menu">
        <nav class="navbar navigation app-header-sticky" :class="{ show: y > 78 }">
            <div class="container">
                <div class="navbar-header">
                    <h2 class="menu-title">Main Menu</h2>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <!-- / .navbar-header -->

                <!-- Navbar Links -->
                <div id="navbar" class="navbar-collapse collapse text-center">
                    <ul class="nav navbar-nav">
                        <!-- Elements -->
                        <li class="dropdown">
                            <a href="/tax-free/TaxFreeShop">全部商品</a>
                        </li>
                        <li class="" v-for="item in getcategory" :key="item.id">
                            <a href="" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                                @click="navigateToCategory(item.id)" data-delay="350" role="button" aria-haspopup="true"
                                aria-expanded="false">{{ item.category }}
                                <span class=""></span>
                            </a>
                        </li>
                        <!-- <li class="dropdown">
                            <a href="/tax-free/TaxFreeFAQ">常見問題</a>
                        </li> -->
                        <!-- / Elements -->
                    </ul>
                    <!-- / .nav .navbar-nav -->
                </div>
                <!--/.navbar-collapse -->
            </div>
            <!-- / .container -->
        </nav>
    </section>


</template>



<style scoped lang='scss'>
.app-header-sticky {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;

    transform: translateY(-100%);
    opacity: 0;

    &.show {
        transition: all 0.3s linear;
        transform: none;
        opacity: 1;
    }

    .container {
        display: flex;
        align-items: center;
    }
}
</style>