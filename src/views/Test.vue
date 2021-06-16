<template>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item ref="name" label="Activity name" prop="name">
            <a-input v-model="form.name" @blur=" () => {$refs.name.onFieldBlur();}"/>
        </a-form-model-item>
        <a-form-model-item label="Activity zone" prop="region">
            <a-select v-model="form.region" placeholder="please select your zone">
                <a-select-option value="shanghai">
                    Zone one
                </a-select-option>
                <a-select-option value="beijing">
                    Zone two
                </a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item label="Activity form" prop="desc">
            <a-auto-complete
                v-model="form.desc"

                    placeholder="input here"
                    option-label-prop="value"
            >
                <template slot="dataSource">
                    <a-select-option v-for="opt in dataSource" :key="opt.title" :value="opt.title">
                        <span class="certain-search-item-count">{{ opt.title }} people</span>
                    </a-select-option>

                </template>
            </a-auto-complete>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">
                Create
            </a-button>
            <a-button style="margin-left: 10px;" @click="resetForm">
                Reset
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
const dataSource = [
    {title: 'Libraries', count: 10040, },
    {title: 'Solutions', count: 10800, },
    {title: 'Articles', count: 102200, },
];
export default {
    data() {
        return {
            dataSource,
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            other: '',
            form: {
                name: '',
                region: undefined,
                date1: undefined,
                delivery: false,
                type: [],
                resource: '',
                desc: 'ddddd',
            },
            rules: {
                name: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
                ],
                region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
                desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
            },
        };
    },
  created() {
      // this.form.desc = 'dddd'
  },
  methods: {
        onSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },
    },
};
</script>
