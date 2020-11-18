<template>
    <span class="btn-builder">
        <template v-for="(item, index) in btnList">
            <component
            :key="index"
            :is="item.tag"
            :type="item.type"
            @click="item.click"
            >
                {{item.text}}
            </component>
        </template>
    </span>
</template>

<script>

export default {
    components: { },
    props: {
        row: {
            type: Object,
            default: () => ({})
        },
        model: {
            type: Object,
            default: () => ({})
        },
        config: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({

    }),
    computed: {
        btnList() {
            var that = this.$parent || this;

            var row = this.row,
                model = this.model;

            return this.config.filter(item => {
                return item.show(this.row, this.model);
            }).map(item => ({
                text: getType(item.text) === 'function' ? item.text(this.row) : item.text,
                type: item.type,
                tag: item.tag,
                click() {
                    if(item.click) {
                        item.click.call(that, row, model);
                    };
                }
            }));
        }
    },
    methods: {

    }
}
</script>

<style>

</style>
