export function compile(html: string) {
  const template = document.createElement("template");
  template.innerHTML = html;

  const node = template.content.firstChild;

  if (!node) {
    throw new Error("No node in template");
  }

  return node;
}
