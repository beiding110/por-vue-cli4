<template>
    <el-card 
    header="my-form"
    >
        <my-form
        v-model="form"
        :submit-url="'http://www.baidu.com'"
        :detail-url="'http://www.baidu.com'"
        >
            <el-form-item 
            label="姓名"
            prop="name"
            >
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item 
            label="年龄"
            prop="age"
            >
                <el-input v-model="form.age"></el-input>
            </el-form-item>

            <el-form-item 
            label="班级"
            prop="class"
            >
                <el-input v-model="form.class"></el-input>
            </el-form-item>
        </my-form>

        <my-form 
        v-model="form"
        table
        @submit="submitHandler"
        >
            <my-form-item-group title="这是一组form-item">
                <el-form-item 
                label="姓名"
                prop="name"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item 
                label="年龄"
                prop="age"
                >
                    <el-input v-model="form.age"></el-input>
                </el-form-item>
            </my-form-item-group>

            <my-form-item-group title="班级信息">
                <el-form-item 
                label="班级"
                prop="class"
                >
                    <el-input v-model="form.class"></el-input>
                </el-form-item>
            </my-form-item-group>
        </my-form>
    </el-card>
</template>

<script>
export default {
    props: [],
    data () {
        return {
            form: {
                name: '',
                age: 0,

                class: ''
            }
        }
    },
    methods: {
        submitHandler() {
            //若不使用submit-url则使用submit事件提交；
            this.$post('', this.form, data => {
                //完成提交
            });
        }
    },
    mounted: function() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
