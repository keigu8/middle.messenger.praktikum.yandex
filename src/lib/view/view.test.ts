/* eslint-disable @typescript-eslint/no-unused-expressions */
import { describe, it } from "mocha";
import { View } from "./view.ts";
import { expect } from "chai";

type State = {
  foo: string;
  bar: number;
  bazz: boolean;
};

describe("View", () => {
  it("should render state", () => {
    class Foo extends View<State> {
      constructor(state: State) {
        super(state);
      }

      render() {
        return `<div>{{foo}}{{bar}}{{bazz}}</div>`;
      }
    }

    const foo = new Foo({ foo: "foo", bar: 42, bazz: true });

    expect(foo.node.textContent).equals("foo42true");
  });

  it("should render views", () => {
    class Bar extends View<State> {
      constructor(state: State) {
        super(state);
      }

      render() {
        return `<div>{{foo}}{{bar}}{{bazz}}</div>`;
      }
    }

    class Foo extends View<State> {
      constructor(state: State) {
        super(state, {
          Bar: new Bar(state),
        });
      }

      render() {
        return `<div>{{{Bar}}}</div>`;
      }
    }

    const foo = new Foo({ foo: "foo", bar: 42, bazz: true });

    const bar = foo.node.querySelector("div");
    expect(bar).to.be.instanceOf(window.HTMLDivElement);
    expect(bar?.textContent).equals("foo42true");
  });

  it("should render updated state", () => {
    class Foo extends View<State> {
      constructor(state: State) {
        super(state);
      }

      render() {
        return `<div>{{foo}}{{bar}}{{bazz}}</div>`;
      }
    }

    const foo = new Foo({ foo: "foo", bar: 42, bazz: true });
    foo.updateState((state) => ({ ...state, foo: "bar" }));

    expect(foo.node.textContent).equals("bar42true");
  });

  it("should add event listener", () => {
    let clicked = false;

    class Foo extends View<object> {
      constructor(state: object) {
        super(
          state,
          {},
          {
            click: () => {
              clicked = true;
            },
          },
        );
      }

      render() {
        return `<div></div>`;
      }
    }

    const foo = new Foo({});
    foo.node.click();

    expect(clicked).to.be.true;
  });

  it("should add event listener to a target element", () => {
    let clicked = false;

    class Foo extends View<object> {
      constructor(state: object) {
        super(
          state,
          {},
          {
            click: () => {
              clicked = true;
            },
          },
          "#target",
        );
      }

      render() {
        return `<div><div id="target"></div></div>`;
      }
    }

    const foo = new Foo({});
    (foo.node.querySelector("#target") as HTMLDivElement).click();

    expect(clicked).to.be.true;
  });

  it("should call CDM", () => {
    let cdmCalled = false;

    class Bar extends View<object> {
      constructor(state: object) {
        super(state);
      }

      protected componentDidMount() {
        cdmCalled = true;

        return true;
      }

      render() {
        return `<div></div>`;
      }
    }

    class Foo extends View<object> {
      constructor(state: object) {
        super(state, {
          Bar: new Bar({}),
        });
      }

      render() {
        return `<div>{{{Bar}}}</div>`;
      }
    }

    new Foo({});

    expect(cdmCalled).to.be.true;
  });

  it("should call CDU", () => {
    let oldState = null,
      newState = null;

    class Foo extends View<State> {
      constructor(state: State) {
        super(state);
      }

      protected componentDidUpdate(_oldState: State, _newState: State) {
        oldState = _oldState;
        newState = _newState;

        return true;
      }

      render() {
        return `<div>{{foo}}{{bar}}{{bazz}}</div>`;
      }
    }

    const foo = new Foo({ foo: "foo", bar: 42, bazz: true });
    foo.updateState((state) => ({ ...state, foo: "bar" }));

    expect(oldState).to.deep.equal({ foo: "foo", bar: 42, bazz: true });
    expect(newState).to.deep.equal({ foo: "bar", bar: 42, bazz: true });
  });
});
