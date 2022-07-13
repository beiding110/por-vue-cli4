<template>
    <el-row :gutter="10" class="my-img">
        <el-col 
        class="col-item"
        ref="cols"
        v-for="(item, index) in data"
        :key="index"
        :span="spanNumber"
        >
            <el-image 
                class="img-item"
                :style="imgItemStyle"
                ref="img"
                :src="item" 
                fit="cover"
                :preview-src-list="previewList(index)"
            ></el-image>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data: () => ({
        targetWidth: 0,
    }),
    watch: {
        data: {
            handler() {
                this.$nextTick(() => {
                    this.targetWidth = this.getTargetWidth();
                });
            },
            deep: true,
            immediate: true,
        }
    },
    computed: {
        spanNumber() {
            var length = this.data.length;

            if (length < 2) {
                return 24;
            }

            if ([2, 4].includes(length)) {
                return 12;
            }

            return 8;
        },
        imgItemStyle() {
            return {
                height: `${this.targetWidth}px`,
            };
        },
    },
    methods: {
        previewList(index = 0) {
            var before = this.data.slice(0, index),
                after = this.data.slice(index);

            return [
                ...before,
                ...after,
            ];
        },
        getTargetWidth() {
            var target = this.$refs.cols,
                firstRef,
                firstEl,
                firstWdith;

            if (!target) {
                return 0;
            }

            firstRef = target[0] || {};
            firstEl = firstRef.$el || {};
            firstWdith = firstEl.clientWidth;

            return firstWdith - 10;
        },
    },
    mounted() {
        
    }
};
</script>

<style lang="scss" scoped>
    .col-item {
        margin-bottom: 6px;

        .img-item{
            width: 100%;
        }
    }
</style>