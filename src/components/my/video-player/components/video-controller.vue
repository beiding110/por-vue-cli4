<template>
    <div class="video-controller">
        <video-cover
            :state="state"
            :show-controller="showController"
            :transparent-controller="transparentController"
            @show="show"
            @hide="delayHide"
            @play="$emit('play')"
            @pause="$emit('pause')"
        ></video-cover>

        <div 
        v-show="showController && state !== 'loading'"
        class="controller-bar" 
        :class="{transparent: transparentController}"
        @mouseenter="show"
        @mousemove="show"
        @mouseleave="delayHide"
        @touchstart="show"
        @touchend="delayHide"
        >
            <div class="btn-con">
                <div class="btn-item item">
                    <svg 
                    v-show="['paused', 'stopped'].includes(state)"
                    @click="clickHandler"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 22 22"
                    >
                        <path d="M17.982 9.275L8.06 3.27A2.013 2.013 0 005 4.994v12.011a2.017 2.017 0 003.06 1.725l9.922-6.005a2.017 2.017 0 000-3.45z"></path>
                    </svg>

                    <svg 
                    v-show="['playing'].includes(state)"
                    @click="clickHandler"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 22 22"
                    >
                        <path d="M7 3a2 2 0 00-2 2v12a2 2 0 104 0V5a2 2 0 00-2-2zM15 3a2 2 0 00-2 2v12a2 2 0 104 0V5a2 2 0 00-2-2z"></path>
                    </svg>
                </div>
            </div>

            <div class="current item time">
                {{currentTime | time}}
            </div>

            <div class="time-line-con item">
                <lines
                    :duration="duration"
                    :current-time="currentTime"
                    :buffered="buffered"
                    :watched="watched"
                    :show-watch="showWatch"
                    :update-on-drag="!showWatch"
                    @pause="$emit('pause')"
                    @update="$emit('update', $event)"
                ></lines>
            </div>

            <div class="duration item time">
                {{duration | time}}
            </div>

            <div class="item controls-con">
                <div 
                class="btn-item item" 
                @click="fullScreenHandler"
                >
                    <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <path d="M17.262 9.995a.75.75 0 01.75.75v6.585a.75.75 0 01-.75.75h-6.515a.75.75 0 010-1.5h5.765v-5.835a.75.75 0 01.75-.75zm-6-6a.75.75 0 110 1.5H5.497v5.835a.75.75 0 01-1.5 0V4.745a.75.75 0 01.75-.75h6.515z" id="pid-1-svgo-a"></path>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                            <path d="M0 0h22v22H0z"></path>
                            <mask id="pid-1-svgo-b" fill="#fff">
                                <use xlink:href="#pid-1-svgo-a"></use>
                            </mask>
                            <use fill="#979797" fill-rule="nonzero" xlink:href="#pid-1-svgo-a"></use>
                            <g mask="url(#pid-1-svgo-b)" fill="#FFF" fill-rule="nonzero">
                                <path d="M0 0h22v22H0z"></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>

        <div 
        v-show="!showController && state !== 'loading'"
        class="voerview"
        :class="{transparent: !transparentController}"
        >
            <lines
                :duration="duration"
                :current-time="currentTime"
                :draggable="false"
                :show-buffer="false"
                :show-watched="false"
            ></lines>
        </div>
    </div>
</template>

<script>
import VideoCover from './video-cover';
import Lines from './lines';

import STATE_CONFIG from '../config/state';

export default {
    components: {
        VideoCover,
        Lines,
    },
    props: {
        state: {
            type: String,
            default: 'loading',
        },
        duration: {
            type: Number,
            default: 0,
        },
        currentTime: {
            type: Number,
            default: 0,
        },
        buffered: {
            type: Array,
            default: () => [],
        },
        watched: {
            type: Array,
            default: () => [],
        },
        showWatch: {
            type: Boolean,
            default: true,
        },
    },
    filters: {
        time(value) {
            if(!value) return `00:00`;

            value = Math.floor(Number(value));
            var sec = value % 60,
                min = (value - sec) / 60;

            sec = sec < 10 ? `0${sec}` : sec;
            min = min < 10 ? `0${min}` : min;

            return `${min}:${sec}`;
        },
    },
    data() {
        return {
            clickConfig: STATE_CONFIG,

            showController: true,
            transparentController: false,

            hideLock: true,

            closeDelay: 1000,
            delayTimer: null,
        };
    },
    watch: {
        state(n) {
            this.clickConfig[n].stateWatcher.call(this);
        }
    },
    methods: {
        clickHandler() {
            this.clickConfig[this.state].btnHandler.call(this);
        },
        fullScreenHandler() {
            this.$emit('fullscreen');
        },
        show() {
            if(this.delayTimer) {
                clearTimeout(this.delayTimer);
            };

            this.showController = true;
            this.$nextTick(() => {
                this.transparentController = false;
            });
        },
        hide() {
            this.transparentController = true;
            setTimeout(() => {
                this.showController = false;
            }, 300);
        },
        delayHide() {
            if(this.delayTimer) {
                clearTimeout(this.delayTimer);
            };

            if(this.hideLock) return;

            this.delayTimer = setTimeout(() => {
                this.hide();
            }, this.closeDelay);
        }
    },
}
</script>

<style lang="scss" scoped>
    .video-controller{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }

    .controller-bar {
        display: flex;
        width: 100%;
        height: 44px;
        position: absolute;
        left: 0;
        bottom: 0;
        overflow: hidden;
        background-image: linear-gradient(0deg,rgba(0,0,0,.76),transparent);
        transition: all .3s;
        opacity: 1;

        &.transparent{
            opacity: 0;
        }

        .item{
            height: 44px;
            line-height: 44px;
            display: inline-block;
            color: white;
        }

        .time{
            font-size: 12px;
            margin: 0 1em;
        }

        .icon{
            width: 60px;
            height: 60px;
            cursor: pointer;
        }

        .btn-item{
            width: 44px;
            padding: 0 10px;
            box-sizing: border-box;
            line-height: 56px;
            fill: white;
        }

        .time-line-con{
            flex: 1;
            display: flex;
            align-items: center;
        }

        // .controls-con{
            
        // }
    }

    .voerview{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all .3s;
        opacity: 1;

        &.transparent{
            opacity: 0;
        }
    }
</style>