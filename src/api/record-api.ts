import Service from './request';
import conf from '@/config/config';

export const recordApi = new Service({
  baseURL: conf.baseUrl,
});
