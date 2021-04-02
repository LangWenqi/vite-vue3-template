import axios from 'axios';
import qs from 'qs';
import { BASE_URL } from '@/utils/variable';
import { message } from 'ant-design-vue';
axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  if (response.headers && (Number(response.headers['x-genesis-login']) === 1)) {
    window.location.href = response.data;
  }
  if (response.headers && (Number(response.headers['x-error-code']) === 0 || response.headers['x-error-code'] === undefined)) {
    return response.data;
  } else if ((response.headers && Number(response.headers['x-error-code']) === 302)) {
    window.location.href = response.data;
  } else if ((response.headers && Number(response.headers['x-error-code']) === 401)) {
  } else if ((response.headers && Number(response.headers['x-error-code']) === 1024 && response.data)) {
    message.error(response.data);
    return Promise.reject(response.data);
  } else {
    const data = response.data;
    return Promise.reject(data);
  }
}, (error) => {
  if (error.response && error.response.status === 401 && Number(error.response.headers['x-genesis-login']) === 1) {
    window.location.href = '/api/login';
  }
  if (error.response && error.response.status === 403) {
    error.message = '无操作权限';
  }
  return Promise.reject(error.message || '程序出错!');
});

interface I_Params {
  [key: string]: any;
}

interface I_Config {
  [key: string]: any;
}
function Http ({
  url = '',
  data = {},
  method = 'get',
  type = 'json',
  fullPath = false,
  responseType = 'json',
  showMessage = true
}: I_Params) {
  const fullUrl = fullPath ? url : BASE_URL + url;
  const config: I_Config = {
    method,
    url: fullUrl,
    responseType
  };
  config.headers = {
    'X-Requested-With': 'XMLHttpRequest'
  };
  if (method === 'get' || method === 'GET') {
    Object.assign(config, {
      params: data
    });
  } else {
    if (type === 'form') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      Object.assign(config, {
        data: qs.stringify(data)
      });
    } else if (type === 'json') {
      config.headers['Content-Type'] = 'application/json';
      Object.assign(config, {
        data
      });
    } else if (type === 'formData') {
      const formData = new FormData();
      Object.keys(data).forEach((key: string): void => {
        formData.append(key, data[key]);
      });
      config.headers['Content-Type'] = 'multipart/form-data';
      Object.assign(config, {
        data: formData
      });
    } else if (type === 'oss') {
      config.headers['Content-Type'] = data.type;
      Object.assign(config, {
        data
      });
    }
  }
  return new Promise((resolve, reject) => {
    axios(config).then((response: any) => {
      if (response.code !== 0 && response.code !== 401 && response.code !== 403 && showMessage && response.message) {
        message.error({ content: response.message, key: response.message });
      }
      resolve(response);
    }, (error) => {
      reject(error);
    }).catch((error) => {
      reject(error);
    });
  });
}
export default Http;
