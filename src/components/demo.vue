<template>
  <div>
    <v-input v-model:value="setComText" />
    <a-input v-model:value="text"></a-input>
    <div>{{comText}}</div>
    <div>{{msg}}</div> 
    <div>timestep{{timestep}}</div> 
    <div>commonData.timestep{{commonData.timestep}}</div> 
    <div @click="changeObj">{{obj.a.d}}sd</div>
    <div @click="changeReObj">{{reObj.n}}re</div>
    <div @click="handleAlert">alert</div>
    <div @click="changeView('/about')">about</div>
  </div>
</template>
<script lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { DISPATCH_TIME_STEP, COMMIT_TIME_STEP, GET_TIME_STEP } from '@/store/common/constants';
import { defineComponent, ref, computed, reactive, toRefs, getCurrentInstance } from 'vue'
import { Input } from 'ant-design-vue';

export default defineComponent({
  name: 'HelloWorld',
  components: {
    vInput: Input
  },
  props: {
    msg: String
  },
  setup (props: any, content: any) {
    const { ctx } = getCurrentInstance() as any;
    const store = useStore();
    console.log('content', content)
    console.log('ctx', ctx)
    const text = ref<string>('aaaa')
    const obj = ref<any>({ a: { b: 'bbb' } })
    console.log(obj.value.a)
    console.log(props)
    const reObj = reactive<any>({
      m: 1
    })
    const changeReObj = () => {
      reObj.n = 'nnnn';
    }
    const route = useRoute();
    const router = useRouter();
    const comText = computed(() => 'computed' + text.value)
    const setComText = computed({
      get: () => 'getcomputed' + text.value,
      set: (val) => {
        text.value = 'set:' + val;
      }
    })

    console.log('route', route.path);
    console.log('ctxRoute', ctx.$router.currentRoute.value);
    console.log('store', store)
    console.log('ctxStore', ctx.$store)
    
    // const timestep = computed(() => store.state.common.timestep);
    const commonData = computed(() => store.state.common);

    const changeView = (path: string) => {
      router.push({ path })
    }
    const handleAlert = () => {
      store.dispatch(DISPATCH_TIME_STEP, new Date().getTime()).then((timestep: number) => {
        console.log('promise:', timestep)
      })
      console.log('storegetters', store.getters[GET_TIME_STEP])
      store.commit(COMMIT_TIME_STEP, new Date().getTime())
      console.log('reObj', reObj)
      console.log('storegetters', store.getters[GET_TIME_STEP])
      console.log('storeState', store.state.common.timestep)
      console.log('ctxstoreState', ctx.$store.state.common.timestep)
      console.log('toRefs', toRefs(store.state.common))
      // content.emit('test', 'testemit')
      // ctx.$emit('test', 'test$emit')
      // ctx.$message.success('success')
    }
    const changeObj = () => {
      obj.value.a.d = 'ddd'
    }

    return {
      text,
      comText,
      setComText,
      changeView,
      handleAlert,
      obj,
      changeObj,
      reObj,
      changeReObj,
      ...toRefs(store.state.common),
      // timestep,
      commonData
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
