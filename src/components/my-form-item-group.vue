<template>
    <div class="my-form-item-group">
        <div class="form-item-group_title" v-if="title">{{title}}</div>
        <div class="form-item-group_body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scope lang="scss">
@import '@css/var.scss';

$border-style:1px solid #E8E8E8;
$title-space:1em;
$title-line-height:32px;

.my-form-item-group{ width:100%;
    .form-item-group_title{ font-weight:bold; color:#606266; line-height:$title-line-height; padding:0 $title-space; border-bottom:$border-style; border-right:$border-style; background-color:$primaryColor1;
        &:before{content:'◆'; margin-right:calc($title-space / 2);}
    }
    .form-item-group_body{ display:flex; width:100%; flex-wrap:wrap; position:relative;
        &:after{content:''; display:block; width:0; height:100%; position:absolute; right:0; top:0; border-right:$border-style;}
    }
}
</style>
