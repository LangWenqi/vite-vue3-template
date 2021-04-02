import { ref } from 'vue';
import { message } from 'ant-design-vue';

export const useSingleUpload = (cb: (url: string) => void) => {

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传类型JPG/PNG的图片!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传图片大小不能超过2MB');
      return false;
    }
    return true;
  }

  const fileLoading = ref<boolean>(false);

  const handleChangeFile = (info: any) => {
    if (info.file.status === 'error') {
      fileLoading.value = false;
      message.error('上传图标出错！');
      return;
    }
    if (info.file.status === 'uploading') {
      fileLoading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      fileLoading.value = false;
      if (info.file.response) {
        message.success('上传成功！');
      } else {
        message.error('上传图标出错！');
      }
      if (cb) {
        cb(info.file.response.url || info.file.thumbUrl || '');
      }
    }
  }

  return {
    beforeUpload,
    fileLoading,
    handleChangeFile
  }
}
