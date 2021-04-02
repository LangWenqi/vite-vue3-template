<template>
  <div>
    <a-modal
      :visible="visible"
      :title="modalTitle"
      ok-text="确认"
      cancel-text="取消"
      @ok="onConfirm"
      @cancel="onCancel"
    >
      <a-form
        :label-col="formLabelCol"
        :wrapper-col="formWrapperCol"
      >
        <a-form-item label="产品图标" v-bind="validateInfos.icon">
          <a-upload
            name="data"
            :action="uploadUrl"
            list-type="picture-card"
            :show-upload-list="false"
            @change="handleChangeFile"
            @beforeUpload="beforeUpload"
          >
            <div class="upload-img" v-if="formData.icon && !fileLoading">
              <img :src="formData.icon">
            </div>
            <div v-else>
              <LoadingOutlined v-if="fileLoading"/>
              <PlusOutlined v-else/>
              <div>{{fileLoading ? '图片上传中' : '上传图片'}}</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="产品名称" v-bind="validateInfos.name">
          <a-input v-model:value="formData.name" allowClear placeholder="请输入产品名称"></a-input>
        </a-form-item>
        <a-form-item label="产品简介">
          <a-textarea
            v-model:value="formData.description"
            placeholder="请输入产品简介"
            :auto-size="{ minRows: 2, maxRows: 5 }"
            allowClear
          />
        </a-form-item>
        <a-form-item label="所属组织" v-bind="validateInfos.organization">
          <a-select
            show-search
            class="width-per-100"
            :value="getOrganizationValue"
            label-in-value
            allowClear
            placeholder="请选择所属组织"
            :filter-option="false"
            :default-active-first-option="false"
            :not-found-content="organizationLoading ? undefined : null"
            @search="handleSearchOrganization"
            @change="handleChangeOrganization"
          >
            <template v-if="organizationLoading" v-slot:notFoundContent>
              <a-spin size="small" />
            </template>
            <a-select-option v-for="organizationItem in searcOrganizationList" :key="organizationItem.id">
              {{ organizationItem.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="产品管理员" v-bind="validateInfos.product_admin">
          <a-select
            class="select-width"
            mode="multiple"
            show-search
            v-model:value="formData.product_admin"
            placeholder="请选择管理员"
            :filter-option="false"
            :not-found-content="userLoading ? undefined : null"
            @search="handleSearchUsers"
            allowClear
          >
            <template v-if="userLoading" v-slot:notFoundContent>
              <a-spin size="small" />
            </template>
            <a-select-option v-for="searchUserItem in searchUserList" :key="searchUserItem.username">
              {{ searchUserItem.nickname }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { useEditProductRules } from '../../hooks/modal/editProduct';
import { I_EditProductParams, I_EditProductData } from '../../types/modal/editProductModal';
import { useInject } from '@/inject';
import { commonSymbol } from '@/inject/constants';
import { useSearchUsers, useSearchOrganization } from '@/config/hooks/common';
import { editProduct, addProduct } from '@/apis/product';
import { uploadUrl } from '@/apis/file/upload';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { formLabelCol, formWrapperCol } from '@/config/maps/layout';
import { I_Organization } from '@/config/types/common';
import { useSingleUpload } from '@/config/hooks/upload';
import { deepClone } from '@/utils/object';

export default defineComponent({
  name: 'EditProductModal',
  components: {
    PlusOutlined,
    LoadingOutlined
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modalData: {
      type: Object as PropType<I_EditProductData>,
      defult: () => ({
        icon: '',
        name: '',
        organization: undefined,
        product_admin: [],
        product_id: undefined,
        description: '',
        adminList: [],
        organizationList: []
      })
    }
  },
  setup (props, context) {

    const { commonState } = useInject(commonSymbol);
    const username = computed<string>(() => commonState.basicInfo.user.username);
    const nickname = computed<string>(() => commonState.basicInfo.user.name);

    const { handleSearchUsers, userLoading, searchUserList, handleSearchUserDataList } = useSearchUsers();
    const { searcOrganizationList, organizationLoading, handleSearchOrganization, handleSearchOrganizationDataList } = useSearchOrganization();

    const { rules } = useEditProductRules();

    const formData = reactive<I_EditProductParams>({
      icon: '',
      name: '',
      organization: undefined,
      product_admin: [],
      product_id: undefined,
      description: ''
    })

    const getOrganizationValue = computed(() => (formData.organization ? {
      key: formData.organization.id
    } : undefined));

    const handleChangeOrganization = (value: { key: string; label: string } | undefined) => {
      formData.organization = value ? {
        id: value.key,
        name: value.label
      } : undefined;
    };
    
    const productId = computed<number | undefined>(() => (props.modalData as I_EditProductData).product_id);

    const modalTitle = computed<string>(() => productId.value ? '编辑产品' : '申请创建产品');

    const initFormData = () => {
      Object.keys(formData).forEach((key: string) => {
        (formData as any)[key] = deepClone((props.modalData as any)[key])
      });
      if (!productId.value) {
        formData.product_admin = [username.value];
      }
    }

    initFormData();
    handleSearchUserDataList(productId.value ? (props.modalData as I_EditProductData).adminList : [{ username: username.value, nickname: nickname.value }]);
    handleSearchOrganizationDataList((props.modalData as I_EditProductData).organizationList);

    const setIcon = (url: string) => {
      formData.icon = url;
    }

    const {
      beforeUpload,
      fileLoading,
      handleChangeFile
    } = useSingleUpload(setIcon);

    const { resetFields, validate, validateInfos } = useForm(formData, rules);

    const onCancel = () => {
      resetFields();
      context.emit('update:visible', false);
    }
    
    const onConfirm = () => {
      validate().then(async () => {
        const requestFuc = productId.value ? editProduct : addProduct;
        const params = {
          ...formData,
          organization: formData.organization as I_Organization
        }
        requestFuc(params).then(() => {
          context.emit('refresh');
          onCancel();
        })
      });
    }
    
    return {
      uploadUrl,
      formLabelCol,
      formWrapperCol,
      validateInfos,
      modalTitle,
      formData,
      onCancel,
      onConfirm,
      rules,
      handleSearchUsers,
      userLoading,
      searchUserList,
      searcOrganizationList,
      organizationLoading,
      handleSearchOrganization,
      beforeUpload,
      handleChangeFile,
      fileLoading,
      getOrganizationValue,
      handleChangeOrganization
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
