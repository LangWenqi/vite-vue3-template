<template>
  <div>
    <a-modal
      :visible="visible"
      title="申请权限"
      ok-text="确认"
      cancel-text="取消"
      @ok="onConfirm"
      @cancel="onCancel"
    >
      <a-form
        :label-col="formLabelCol"
        :wrapper-col="formWrapperCol"
      >
        <a-form-item label="产品名称">
          <span>{{modalData.product_name}}</span>
        </a-form-item>
        <a-form-item label="申请角色" v-bind="validateInfos.role_id">
          <a-select
            show-search
            class="width-per-100"
            v-model:value="formData.role_id"
            option-filter-prop="children"
            placeholder="请选择申请角色"
            allowClear
          >
            <a-select-option v-for="roleItem in role_product" :key="roleItem.id">
              {{ roleItem.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="申请理由">
          <a-textarea
            v-model:value="formData.apply_desc"
            placeholder="请输入申请理由"
            :auto-size="{ minRows: 2, maxRows: 5 }"
            allowClear
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { postApplyProdcut } from '@/apis/apply';
import { useApplyProductRules } from '../../hooks/modal/applyProduct';
import { I_ApplyProductParams, I_ApplyProductData } from '../../types/modal/applyProductModal';
import { useInject } from '@/inject';
import { commonSymbol } from '@/inject/constants';
// import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { formLabelCol, formWrapperCol } from '@/config/maps/layout';

export default defineComponent({
  name: 'ApplyProductModal',
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modalData: {
      type: Object as PropType<I_ApplyProductData>,
      defult: () => ({
        pro_id: 0,
        role_id: undefined,
        apply_desc: '',
        product_name: ''
      })
    }
  },
  setup (props, context) {
    const { commonState } = useInject(commonSymbol);

    const role_product = computed(() => (commonState.role_product));

    const { rules } = useApplyProductRules();

    const formData = reactive<I_ApplyProductParams>({
      pro_id: 0,
      role_id: undefined,
      apply_desc: ''
    })

    const initFormData = () => {
      Object.keys(formData).forEach((key: string) => {
        (formData as any)[key] = (props.modalData as any)[key];
      })
    }

    initFormData();

    const { resetFields, validate, validateInfos } = useForm(formData, rules);

    const onCancel = () => {
      resetFields();
      context.emit('update:visible', false);
    }
    
    const onConfirm = () => {
      validate().then(() => {
        const params = {
          pro_id: formData.pro_id,
          role_id: formData.role_id as number,
          apply_desc: formData.apply_desc
        }
        postApplyProdcut(params).then(() => {
          context.emit('refresh');
          onCancel();
        })
      });
    }

    return {
      formLabelCol,
      formWrapperCol,
      validateInfos,
      formData,
      onCancel,
      onConfirm,
      rules,
      role_product
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
