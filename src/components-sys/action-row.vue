<template>
    <el-form :size="size" inline class="zh-action-row">
        <el-form-item>
            <el-button-group>
                <slot></slot>
            </el-button-group>
        </el-form-item>
        <slot name="foot"></slot>
    </el-form>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: 'small'
        }
    },
    data: () => ({

    })
}
</script>

<style scoped lang="scss">
</style>
