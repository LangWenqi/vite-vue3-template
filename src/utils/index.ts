
export function getHtmlData (str: string | undefined) {
  if (typeof str !== 'string') {
    return str;
  }
  const newStr = str.replace('<', '&lt;').replace('>', '&gt;').replace(/\n|\r\n/g, '<br>').replace(/\s/g, '&nbsp;');
  return newStr;
}
export function getDangerHtmlData (str: string | undefined) {
  if (typeof str !== 'string') {
    return str;
  }
  const newStr = str.replace(/\n|\r\n/g, '<br>');
  return newStr;
}
export function getHtmlText (str: string | undefined) {
  if (typeof str !== 'string') {
    return str;
  }
  const newStr = str.replace('<', '&lt;').replace('>', '&gt;').replace(/\s/g, '&nbsp;');
  return newStr;
}
export function getTextAreaData (str: string | undefined) {
  if (typeof str !== 'string') {
    return str;
  }
  const newStr = str.replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '');
  return newStr;
}
export function jsonFormat (json: any, space?: number) {
  if (isJsonString(json)) {
    json = JSON.parse(json)
  } else if (typeof json !== 'object') {
    return '';
  }
  return getHtmlData(JSON.stringify(json, null, space || 4));
}

/**
 * @description: 下载文件
 * @param { String } url  文件路径
 */
export function downLoadFile (url: string, name?: string) {
  const dom: any = document.createElement('a');
  dom.style.display = 'none';
  dom.href = url;
  document.body.appendChild(dom);
  dom.setAttribute('download', name || (new Date().getTime() + ''));
  dom.click();
  document.body.removeChild(dom);
}
export function isJsonString (str: string) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true;
    }
  } catch (e) {
  }
  return false;
}

export function dataURLtoFile (dataurl: string, filename: string = (new Date().getTime() + '.png')) {
  const arr: string[] = dataurl.split(',');
  const matchString: string = arr[0] || '';
  const matchStringMatch = matchString.match(/:(.*?);/)
  const mime = matchStringMatch ? (matchStringMatch as string[])[1] : '';
  if (mime) {
    const bstr = atob(arr[1]);
    let n: number = bstr.length;
    const u8arr: Uint8Array = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  } else {
    return ''
  }
}
export function getVideoCover (file: File, scale = 1) {
  let video: HTMLVideoElement | null = document.createElement('video');
  video.setAttribute('autoplay', 'true');
  video.setAttribute('crossOrigin', 'anonymous');
  video.setAttribute('x-webkit-airplay', 'allow');
  video.setAttribute('preload', 'auto');
  video.setAttribute('src', window.URL.createObjectURL(file));
  return new Promise((resolve) => {
    (video as HTMLVideoElement).onloadeddata = () => {
      let canvas: HTMLCanvasElement | null = document.createElement('canvas');
      (canvas as HTMLCanvasElement).width = (video as HTMLVideoElement).videoWidth * scale;
      (canvas as HTMLCanvasElement).height = (video as HTMLVideoElement).videoHeight * scale;
      const width = (video as HTMLVideoElement).videoWidth;
      const height = (video as HTMLVideoElement).videoHeight;
      ((canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D).drawImage((video as HTMLVideoElement), 0, 0, canvas.width, canvas.height);
      const base64Url = canvas.toDataURL('image/png');
      (video as HTMLVideoElement).pause()
      window.URL.revokeObjectURL((video as HTMLVideoElement).src);
      canvas = null;
      video = null;
      const img: File | string = dataURLtoFile(base64Url);
      const cover = img ? window.URL.createObjectURL(img) : ''
      resolve({ cover, img, width, height });
    };
  });
}
/**
 * 格式化文件大小, 输出成带单位的字符串
 * @param {Number} size 文件大小
 * @param {Number} [pointLength=2] 精确到的小数点数。
 * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。
 *    如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
 */
export function sizeFormat (size: number, pointLength?: number, units?: string[]) {
  let unit;
  units = units || ['B', 'K', 'M', 'G', 'TB'];
  unit = units.shift()
  while (size > 1024) {
    size = size / 1024;
    unit = units.shift();
  }
  return (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + (unit as string);
}

export function checkBrowser () {
  const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf('Opera') > -1; // 判断是否Opera浏览器
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera; // 判断是否IE浏览器
  const isEdge = userAgent.indexOf('Edge') > -1; // 判断是否IE的Edge浏览器
  const isFF = userAgent.indexOf('Firefox') > -1; // 判断是否Firefox浏览器
  const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1; // 判断是否Safari浏览器
  const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1; // 判断Chrome浏览器
  const brower: any = {
    isIE: false,
    isOpera: false,
    isEdge: false,
    isFF: false,
    isSafari: false,
    isChrome: false
  }
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp.$1);
    if (fIEVersion === 7) {
      return 'IE7';
    } else if (fIEVersion === 8) {
      return 'IE8';
    } else if (fIEVersion === 9) {
      return 'IE9';
    } else if (fIEVersion === 10) {
      return 'IE10';
    } else if (fIEVersion === 11) {
      return 'IE11';
    } else {
      return '0';
    } // IE版本过低
    brower.isIE = true;
    return brower;
  }
  if (isOpera) {
    brower.isOpera = true;
    return brower;
  }
  if (isEdge) {
    brower.isEdge = true;
    return brower;
  }
  if (isFF) {
    brower.isFF = true;
    return brower;
  }
  if (isSafari) {
    brower.isSafari = true;
    return brower;
  }
  if (isChrome) {
    brower.isChrome = true;
    return brower;
  }
}
export function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function guid () {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
export function checkURL (str: string) {
  const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  const objExp = new RegExp(Expression);
  if (objExp.test(str) === true) {
    return true
  } else {
    return false
  }
}

export function copyExec (value: string) {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return false;
  }
  const oInput = document.createElement('input');
  oInput.value = value;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand('Copy');
  oInput.style.display = 'none';
  document.body.removeChild(oInput);
  return true;
}
