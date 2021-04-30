<template>
    <my-frame :src="src"></my-frame>
</template>

<script>
import FORM_MIXIN from '@views/mixins/form-page'

export default  {
    mixins: [FORM_MIXIN],

    data() {
        return {
            src: '',
            blackList: [
                'url',
                'hash',
                'title'
            ],
        }
    },
    created() {
        var url = this.detailExtra.url,
            hash = this.detailExtra.hash ? `#${this.detailExtra.hash}` : '',
            title = this.detailExtra.title;

        var query = clone(this.detailExtra);
        this.blackList.forEach(item => {
            delete query[item]
        });
        var search = toSearch(query);

        document.title = title;

        this.src = `${url}${hash}${search}`;
    }
}
</script>