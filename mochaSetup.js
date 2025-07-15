/* eslint-disable no-undef */
import { JSDOM } from "jsdom";

const jsdom = new JSDOM(`<body id="root"></body>`, {
  url: "http://localhost/",
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.HTMLElement = jsdom.HTMLElement;
