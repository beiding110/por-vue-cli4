<template>
    <my-tag :type="item.type" @click="item.click" class="state-list">{{item.text}}</my-tag>
</template>

<script>

export default {
    components: {},
    props: {
        row: {
            type: Object,
            default: () => ({})
        },
        config: {
            type: Array,
            default: () => ([])
        }
    },
    data: () => ({
        
    }),
    computed: {
        item() {
            return this.config.filter(item => {
                return item.show(this.row);
            }).map(item => ({
                type: item.type,
                text: getType(item.text) === 'function' ? item.text(this.row) : item.text,
                click: getType(item.click) === 'function' ? item.click.bind(this) : () => {}
            }))[0] || {
                type: 'info',
                text: '无',
                click: ()=>{}
            };
        }
    },
    methods: {
        
    }
}
</script>

<style scoped lang="scss">
.state-list{cursor:pointer;}
</style>
