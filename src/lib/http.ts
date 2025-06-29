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

  public get<R>(url: string, options?: Options) {
    return this.request<R>(
      options?.data ? `${url}${queryStringify(options.data)}` : url,
      { ...options, method: HTTPTransport.Method.Get },
    );
  }

  public post<R>(url: string, options?: Options) {
    return this.request<R>(url, {
      ...options,
      method: HTTPTransport.Method.Post,
    });
  }

  public put<R>(url: string, options?: Options) {
    return this.request<R>(url, {
      ...options,
      method: HTTPTransport.Method.Put,
    });
  }

  public delete<R>(url: string, options?: Options) {
    return this.request<R>(url, {
      ...options,
      method: HTTPTransport.Method.Delete,
    });
  }

  private request = <R>(url: string, options: RequestOptions): Promise<R> => {
    const {
      headers = {},
      method,
      data = null,
      timeout = 5000,
      format = "json",
    } = options;

    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = (event) => {
        // @ts-expect-error response exists on target
        const response = event.target?.response;
        // @ts-expect-error status exists on target
        const status = event.target?.status;
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
