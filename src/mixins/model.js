export default {
    props: {
        value: {
            type: [String, Object],
            default: () => ({})
        }
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
}
