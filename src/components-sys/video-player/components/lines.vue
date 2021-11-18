<template>
    <div class="lines"  ref="line">
        <div class="line video">
            <div 
                v-if="showWatch"
                class="watched"
                :style="{boxShadow: watchedShadow, height:showBuffer ? '1px' : '100%'}"
            ></div>

            <div 
                v-if="showBuffer"
                class="bufferd"
                :style="{boxShadow: bufferedShadow, height:showWatch ? '1px' : '100%'}"
            ></div>

            <div 
                class="playing"
                :style="{transform:`scaleX(${schedule})`}"
            ></div>

            <div 
                v-if="draggable"
                class="btn-drag"
                :style="{transform:`translateX(${shcheduleLeft}px)`}"
                @mousedown="dragStart"
                @touchstart="dragStart"
                @mouseup="dragBtnEnd"
                @touchend="dragBtnEnd"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        duration: {
            type: Number,
            default: 0,
        },
        currentTime: {
            type: Number,
            default: 0,
        },
        draggable: {
            type: Boolean,
            default: true,
        },
        buffered: {
            type: Array,
            default: () => [],
        },
        showBuffer: {
            type: Boolean,
            default: true,
        },
        watched: {
            type: Array,
            default: () => [],
        },
        showWatch: {
            type: Boolean,
            default: true,
        },
        updateOnDrag: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            dragging: false,
            dragStartX: 0,
            dragLeft: 0,

            dragToTime: 0,
        }
    },
    computed: {
        schedule() {
            if(!this.duration) {
                return 0;
            }

            return (this.currentTime / this.duration);
        },
        shcheduleLeft() {
            if(!this.duration) {
                return 0;
            }

            if(this.dragging) {
                return this.dragLeft;
            }

            var line = this.$refs.line,
                width = line.clientWidth;
            
            return (width * this.schedule);
        },
        bufferedShadow() {
            if(!this.showBuffer) return '';
            if(!this.buffered.length) return '';

            return this.shadowBuilder(this.buffered, 'rgba(113,113,113,.5)');
        },
        watchedShadow() {
            if(!this.showWatch) return '';
            if(!this.watched.length) return '';

            return this.shadowBuilder(this.watched, '#67C23A');
        },
    },
    methods: {
        timeToPos(time) {
            if(!this.duration) {
                return 0;
            }

            var percent = time / this.duration,
                left = percent * this.$refs.line.offsetWidth;

            return left;
        },
        dragCalcHandler(event) {
            var e = event;
            if(e.touches) {
                e = e.touches[0] || e.changedTouches[0];
            }

            var draggingX = e.screenX,
                deltaX = draggingX - this.dragStartX;

            var toPercent = deltaX / this.$refs.line.offsetWidth;

            toPercent = Math.min(toPercent, 1);
            toPercent = Math.max(toPercent, 0);

            var toTime = toPercent * this.duration,
                toPosition = toPercent * this.$refs.line.offsetWidth;

            this.dragLeft = toPosition;

            return toTime;
        },
        dragStart(event) {
            this.$emit('pause');

            var e = event,
                layerX = this.shcheduleLeft;

            if(e.touches) {
                e = e.touches[0];
            }

            this.dragging = true;
            this.dragStartX = e.screenX - layerX;
            this.draggingX = e.screenX;
            this.dragLeft = layerX
        },
        dragMove(event) {
            if(!this.dragging) return;

            var toTime = this.dragCalcHandler(event);

            if(this.updateOnDrag) {
                this.$emit('update', toTime);
            }
        },
        dragEnd() {
            this.dragging = false;
            this.dragStartX = 0;
            // this.dragLeft = 0;
        },
        dragBtnEnd(event) {
            if(!this.updateOnDrag) {
                var toTime = this.dragCalcHandler(event);

                this.$emit('update', toTime);
            }
        },
        shadowBuilder(arr, color) {
            return arr.map(item => {
                let fromPixel = Math.floor(this.timeToPos(item[0]));
                let toPixel = Math.floor(this.timeToPos(item[1]));

                var periodStr = [],
                    drawItem = fromPixel;

                while(toPixel >= drawItem) {
                    periodStr.push(`${drawItem}px 0 ${color}`);
                    drawItem ++;
                }

                return periodStr.join(',');
            }).join(',');
        }
    },
    mounted() {
        document.addEventListener('mousemove', this.dragMove);
        document.addEventListener('mouseup', this.dragEnd);
        document.addEventListener('touchmove', this.dragMove);
        document.addEventListener('touchend', this.dragEnd);
    },
    beforeDestroy() {
        document.removeEventListener('mousemove', this.dragMove);
        document.removeEventListener('mouseup', this.dragEnd);
        document.removeEventListener('touchmove', this.dragMove);
        document.removeEventListener('touchend', this.dragEnd);
    },
}
</script>

<style lang="scss" scoped>
    .lines{
        width: 100%;
        position: relative;
    }

    .line{
        background: #e7e7e7;
        height: 2px;
        width: 100%;
        position: relative;

        .watched{
            display: inline-block;
            width: 1px;
            position: absolute;
            left: 0;
            top: 0;
        }

        .bufferd{
            display: inline-block;
            width: 1px;
            position: absolute;
            left: 0;
            bottom: 0;
        }

        .playing{
            height: 100%;
            width:100%;
            background: #F56C6C;
            transform-origin: left;
            transform: scaleX(0);
        }

        $btnSize: 14px;

        .btn-drag{
            display: inline-block;
            width: $btnSize;
            height: $btnSize;
            border-radius: 50%;
            background: white;
            position: absolute;
            left: - $btnSize / 2 + 1;
            top: - $btnSize / 2 + 1;
            cursor: pointer;
        }
    }
</style>