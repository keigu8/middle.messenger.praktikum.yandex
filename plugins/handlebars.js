import hbs from "handlebars";
import context from "../src/context";
import fs from "fs";

const fileRegexHtml = /\.(html)$/;
const fileRegexHbs = /\.(hbs)$/;

export default function handlebars() {
  let config;

  function getPartials() {
    function getPartialsRecursive(dir) {
      const res = [];
      if (!fs.statSync(dir).isDirectory()) {
        return res;
      }
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const path = `${dir}/${file}`;

        if (fileRegexHbs.test(file)) {
          res.push({ name: file.split(".")[0], path });
        } else {
          res.push(...getPartialsRecursive(path));
        }
      }
      return res;
    }

    return getPartialsRecursive(config.root);
  }

  return {
    name: "handlebars",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    transform(src, id) {
      if (fileRegexHtml.test(id)) {
        const partials = getPartials();
        for (const partial of partials) {
          const content = fs.readFileSync(partial.path).toString();
          hbs.registerPartial(partial.name, content);
        }
        hbs.registerHelper("if_eq", function (a, b, opts) {
          if (a == b) {
            return opts.fn(this);
          } else {
            return opts.inverse(this);
          }
        });
        const template = hbs.compile(src);
        return template(context);
      }
    },
  };
}
