<template>
    <div class="">
        <div class="top">
            <display-block></display-block>
        </div>
        <div>
            <block-list></block-list>
        </div>
    </div>
</template>
<script>
import displayBlock from '@/components/disList/displayBlock'
import blockList from '@/components/disList/blockList'
export default {
    name:"display",
    components:{
        displayBlock,
        blockList
    }
}
</script>