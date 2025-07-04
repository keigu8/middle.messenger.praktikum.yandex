import { keys } from "./keys";

function queryStringify(data: object) {
  return keys(data).reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

type Options = {
  headers?: Record<string, string>;
  data?: object;
  timeout?: number;
  format?: "json" | "formdata";
};

type RequestOptions = Options & {
  method: string;
};

type HTTPMethod = <R = unknown>(
  url: string,
  options?: Partial<Options>,
) => Promise<R>;

type ErrorResponse = {
  reason: string;
};

export type SuccessResponse = "OK";

export class HTTPTransport {
  static Method = {
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Delete: "DELETE",
  };

  private createMethod(method: string): HTTPMethod {
    return <R>(url: string, options: Options = {}) =>
      this.request<R>(url, { ...options, method });
  }

  public get = this.createMethod(HTTPTransport.Method.Get);

  public post = this.createMethod(HTTPTransport.Method.Post);

  public put = this.createMethod(HTTPTransport.Method.Put);

  public delete = this.createMethod(HTTPTransport.Method.Delete);

  private request = <R>(url: string, options: RequestOptions): Promise<R> => {
    const {
      headers = {},
      method,
      data = null,
      timeout = 5000,
      format = "json",
    } = options;

    if (method === HTTPTransport.Method.Get && data) {
      url = `${url}${queryStringify(data)}`;
    }

    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = (event) => {
        const { response, status } = event.target as XMLHttpRequest;
        try {
          const json = JSON.parse(response);
          if (status !== 200) {
            reject(json as ErrorResponse);
          } else {
            resolve(json as R);
          }
        } catch (_) {
          resolve(response as R);
        }
      };

      xhr.onabort = reject;

      xhr.onerror = reject;

      xhr.timeout = timeout;

      xhr.ontimeout = reject;

      xhr.withCredentials = true;

      if (!data) {
        xhr.send();
        return;
      }

      if (format === "json") {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
      } else if (format === "formdata") {
        const formData = new FormData();
        keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
        xhr.send(formData);
      }
    });
  };
}
