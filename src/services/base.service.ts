import type { GetIndexResponse } from '@/types';
import axios, { type AxiosRequestConfig } from 'axios';

export class BaseService<T> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getIndex(params?: object): Promise<GetIndexResponse<T>> {
    const { data } = await axios.get(this.endpoint, { params });
    return data;
  }

  async getDetail(id: string | number, config?: AxiosRequestConfig<any>) {
    const { data } = await axios.get(`${this.endpoint}/${id}`, config);
    return data;
  }

  async create(payload: T) {
    const { data } = await axios.post(this.endpoint, payload);
    return data;
  }

  async update(id: string | number, payload: T) {
    const { data } = await axios.put(`${this.endpoint}/${id}`, payload);
    return data;
  }

  async delete(id: string | number) {
    const { data } = await axios.delete(`${this.endpoint}/${id}`);
    return data;
  }
}
