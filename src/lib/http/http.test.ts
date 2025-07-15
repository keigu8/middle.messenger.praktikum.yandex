/* eslint-disable @typescript-eslint/no-unused-expressions */
import { HTTPTransport } from "./http.ts";
import { spy } from "sinon";
import { expect } from "chai";

describe("HTTPTransport", () => {
  const http = new HTTPTransport();
  const url = "http://localhost:3000/";

  const openSpy = spy();
  const sendSpy = spy();

  beforeEach(() => {
    const originalOpen = window.XMLHttpRequest.prototype.open;

    window.XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL,
    ) {
      openSpy(method, url);
      originalOpen.apply(this, [method, url] as unknown as Parameters<
        typeof window.XMLHttpRequest.prototype.open
      >);
    };
    window.XMLHttpRequest.prototype.send = function (...args) {
      sendSpy(...args);
      this.onload?.({ target: this } as unknown as ProgressEvent<EventTarget>);
    };
  });

  afterEach(() => {
    openSpy.resetHistory();
    sendSpy.resetHistory();
  });

  it("should send get query", async () => {
    await http.get(url);

    expect(openSpy.calledWith("GET", url)).to.be.true;
    expect(sendSpy.calledWith()).to.be.true;
  });

  it("should send post query", async () => {
    await http.post(url);

    expect(openSpy.calledWith("POST", url)).to.be.true;
    expect(sendSpy.calledWith()).to.be.true;
  });

  it("should send put query", async () => {
    await http.put(url);

    expect(openSpy.calledWith("PUT", url)).to.be.true;
    expect(sendSpy.calledWith()).to.be.true;
  });

  it("should send delete query", async () => {
    await http.delete(url);

    expect(openSpy.calledWith("DELETE", url)).to.be.true;
    expect(sendSpy.calledWith()).to.be.true;
  });

  it("should send get query with data", async () => {
    await http.get(url, { data: { foo: "foo", bar: 1, bazz: true } });

    expect(openSpy.calledWith("GET", `${url}?foo=foo&bar=1&bazz=true`)).to.be
      .true;
    expect(sendSpy.calledWith()).to.be.true;
  });

  it("should send query with data", async () => {
    await http.post(url, { data: { foo: "foo", bar: 1, bazz: true } });

    expect(openSpy.calledWith("POST", url)).to.be.true;
    expect(sendSpy.calledWith(`{"foo":"foo","bar":1,"bazz":true}`)).to.be.true;
  });

  it("should support formdata", async () => {
    await http.post(url, {
      data: { foo: "foo", bar: 1, bazz: true },
      format: "formdata",
    });

    const formData = new FormData();
    formData.set("foo", "foo");
    formData.set("bar", "1");
    formData.set("bazz", "true");

    expect(openSpy.calledWith("POST", url)).to.be.true;
    expect(sendSpy.calledWith(formData)).to.be.true;
  });
});
