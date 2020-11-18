export default {
    props: {
        '2way': {
            type: String
        },
    },
    methods: {
        twoWayHandler(row) {
            if(this['2way']) {
                var modelArr = this['2way'].split(',');
                modelArr.forEach(function(key) {
                    this.$emit('update:' + key, row[key])
                }.bind(this));
            };
        }
    }
}