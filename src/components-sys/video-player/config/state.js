export default {
    'paused': {
        btnHandler() {
            this.$emit('play');
        },
        stateWatcher() {
            this.hideLock = true;
            this.show();
        },
    },
    'stopped': {
        btnHandler() {
            this.$emit('play');
        },
        stateWatcher() {
            this.hideLock = true;
            this.show();
        },
    },
    'playing': {
        btnHandler() {
            this.$emit('pause');
        },
        stateWatcher() {
            this.hideLock = false;
            this.delayHide();
        },
    },
    'loading': {
        stateWatcher() {
            this.hideLock = true;
            this.show();
        },
    },
};