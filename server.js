import http from "http";
import fs from "fs";

const PORT = 3000;

http
  .createServer(function (request, response) {
    function requestToPath({ url }) {
      return `dist/${url.slice(1) || "index.html"}`;
    }

    fs.readFile(requestToPath(request), function (_, content) {
      response.writeHead(200);
      response.end(content, "utf-8");
    });
  })
  .listen(PORT);
