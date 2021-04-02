import moment from 'moment';
import { I_MapProductStatus } from '../types/common';

export const mapProductStatus: I_MapProductStatus = {
 
}; 

export const mapObjApprovalStatus = {

};

export const mapArrApprovalStatus = [

];

export const mapApplyType = {

};

export const mapArrApplyTime = [
  {
    name: '不限',
    key: '0',
    value: []
  },
  {
    name: '本周',
    key: '1',
    value: [moment().startOf('week').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  },
  {
    name: '本月',
    key: '2',
    value: [moment().startOf('month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  },
  {
    name: '近三个月',
    key: '3',
    value: [moment().subtract(3, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  },
  {
    name: '近半年',
    key: '4',
    value: [moment().subtract(6, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  },
  {
    name: '今年',
    key: '5',
    value: [moment().startOf('year').startOf('month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  }
];

export const mapPlatform: { [key: string]: string } = {

};

export const mallStatus = {

}; 

export const goodsTimeliness = {

}; 

export const payMap = {

}
export const ServiceStatus = {

}

export const ServiceType = {
 
}
export const ServiceMap = {
 
}
export const payModelList = [
 
]
export const payModelMap = {

}
export const accountTypeList = [
 
]
export const accountMap = {
  
}

export const HELP_URL = '';

export const areaIdDes = '';

export const groupIdDes = '';

export const appIdDes = ''

export const cpContentDes = '';
