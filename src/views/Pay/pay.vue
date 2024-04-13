<!-- <template>
        
</template>
    
<script setup >
import {useRouter} from 'vue-router'
import {getTransferAPI} from '@/views/Pay/pay.js';
import {onMounted, ref} from 'vue';
const route=useRouter();

const payInfo = ref({});
const getPayInfo = async()=>{
    const res=await getTransferAPI(route.query.id)
    payInfo.value=res.result;

}
onMounted(() => getPayInfo())
</script>
    
<style>
    
</style> -->
<template>

</template>

<script setup lang='ts'>

</script>

<style scoped></style>