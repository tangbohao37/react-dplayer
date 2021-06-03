import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import defaultConfig from '@/config/config';
export default class Service {
  private service: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.service = axios.create({
      timeout: 50000,
      withCredentials: true,
      ...config,
    });

    if (process.env.NODE_ENV === 'development') {
      this.service.defaults.baseURL = '';
    }

    this.service.interceptors.request.use(
      (config) => {
        if (!('access_token' in config.headers)) {
          config.headers.access_token = defaultConfig.access_token;
        }
        if (!('accessToken' in config.headers)) {
          config.headers.accessToken = defaultConfig.accessToken;
        }
        if (!('w_skey' in config.headers)) {
          config.headers.w_skey = defaultConfig.w_skey;
        }
        if (!('w_open_id' in config.headers)) {
          config.headers.w_open_id = defaultConfig.w_open_id;
        }
        if (!('w_uid' in config.headers)) {
          config.headers.w_uid = defaultConfig.w_uid;
        }
        if (!('w_client' in config.headers)) {
          config.headers.w_client = defaultConfig.w_client;
        }
        Object.entries(config.headers).forEach(([key, value]) => {
          if (!value) {
            delete config.headers[key];
          }
        });
        return config;
      },
      (error) => {
        // 发送失败
        console.log(error, '请求失败');
        Promise.reject(error);
      },
    );

    this.service.interceptors.response.use(
      (response) => {
        const dataAxios = response.data;
        if ((response.headers['content-type'] as string).includes('json')) {
          const { ret, code, msg } = dataAxios;
          if (
            (!ret && typeof ret !== 'undefined') ||
            (!code && typeof code !== 'undefined')
          ) {
            return dataAxios;
          } else {
            // logError(msg);
            return Promise.reject(dataAxios);
          }
        } else {
          return response;
        }
      },
      (error) => {
        if (error.response.status === 403) {
          // 403 处理
        }
        if (error?.response) {
          error.msg = error.response.data?.msg || '';
          if (!error.msg) {
            switch (error.response.status) {
              case 400:
                error.msg = '请求错误';
                break;
              case 401:
                error.msg = '未授权，请登录';
                break;
              case 403:
                error.msg = '拒绝访问';
                break;
              case 404:
                error.msg = `请求地址出错: ${error.response.config.url}`;
                break;
              case 408:
                error.msg = '请求超时';
                break;
              case 500:
                error.msg = '系统繁忙，请稍后再试。';
                break;
              case 501:
                error.msg = '服务未实现';
                break;
              case 502:
                error.msg = '网关错误';
                break;
              case 503:
                error.msg = '服务不可用';
                break;
              case 504:
                error.msg = '网关超时';
                break;
              case 505:
                error.msg = 'HTTP版本不受支持';
                break;
              default:
                break;
            }
          }
        }
        // logError(error.msg || error.message);
        // TODO： error处理
        return Promise.reject(error);
      },
    );
  }

  public request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const res = await this.service.request(config);
    return res.data;
  };

  public get = async <T = any>(url: string, config?: AxiosRequestConfig) => {
    const res = await this.service.get<T>(url, config);
    return res.data;
  };

  public delete = async <T = any>(url: string, config?: AxiosRequestConfig) => {
    const res = await this.service.delete<T>(url, config);
    return res.data;
  };

  public options = async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ) => {
    const res = await this.service.options<T>(url, config);
    return res.data;
  };

  public head = async <T = any>(url: string, config?: AxiosRequestConfig) => {
    const res = await this.service.head<T>(url, config);
    return res.data;
  };

  public post = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => {
    const res = await this.service.post<T>(url, data, config);
    return res.data;
  };

  public put = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => {
    const res = await this.service.put<T>(url, data, config);
    return res.data;
  };

  public patch = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => {
    const res = await this.service.patch<T>(url, data, config);
    return res.data;
  };
}
