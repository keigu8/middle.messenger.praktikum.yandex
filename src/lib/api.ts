import { HTTPTransport } from "./http";

export abstract class Api {
  protected abstract get prefix(): string;
  protected readonly http = new HTTPTransport();

  protected path(route?: string) {
    return `${import.meta.env.VITE_API_URL}/${this.prefix}/${route || ""}`;
  }
}
