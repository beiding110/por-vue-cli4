import Vue from 'vue'
(function (owner) {
    /**
     * 获取路由中参数
     * @param  {String} key 参数关键字
     * @return {String}     获取到的参数
     */
    owner.getRoute = function (key) {
        return this.$route.params[key];
    };
    owner.getQuery = function (key) {
        if (key) {
            return this.$route.query[key];
        } else {
            return this.$route.query;
        };
    };

    /**
     * 获取$store中的变量
     * @param  {key} key 变量关键字
     * @return {all}     获取到的变量
     */
    owner.getStore = function (key) {
        return this.$store.state[key] || false;
    };

    /**
     * 设定$store中的变量
     * @param  {Object} obj 变量的key、value集合
     * @return {null}     返回空
     */
    owner.setStore = function (key, value) {
        var obj = {};
        if (typeof (key) === 'string') {
            obj[key] = value;
        } else if (typeof (key) === 'object') {
            obj = key;
        }
        this.$store.commit('setState', obj)
    };

    /**
     * 获取$store.getters中的变量
     * @param  {key} key 变量关键字
     * @return {all}     获取到的变量
     */
    owner.getGetters = function (key) {
        return this.$store.getters[key] || false;
    };

    /**
     * 跳转（有历史记录）
     * @return {null} 无返回值
     */
    owner.goto = function () {
        this.$router.push.apply(this.$router, arguments);
    };

    /**
     * 跳转至frame页（有历史记录）
     * 并设置面包屑导航
     * @return {null} 无返回值
     */
     owner.gotoFrame = function ({title, url, ...query}) {
        const framePath = '/iframe';

        const queryRebuild = {
            title,
            url,
            ...query,
        };

        this.goto({
            path: framePath,
            query: queryRebuild
        });

        this.$store.commit('pushBread', {
            path: framePath,
            query: queryRebuild,
            title: title,
        });
    };

    /**
     * 参数是否存在
     * @param  {String} e 参数名
     * @return {Boolean}   是否存在
     */
    owner.inAttr = function (e) {
        return inAttr(e);
    };

    /**
     * 切除日期中的时分秒
     * @param  {String} e 日期字符串
     * @return {String}   切分后的年月日
     */
    owner.timeToDate = function (e) {
        return timeToDate(e);
    };

    /**
    * 生成表单校验规则
    * @return {Object} 生成的校验规则
    */
    owner.newRule = function () {
        let arg = [], rules = [];
        arg = Array.prototype.slice.apply(arguments);
        let label = arg.splice(0, 1),
            changeState = false;

        const typeMap = {
            string: '字符串',
            number: '数字',
            boolean: '布尔',
            method: '方法',
            regexp: '正则',
            integer: 'integer',
            float: '浮点数',
            array: '数组',
            object: '对象',
            enum: 'enum',
            date: '日期',
            url: 'url地址',
            hex: '哈希',
            email: '电子邮件',
            // ucc: '社会统一信用代码',
        }

        arg.forEach(function (item) {
            if (item === 'change') {
                changeState = true;
            }

            if (item === 'required') {
                rules.push.apply(rules, [{
                    required: true,
                    message: '请输入' + label,
                    trigger: ['blur']
                }, {
                    validator(rules, value, callback) {
                        if (typeof value === 'string') {
                            if (!value.replace(/^\s+|\s+$/g, "")) {
                                return callback(new Error('内容不能为空格'))
                            }
                        }
                        callback();
                    },
                    trigger: ['blur']
                }])
            };

            if (/min/.test(item)) {
                let length = item.split('min')[1];
                rules.push({
                    min: parseInt(length),
                    message: '至少输入' + length + '个字符',
                    trigger: 'blur'
                });
            };

            if (/max/.test(item)) {
                let length = item.split('max')[1];
                rules.push({
                    max: parseInt(length),
                    message: '至多输入' + length + '个字符',
                    trigger: ['blur']
                });
            };

            if (item === 'mobile') {
                rules.push({
                    validator(rules, value, callback) {
                        if (!/^[1][0-9]{10}$/.test(value)) {
                            return callback(new Error('手机号格式错误'));
                        }
                        callback();
                    },
                    trigger: ['blur']
                })
            };

            if (item === 'ucc') {
                rules.push({
                    validator(rules, value, callback) {
                        var patrn = /^[0-9A-Z]+$/;

                        if ((value.length != 18) || !patrn.test(value)) {
                            return callback(new Error('不是有效的统一社会信用编码'));
                        } else {
                            var Ancode;//统一社会信用代码的每一个值
                            var Ancodevalue;//统一社会信用代码每一个值的权重 
                            var total = 0;
                            var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子 
                            var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';

                            //不用I、O、S、V、Z 
                            for (var i = 0; i < value.length - 1; i++) {
                                Ancode = value.substring(i, i + 1);
                                Ancodevalue = str.indexOf(Ancode);
                                total = total + Ancodevalue * weightedfactors[i];
                                //权重与加权因子相乘之和 
                            }
                            var logiccheckcode = 31 - total % 31;
                            if (logiccheckcode == 31) {
                                logiccheckcode = 0;
                            }
                            var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
                            var Array_Str = Str.split(',');
                            logiccheckcode = Array_Str[logiccheckcode];


                            var checkcode = value.substring(17, 18);
                            if (logiccheckcode != checkcode) {
                                return callback(new Error('不是有效的统一社会信用编码'));
                            };
                        };

                        callback();
                    },
                    trigger: ['blur', 'change']
                })
            };

            Object.keys(typeMap).forEach(function (key, index) {
                if (item === key) {
                    rules.push({
                        type: key,
                        message: '请输入正确的' + typeMap[key] + '格式',
                        trigger: ['blur']
                    })
                }
            });
        });

        if (changeState) {
            rules.forEach((item) => {
                item.trigger.push('change');
            })
        }

        return rules
    }

})(Vue.prototype)
