<template>
    <div class="form-page">
        <my-form
            table
            ref="form"
            v-model="form"
            @cancel="cancelHandler"
            :detail-extra="detailExtra"
        >
            <my-form-item-group title="组1">
                <el-form-item
                    label="输入"
                    prop="input"
                    :rules="newRule('输入' ,'required')"
                >
                    <el-input v-model="form.input"></el-input>
                </el-form-item>

                <el-form-item
                    label="数字"
                    prop="number"
                    :rules="newRule('数字' ,'required')"
                >
                    <el-input-number
                        style="width: 100%"
                        v-model="form.number"
                        controls-position="right"
                        :min="1"
                        :max="10"
                    ></el-input-number>
                </el-form-item>

                <el-form-item
                    label="单选"
                    prop="radio"
                    :rules="newRule('单选' ,'required')"
                >
                    <el-radio-group v-model="form.radio">
                        <el-radio :label="3">备选项</el-radio>
                        <el-radio :label="6">备选项</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item
                    label="多选"
                    prop="checkbox"
                    :rules="newRule('多选' ,'required')"
                >
                    <el-checkbox-group v-model="form.checkbox">
                        <el-checkbox label="复选框 A"></el-checkbox>
                        <el-checkbox label="复选框 B"></el-checkbox>
                        <el-checkbox label="复选框 C"></el-checkbox>
                        <el-checkbox label="复选框 B"></el-checkbox>
                        <el-checkbox label="复选框 C"></el-checkbox>
                        <el-checkbox label="复选框 B"></el-checkbox>
                        <el-checkbox label="复选框 C"></el-checkbox>
                        <el-checkbox label="复选框 B"></el-checkbox>
                        <el-checkbox label="复选框 C"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item
                    label="下拉选择"
                    prop="select"
                    :rules="newRule('下拉选择' ,'required')"
                >
                    <el-select
                        v-model="form.select"
                        clearable
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item
                    label="级联"
                    prop="cascader"
                    :rules="newRule('级联' ,'required')"
                >
                    <el-cascader
                        style="width: 100%"
                        v-model="form.cascader"
                        :options="coptions"
                    ></el-cascader>
                </el-form-item>

                <el-form-item
                    class="table-full-row"
                    label="文本框"
                    prop="gz_content"
                    :rules="newRule('文本框' ,'required')"
                >
                    <el-input
                        type="textarea"
                        v-model="form.gz_content"
                    ></el-input>
                </el-form-item>
            </my-form-item-group>

            <my-form-item-group title="组2">
                <el-form-item
                    label="开关"
                    prop="switch"
                    :rules="newRule('开关' ,'required')"
                >
                    <el-switch
                        v-model="form.switch"
                        active-text="按月付费"
                        inactive-text="按年付费"
                    >
                    </el-switch>
                </el-form-item>

                <el-form-item
                    label="日期"
                    prop="datepicker"
                    :rules="newRule('日期' ,'required')"
                >
                    <el-date-picker
                        v-model="form.datepicker"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item
                    class="table-full-row"
                    label="日期范围"
                    prop="daterange"
                    :rules="newRule('日期范围' ,'required')"
                >
                    <el-date-picker
                        v-model="form.daterange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item
                    class="table-full-row"
                    label="评分"
                    prop="rate"
                    :rules="newRule('评分' ,'required')"
                >
                    <el-rate
                        v-model="form.rate"
                        allow-half
                    ></el-rate>
                </el-form-item>
            </my-form-item-group>

            <my-form-item-group title="附件">
                <el-form-item
                    label="附件"
                    prop="fileguid"
                    class="table-full-row"
                >
                    <my-upload
                        :fileguid="form.fileguid"
                        file-type=".doc,.xls"
                    ></my-upload>
                </el-form-item>

                <el-form-item
                    label="附件"
                    prop="yzlx"
                    class="table-full-row"
                >
                    <my-upload-s :fileguid="form.fileguid"></my-upload-s>
                </el-form-item>
            </my-form-item-group>

            <my-form-item-group title="富文本">
                <el-form-item
                    label="tinymce"
                    prop="tinymce"
                    class="table-full-row"
                >
                    <tinymce v-model="form.tinymce"></tinymce>
                </el-form-item>
            </my-form-item-group>
        </my-form>
    </div>
</template>

<script>
import FORM_PAGE_MIXIN from '@mixins/form-page';

