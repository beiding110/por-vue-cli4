(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define() :
    (window.$_plat_config = factory());
}(this, (function () {

    var config = {
        title: 'porcupine',
        cnzz: {
            id: '1275340054',
            show: 'pic1'
        },
        api: {
            globalUrl: '',
            twUrl: '/pms/teamwork',
            sysUrl: '/pms',
            fileUrl: '/pms/sysfile',
        },
        i18n: {
            'zh-CN': {
                msg: {
                    success: '成功',
                    warning: '警告',
                    error: '错误',
                    info: '提示',
    
                    add_success: '添加成功',
                    edit_success: '修改成功',
                    del_success: '删除成功',
                    del_warning: '删除后无法撤销，确认删除操作？',
                },
                btn: {
                    edit: '编辑',
                    del: '删除',
                    detail: '详情',
                    new: '添加',
                    gdel: '批量删除',
                    search: '查询',
                },
            },
        },
    };

    return config;

})));