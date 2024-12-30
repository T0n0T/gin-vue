import axios from 'axios';
import { API_CONFIG } from '../config';

const consulRequest = axios.create({
  baseURL: '/consul',
  timeout: 5000
});

/**
 * 获取指定key的值
 * @param {string} key 
 * @returns {Promise<Uint8Array|null>}
 */
export const kvGet = async (key) => {
  try {
    const response = await consulRequest.get(`/v1/kv/${key}`);
    if (response.data && response.data.length > 0) {
      const base64Data = response.data[0].Value;
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
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
    const binaryString = String.fromCharCode(...value);
    const base64Value = btoa(binaryString);
    await consulRequest.put(`/v1/kv/${key}`, base64Value);
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