<template>
  <div>
    <product-base-info
      @edit-product="handleEditProductModal(true, ...arguments)"
    />
    <div class="line-grey-16" />
    <product-base-list />
    <edit-product-modal
      v-if="editProductVisible"
      v-model:visible="editProductVisible"
      :modal-data="editProductData"
      @refresh="handleProductDetail"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref } from 'vue';
import { useProvideProductDetailData } from './hooks/detail';
import { useDetailEditProduct } from './hooks/detail/editProductModal';
import productBaseInfo from './components/detail/productBaseInfo.vue';
import productBaseList from './components/detail/productBaseList.vue';
import editProductModal from './components/modal/editProductModel.vue';
import { I_ProductDetail } from './types/detail/productDetail';

export default defineComponent({
  name: 'ProductDetail',
  components: {
    productBaseInfo,
    productBaseList,
    editProductModal
  },
  setup () {
    const { handleProductDetail, productInfo } = useProvideProductDetailData();

    handleProductDetail();

    const {
      editProductVisible,
      editProductData,
      handleEditProductModal
    } = useDetailEditProduct(productInfo as Ref<I_ProductDetail>);
    
    return {
      productInfo,
      editProductVisible,
      editProductData,
      handleProductDetail,
      handleEditProductModal
    }
  }
})
</script>

<style lang="scss" scoped>
 
</style>
