<template>
    <div class="video-player">
        <div class="video-con">
            <video 
                ref="video"
                @click="videoClick"
            ></video>
        </div>

        <video-controller
            ref="cover"
            :state="videoState"
            :duration="info.duration"
            :current-time="info.currentTime"
            :buffered="info.buffered"
            :watched="watched"
            :show-watch="showWatch"
            @play="playHandler"
            @pause="pauseHandler"
            @fullscreen="fullScreenHandler"
            @update="updateHandler"
        ></video-controller>
    </div>
</template>

<script>
import VideoController from './components/video-controller';

export default {
    components: {
        VideoController,
    },
    props: {
        src: {
            type: String,
            default: '',
        },
        watched: {
            type: Array,
            default: () => [],
        },
        showWatch: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            videoState: 'loading',
            info: {
                duration: 0,
                currentTime: 0,
                buffered: [],
            },
            updateTimer: null,
            thisTimePlayFrom: 0,
            userCompleteThisVideo: false,
        }
    },
    computed: {
        video() {
            return this.$refs.video;
        },
        readyState() {
            return this.video.readyState;
        },
        watchedModel: {
            get() {
                return this.watched;
            },
            set(val) {
                this.$emit('update:watched', val);
            },
        }
    },
    watch: {
        src: {
            handler(n, o) {
                if(n) {
                    this.$refs.video.src = n;
                    
                    this.attachEvents();
                };
            }
        }
    },
    methods: {
        updateState(state = 'loading') {
            this.videoState = state;
        },
        attachEvents() {
            var video = this.video;

            video.oncanplay = (e) => {
                this.info.duration = e.target.duration;
                this.updateState('stopped')
            };
            video.onplay = (e) => {
                this.thisTimePlayFrom = e.target.currentTime;

                this.updateState('playing');
            };
            video.onplaying = (e) => {
                this.thisTimePlayFrom = e.target.currentTime;

                this.updateState('playing');
            };
            video.onwaiting = () => {
                this.updateState('loading')
            };
            video.onpause = (e) => {
                this.updateState('paused');

                this.updateWatched(this.thisTimePlayFrom, e.target.currentTime);
            };
            video.onended = (e) => {
                this.updateState('stopped');

                this.updateWatched(this.thisTimePlayFrom, e.target.currentTime);
            };
            video.ontimeupdate = (e) => {
                this.info.currentTime = e.target.currentTime;

                this.updateWatched(this.thisTimePlayFrom, e.target.currentTime);
            };
            video.onprogress = (e) => {
                var buffered = e.target.buffered;

                var bufferedArr = [];

                for(let i = 0; i < buffered.length; i++) {
                    bufferedArr.push([buffered.start(i), buffered.end(i)]);
                }

                this.info.buffered = bufferedArr;
            };
        },
        removeEvents() {
            var video = this.video;

            video.oncanplay = null;
            video.onplay = null;
            video.onplaying = null;
            video.onwaiting = null;
            video.onpause = null;
            video.onended = null;
            video.ontimeupdate = null;
            video.onprogress = null;
        },
        playHandler() {
            this.video.play();
            this.updateTime();
        },
        pauseHandler() {
            this.video.pause();
            this.stopUpdateTime();
        },
        videoClick() {
            
        },
        fullScreenHandler() {
            this.video.requestFullscreen();
        },
        updateHandler(e) {
            this.thisTimePlayFrom = e;

            this.$refs.video.currentTime = e;
        },
        updateTime() {
            if(this.updateTimer) {
                clearInterval(this.updateTimer);
            }

            this.updateTimer = setInterval(() => {
                this.info.currentTime = this.$refs.video.currentTime;
            }, 1000 / 24);
        },
        stopUpdateTime() {
            if(this.updateTimer) {
                clearInterval(this.updateTimer);
            }

            this.updateTimer = null;
        },
        watchCombine(origion, target) {
            if(!origion.length) {
                origion.push([Math.min(...target), Math.max(...target)]);
                return origion;
            }

            var cloneOrg = [...origion],
                targetStart = target[0],
                targetEnd = target[1];

            var has = (function() {
                //处理交叉部分
                var intersectionArr = origion.filter((filterItem, filterIndex) => {
                    return (filterItem[1] >= targetStart && filterItem[0] <= targetEnd)
                }).sort((a, b) => {
                    return a[0] - b[0]
                });

                if(!intersectionArr.length) return false;

                let minOne = intersectionArr[0],
                    maxOne = intersectionArr[intersectionArr.length - 1],
                    interRebuild = [];
                    
                interRebuild.push(Math.min(minOne[0], targetStart));
                interRebuild.push(Math.max(maxOne[1], targetEnd));

                intersectionArr.forEach((item, index) => {
                    let i = cloneOrg.indexOf(item);

                    if (!index) {
                        cloneOrg.splice(i, 1, interRebuild);
                    } else {
                        cloneOrg.splice(i, 1);
                    }
                })

                return true
            })();

            if(has) return cloneOrg;

            (function() {
                //处理未交叉部分

                if (origion[0][0] > targetEnd) {
                    cloneOrg.unshift(target);
                } else {
                    origion.forEach((item, index) => {
                        var start = item[0],
                            end = item[1],
                            next = origion[index + 1];

                        if(next) {
                            if(end < targetStart && next[0] > targetEnd) {
                                cloneOrg.splice(index + 1, 0, target);
                            }
                        } else {
                            cloneOrg.push(target);
                        }
                        
                    })
                }
            })();

            return cloneOrg;
        },
        updateWatched(from, to) {
            if(!this.showWatch) return;

            var watchArr = this.watchCombine(this.watchedModel, [from, to]);
            this.watchedModel = watchArr;

            if(
                watchArr.length === 1 
                && Math.floor(watchArr[0][0]) === 0 
                && Math.floor(watchArr[0][1]) === Math.floor(this.info.duration)
            ) {
                this.userCompleteThisVideo = true;
            }
        },
    },
    mounted() {
        if (this.src) {
            this.$refs.video.src = this.src;

            this.attachEvents();
        }
    },
}
</script>

<style lang="scss" scoped>
    .video-player {
        position: relative;

        .video-con {
            background: black;
            overflow: hidden;

            video {
                width: 100%;
            }
        }
    }
</style>