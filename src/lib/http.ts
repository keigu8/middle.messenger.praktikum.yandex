import { keys } from "./keys";

function queryStringify(data: object) {
  return keys(data).reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

type Options = {
  headers?: Record<string, string>;
  method: string;
  data?: object;
  timeout?: number;
};

type HTTPTransportMethod<R = unknown> = (url: string, options?: Options) => Promise<R>;

export class HTTPTransport {
  static Method = {
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Delete: "DELETE",
  };

  public get: HTTPTransportMethod = (url, options) => {
    return this.request(
      options?.data ? `${url}${queryStringify(options.data)}` : url,
      { ...options, method: HTTPTransport.Method.Get },
    );
  };

  public post: HTTPTransportMethod = (url, options) => {
    return this.request(url, { ...options, method: HTTPTransport.Method.Post });
  };

  public put: HTTPTransportMethod = (url, options) => {
    return this.request(url, { ...options, method: HTTPTransport.Method.Put });
  };

  public delete: HTTPTransportMethod = (url, options) => {
    return this.request(url, {
      ...options,
      method: HTTPTransport.Method.Delete,
    });
  };

  private request = (url: string, options: Options) => {
    const { headers = {}, method, data = null, timeout = 5000 } = options;

    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;

      xhr.onerror = reject;

      xhr.timeout = timeout;

      xhr.ontimeout = reject;

      if (!data) {
        xhr.send();
        return;
      }

      const formData = new FormData();

      keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      xhr.send(formData);
    });
  };
}
