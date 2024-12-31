import axios from 'axios';

const consulRequest = axios.create({
  baseURL: '/consul',
});

/**
 * 获取指定key的值
 * @param {string} key 
 * @returns {Promise<Uint8Array|null>}
 */
export const kvGet = async (key) => {
  try {
    const response = await consulRequest.get(`/v1/kv/${key}?raw`, {
      responseType: 'arraybuffer'
    });
    if (response.data && response.data.byteLength > 0) {
      return new Uint8Array(response.data);
    }
    return null;
  } catch (error) {
    console.error('Failed to get key:', error);
    throw error;
  }
};

/**
 * 设置或更新key的值
 * @param {string} key 
 * @param {Uint8Array} value 
 * @returns {Promise<boolean>}
 */
export const kvPut = async (key, value) => {
  try {
    await consulRequest.put(`/v1/kv/${key}`, value, {
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      transformRequest: [(data) => data]
    });
    return true;
  } catch (error) {
    console.error('Failed to put key:', error);
    throw error;
  }
};

/**
 * 删除指定key
 * @param {string} key 
 * @returns {Promise<boolean>}
 */
export const kvDelete = async (key) => {
  try {
    await consulRequest.delete(`/v1/kv/${key}`);
    return true;
  } catch (error) {
    console.error('Failed to delete key:', error);
    throw error;
  }
};

/**
 * 列出指定前缀的所有key
 * @param {string} prefix 
 * @returns {Promise<Array<string>>}
 */
export const kvList = async (prefix = '') => {
  try {
    const response = await consulRequest.get(`/v1/kv/${prefix}`, {
      params: {
        keys: true
      }
    });
    return response.data || [];
  } catch (error) {
    console.error('Failed to list keys:', error);
    throw error;
  }
};