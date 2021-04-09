<template>
    <el-tag :size="size" :icon="icon" :type="type" @click="$emit('click')">
        <div class="my-tag_inner">
            <slot></slot>
        </div>
    </el-tag>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: 'mini'
        },
        icon: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        }
    },
    data: () => ({

    })
}
</script>

<style scoped lang="scss">
.my-tag_inner{
    white-space: pre-wrap;
}
</style>
