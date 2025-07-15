/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";
import { View } from "../view/view.ts";
import { Router } from "./router.ts";
import { spy } from "sinon";

describe("Router", () => {
  class Page extends View<object> {
    protected render(): string {
      return `<div></div>`;
    }
  }

  const backSpy = spy();
  const forwardSpy = spy();

  beforeEach(() => {
    window.history.back = backSpy;
    window.history.forward = forwardSpy;
  });

  afterEach(() => {
    backSpy.resetHistory();
    forwardSpy.resetHistory();
  });

  it("should navigate to route", () => {
    const page = new Page({});
    const router = new Router().use("/1", page);
    router.start();

    router.go("/1");

    expect(window.document.querySelector("#root > div")).equals(page.node);
  });

  it("should navigate back", () => {
    const page1 = new Page({});
    const page2 = new Page({});
    const router = new Router().use("/1", page1).use("/2", page2);
    router.start();

    router.go("/1");
    router.go("/2");
    router.back();

    expect(backSpy.calledOnce).to.be.true;
  });

  it("should navigate forward", () => {
    const page1 = new Page({});
    const page2 = new Page({});
    const router = new Router().use("/1", page1).use("/2", page2);
    router.start();

    router.go("/1");
    router.go("/2");
    router.back();
    router.forward();

    expect(backSpy.calledOnce).to.be.true;
    expect(forwardSpy.calledOnce).to.be.true;
  });
});
