<template>
 <!-- <p>{{ whenSelected.name}}</p>
 <p>{{ whenSelected}}</p> -->


    <select v-model="whenSelected" class="selector" @change="navigatetoView">
        
        <option v-for="(component, index) in components" :key="index" :value="component.path" :selected="whenSelected==component.path" >
            {{ component.name }}
        </option>

    </select>
</template>


<!-- <template>
    <p>{{ whenSelected }}</p>
       <select v-model="whenSelected" class="selector" @change="navigatetoView">
           
           <option v-for="(component, index) in components" :key="index" :value="component.path" >
               {{ component.name }}
           </option>
   
       </select>
   </template> -->
   

    
<script setup>

// import { ref ,defineProps, defineEmits} from 'vue';
import { useRouter } from 'vue-router';
import {ref} from 'vue';

//const AirTypes = ref([]);
// const props = defineProps({
//   modelValue: String, // 父组件传入的值
// });

// const emits = defineEmits(['update:modelValue']);

// const whenSelected = ref(props.modelValue);


//console.log(selectedItem);
const router = useRouter();
const whenSelected = ref(localStorage.getItem("whenSelected") || "Boeing 787-10");

//let whenSelected='Boeing 787-10'
//let whenSelected='';
const components = ref([
    { name: 'Boeing 787-10', path: '787-10' },
    { name: 'Boeing 777-300ER', path: '777-300ER' },
    { name: 'Airbus A321neo', path: 'A321neo' },
    { name: 'Airbus A350-900', path: 'A350-900' }
]);



// const updateSelected = () => {
//   emits('update:modelValue', selected.value); // 触发事件更新父组件的值
// };


const navigatetoView = () => {
    // 获取选择的组件路径
    const selectedPath = whenSelected.value;
    console.log(whenSelected.value);
    console.log(whenSelected.name);
    console.log(components);
    console.log(whenSelected);
    localStorage.setItem("whenSelected", selectedPath);
    //whenSelected.selectedValue=whenSelected.value;
    //console.log(whenSelected.selectedValue);
    //console.log(selectedPath);
    //
// components.forEach(c=>{
//     //console.log(c.name);
//         //console.log(c.path);
//         //console.log(whenSelected);
//     if(c.path===whenSelected)


router.push({ name: selectedPath});

    
// };
    // 根据选择的路径进行页面跳转
    // if (selectedPath) {
        //router.push({ name:whenSelected });}
     
}


// 监听 whenSelected 的变化，并更新组件名称
// watch(whenSelected, (newValue) => {
//     if (newValue) {
//         const selectedComponent = components.value.find(component => component.path === newValue);
//         if (selectedComponent) {
//             console.log(selectedComponent.name); // 确保获得了正确的组件名称
//         }
//     }
// });


//const selectedComponent = ref('');

// const loadAirTypes = async()=>{
//     const response = await fetch('http://localhost:8889/api/AirTypes/GetAll')
//     const data=await response.json();
//     AirTypes.value=data;
    
//     AirTypes.value.forEach(name=> {
//         let flightmodel=name.flightModel;
//         console.log(flightmodel);
//     });
    


// }

// loadAirTypes();

</script>
    
<style scoped>
.selector{
    border: 1px solid black !important;
    padding: 4px 8px 4px 1px;
    margin-top: 50px;
    margin-left: 100px;
    -webkit-appearance: menulist-button; /* Safari 和 Chrome */
    appearance: menulist-button; /* 其他浏览器 */
    border-radius: 3px;
    font-size: 18px;
    
}
/* .selector option[value=""] {
    display: none;
} */

.breadcrumb-select 
{
    font-size: 20px;
    padding: 0;
    margin-left: 50px;
    border-radius: 3px;
    border: 1px solid black  !important;
    width: 10px;
}  



</style>