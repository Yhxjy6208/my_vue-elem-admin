import { ElButton, ElSwitch, ElForm, ElFormItem, ElInput, ElMessage } from "element-plus";

export default (app) => {
    app.use(ElButton);
    app.use(ElSwitch);
    app.use(ElForm);
    app.use(ElFormItem);
    app.use(ElInput);
    app.use(ElMessage);
}