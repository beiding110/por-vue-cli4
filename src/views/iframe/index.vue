<template>
    <my-frame :src="src"></my-frame>
</template>

<script>
import FORM_MIXIN from '@views/mixins/form-page'

export default  {
    mixins: [FORM_MIXIN],

    data() {
        return {
            src: ''
        }
    },
    created() {
        var url = this.detailExtra.url,
            title = this.detailExtra.title;

        var query = clone(this.detailExtra);
        delete query.url;
        delete query.title;
        var search = toSearch(query);

        document.title = title;

        this.src = `${url}${search}`;
    }
}
</script>