import Service from './request';
import conf from '@/config/config';

export const liveApi = new Service({
  baseURL: conf.baseUrl,
});
