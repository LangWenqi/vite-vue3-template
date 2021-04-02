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
            v-model:value="formData.organization"
            placeholder="请选择所属组织"
            :filter-option="false"
            :default-active-first-option="true"
            :not-found-content="organizationLoading ? undefined : null"
            @search="handleSearchOrganization"
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
import { useEditAppRules } from '../../hooks/modal/editAppModal';
import { I_EditAppParams, I_EditAppData } from '../../types/modal/editAppModal';
import { editApp } from '@/apis/app';
import { uploadUrl } from '@/apis/file/upload';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { formLabelCol, formWrapperCol } from '@/config/maps/layout';
import { useSingleUpload } from '@/config/hooks/upload';
import { deepClone } from '@/utils/object';
import { accountMap } from '@/config/maps/common';
import { I_Prop_Product } from '@/config/types/product';

export default defineComponent({
  name: 'EditAppModal',
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
      type: Object as PropType<I_EditAppData>,
      defult: () => ({
        app_id: undefined,
        game_type: accountMap.pt33,
        area_ids: [],
        name: '',
        icon: '',
        areas: []
      })
    },
    productData: {
      type: Object as PropType<I_Prop_Product>
    }
  },
  setup (props, context) {

    const { rules } = useEditAppRules();

    const formData = reactive<I_EditAppParams>({
      app_id: undefined,
      game_type: accountMap.pt33,
      area_ids: [],
      name: '',
      icon: ''
    })
    const productId = computed<number | undefined>(() => (props.modalData as I_EditProductData).product_id);

    const modalTitle = computed<string>(() => productId.value ? '编辑产品' : '申请创建产品');

    const initFormData = () => {
      Object.keys(formData).forEach((key: string) => {
        (formData as any)[key] = deepClone((props.modalData as any)[key]);
      });
    }

    initFormData();
  
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
        const params = {
          ...formData,
          product_id: props
        }
        editApp(params).then(() => {
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
      fileLoading
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
