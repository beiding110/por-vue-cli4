<template>
    <div class="file-list">
        <file-item
            v-for="(item, index) in data"
            :key="index"
            :data="item"
            :action="action"
            @del="$emit('del', {data: $event, index})"
            :size="size"
            :readonly="readonly"
        ></file-item>

        <slot></slot>
    </div>
</template>

<script>
import FileItem from './file-preivew-item';

export default {
    components: {
        FileItem,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        action: {
            type: Object,
            default: () => ({}),
        },
        size: {
            type: [String,Number],
            default: 178,
        },
        readonly: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            
        };
    },
};
</script>

<style lang="scss" scoped>
    .file-list{
        overflow: hidden;
        margin: -5px;
        margin-right: 5px;
    }
</style>