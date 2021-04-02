import { ref, watchEffect } from 'vue';
import { getSearchUsers, getSearchOrganization } from '@/apis/common';
import { I_Organization, I_User } from '@/config/types/common';
export interface I_searchUsersMap {
  [key: string]: string;
}

export const useSearchUsers = (delay?: number) => {

  const userKeywords = ref<string>('');

  const handleSearchUsers = (keywords: string) => {
    userKeywords.value = keywords;
  }

  const searchUserMap = ref<I_searchUsersMap>({});

  const searchUserList = ref<I_User[]>([]);

  const userLoading = ref<boolean>(false);

  let timer: ReturnType<typeof setTimeout>;

  const handleSearchUserDataMap = (data: I_searchUsersMap) => {
    searchUserMap.value = data || {};
  }

  const handleSearchUserDataList = (data: I_User[]) => {
    searchUserList.value = data;
  }

  const fetchSearchUserList = async (name: string) => {
    userLoading.value = true;
    const data: I_searchUsersMap = await getSearchUsers({ name }) as I_searchUsersMap;
    userLoading.value = false;
    handleSearchUserDataMap(data);
    handleSearchUserDataList(Object.keys(data).map((username: string) => ({ username, nickname: data[username] })));
  }

  watchEffect((onInvalidate) => {

    onInvalidate(() => {
      clearTimeout(timer);
      userLoading.value = false;
    })

    if (userKeywords.value) {
      timer = setTimeout(async () => {
        fetchSearchUserList(userKeywords.value);
      }, delay || 300)
    }
  })
  
  return {
    searchUserMap,
    searchUserList,
    userLoading,
    handleSearchUsers,
    fetchSearchUserList,
    handleSearchUserDataMap,
    handleSearchUserDataList
  }
}

export interface I_searchOrganizationMap {
  [key: string]: string;
}

export const useSearchOrganization = (delay?: number) => {

  const organizationKeywords = ref<string>('');

  const handleSearchOrganization = (keywords: string) => {
    organizationKeywords.value = keywords;
  }

  const searchOrganizationMap = ref<I_searchOrganizationMap>({});

  const searcOrganizationList = ref<I_Organization[]>([]);

  const organizationLoading = ref<boolean>(false);

  let timer: ReturnType<typeof setTimeout>;

  const handleSearchOrganizationDataList = (data: I_Organization[]) => {
    searcOrganizationList.value = data;
  }

  const handleSearchOrganizationDataMap = (data: I_searchOrganizationMap) => {
    searchOrganizationMap.value = data as I_searchOrganizationMap || {};
  }

  const fetchSearchOrganization = async (name: string) => {
    organizationLoading.value = true;
    const data: I_searchOrganizationMap = await getSearchOrganization({ name }) as I_searchOrganizationMap;
    organizationLoading.value = false;
    handleSearchOrganizationDataMap(data);
    handleSearchOrganizationDataList(Object.keys(data).map((id: string) => ({ id, name: data[id] })));
  }

  watchEffect((onInvalidate) => {

    onInvalidate(() => {
      clearTimeout(timer);
      organizationLoading.value = false;
    })

    if (organizationKeywords.value) {
      timer = setTimeout(async () => {
        fetchSearchOrganization(organizationKeywords.value);
      }, delay || 300)
    }
  })
  
  return {
    searchOrganizationMap,
    searcOrganizationList,
    organizationLoading,
    handleSearchOrganization,
    fetchSearchOrganization,
    handleSearchOrganizationDataMap,
    handleSearchOrganizationDataList
  }
}