export default {
    mixins: [FORM_PAGE_MIXIN],
    data: () => ({
        form: {
            input: '',
            radio: '',
            checkbox: [],
            number: 0,
            select: '',
            cascader: [],

            switch: true,
            datepicker: '',
            daterange: [],
            rate: 0,

            tinymce: '',
            tinymce2: '',
        },

        options: [
            {
                value: '选项1',
                label: '黄金糕',
            },
            {
                value: '选项2',
                label: '双皮奶',
            },
            {
                value: '选项3',
                label: '蚵仔煎',
            },
            {
                value: '选项4',
                label: '龙须面',
            },
            {
                value: '选项5',
                label: '北京烤鸭',
            },
        ],

        coptions: [
            {
                value: 'zhinan',
                label: '指南',
                children: [
                    {
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [
                            {
                                value: 'yizhi',
                                label: '一致',
                            },
                            {
                                value: 'fankui',
                                label: '反馈',
                            },
                            {
                                value: 'xiaolv',
                                label: '效率',
                            },
                            {
                                value: 'kekong',
                                label: '可控',
                            },
                        ],
                    },
                    {
                        value: 'daohang',
                        label: '导航',
                        children: [
                            {
                                value: 'cexiangdaohang',
                                label: '侧向导航',
                            },
                            {
                                value: 'dingbudaohang',
                                label: '顶部导航',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'zujian',
                label: '组件',
                children: [
                    {
                        value: 'basic',
                        label: 'Basic',
                        children: [
                            {
                                value: 'layout',
                                label: 'Layout 布局',
                            },
                            {
                                value: 'color',
                                label: 'Color 色彩',
                            },
                            {
                                value: 'typography',
                                label: 'Typography 字体',
                            },
                            {
                                value: 'icon',
                                label: 'Icon 图标',
                            },
                            {
                                value: 'button',
                                label: 'Button 按钮',
                            },
                        ],
                    },
                    {
                        value: 'form',
                        label: 'Form',
                        children: [
                            {
                                value: 'radio',
                                label: 'Radio 单选框',
                            },
                            {
                                value: 'checkbox',
                                label: 'Checkbox 多选框',
                            },
                            {
                                value: 'input',
                                label: 'Input 输入框',
                            },
                            {
                                value: 'input-number',
                                label: 'InputNumber 计数器',
                            },
                            {
                                value: 'select',
                                label: 'Select 选择器',
                            },
                            {
                                value: 'cascader',
                                label: 'Cascader 级联选择器',
                            },
                            {
                                value: 'switch',
                                label: 'Switch 开关',
                            },
                            {
                                value: 'slider',
                                label: 'Slider 滑块',
                            },
                            {
                                value: 'time-picker',
                                label: 'TimePicker 时间选择器',
                            },
                            {
                                value: 'date-picker',
                                label: 'DatePicker 日期选择器',
                            },
                            {
                                value: 'datetime-picker',
                                label: 'DateTimePicker 日期时间选择器',
                            },
                            {
                                value: 'upload',
                                label: 'Upload 上传',
                            },
                            {
                                value: 'rate',
                                label: 'Rate 评分',
                            },
                            {
                                value: 'form',
                                label: 'Form 表单',
                            },
                        ],
                    },
                    {
                        value: 'data',
                        label: 'Data',
                        children: [
                            {
                                value: 'table',
                                label: 'Table 表格',
                            },
                            {
                                value: 'tag',
                                label: 'Tag 标签',
                            },
                            {
                                value: 'progress',
                                label: 'Progress 进度条',
                            },
                            {
                                value: 'tree',
                                label: 'Tree 树形控件',
                            },
                            {
                                value: 'pagination',
                                label: 'Pagination 分页',
                            },
                            {
                                value: 'badge',
                                label: 'Badge 标记',
                            },
                        ],
                    },
                    {
                        value: 'notice',
                        label: 'Notice',
                        children: [
                            {
                                value: 'alert',
                                label: 'Alert 警告',
                            },
                            {
                                value: 'loading',
                                label: 'Loading 加载',
                            },
                            {
                                value: 'message',
                                label: 'Message 消息提示',
                            },
                            {
                                value: 'message-box',
                                label: 'MessageBox 弹框',
                            },
                            {
                                value: 'notification',
                                label: 'Notification 通知',
                            },
                        ],
                    },
                    {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [
                            {
                                value: 'menu',
                                label: 'NavMenu 导航菜单',
                            },
                            {
                                value: 'tabs',
                                label: 'Tabs 标签页',
                            },
                            {
                                value: 'breadcrumb',
                                label: 'Breadcrumb 面包屑',
                            },
                            {
                                value: 'dropdown',
                                label: 'Dropdown 下拉菜单',
                            },
                            {
                                value: 'steps',
                                label: 'Steps 步骤条',
                            },
                        ],
                    },
                    {
                        value: 'others',
                        label: 'Others',
                        children: [
                            {
                                value: 'dialog',
                                label: 'Dialog 对话框',
                            },
                            {
                                value: 'tooltip',
                                label: 'Tooltip 文字提示',
                            },
                            {
                                value: 'popover',
                                label: 'Popover 弹出框',
                            },
                            {
                                value: 'card',
                                label: 'Card 卡片',
                            },
                            {
                                value: 'carousel',
                                label: 'Carousel 走马灯',
                            },
                            {
                                value: 'collapse',
                                label: 'Collapse 折叠面板',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'ziyuan',
                label: '资源',
                children: [
                    {
                        value: 'axure',
                        label: 'Axure Components',
                    },
                    {
                        value: 'sketch',
                        label: 'Sketch Templates',
                    },
                    {
                        value: 'jiaohu',
                        label: '组件交互文档',
                    },
                ],
            },
        ],
    }),
    computed: {
        detailExtra() {
            return {
                rowguid: this.getQuery('rowguid'),
            };
        },
    },
    methods: {
        saveHandler(type, cb) {
            cb && cb();
        },
        beforeSend(send, deny) {
            send();
        },
        cancelHandler() {
            this.$router.go(-1);
        },
    },
    created() {},
};
</script>

<style scoped lang="scss">
</style>
