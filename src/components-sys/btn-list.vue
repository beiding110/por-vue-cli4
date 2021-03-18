<template>
    <div class="btn-list">
        <btn-builder 
            :config="config" 
            :row="row" 
            :model="model" 
        ></btn-builder>

        <my-dialog 
        v-model="dialogVisible"
        :title="dialogTitle"
        >
            <component 
                v-if="dialogVisible" 
                :is="dialogComponent"
                @cancle="dialogClose"
                :row="row"
                :model="model"
            ></component>
        </my-dialog>
    </div>
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
        dialogVisible: false,
        dialogTitle: '',
        dialogComponent: 'span'
    }),
    computed: {

    },
    methods: {
        dialogOpen(component, title = '') {
            this.dialogComponent = component;
            this.dialogTitle = title;
            this.dialogVisible = true;
        },
        dialogClose() {
            this.dialogVisible = false;
        }
    }
}
</script>

<style>

</style>