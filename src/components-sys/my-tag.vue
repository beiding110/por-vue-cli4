<template>
    <el-tag :size="size" :icon="icon" :type="type" @click="$emit('click')">
        <slot></slot>
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
</style>
