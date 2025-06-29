import http from "http";
import fs from "fs";

const PORT = 3000;

const mime = {
  js: "text/javascript",
  html: "text/html",
  css: "text/css",
  png: "image/png",
};

http
  .createServer(function (request, response) {
    function requestToPath({ url }) {
      return `dist/${url.slice(1) || "index.html"}`;
    }

    fs.readFile(requestToPath(request), function (_, content) {
      response.setHeader(
        "content-type",
        `${mime[request.url.split(".").slice(-1)]}`,
      );
      response.writeHead(200);
      response.end(content, "utf-8");
    });
  })
  .listen(PORT);
