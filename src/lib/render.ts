export function render(html: string) {
  const template = document.createElement("template");
  template.innerHTML = html;

  const node = template.content.children[0];

  if (!node) {
    throw new Error("No node in template");
  }

  if (!(node instanceof window.HTMLElement)) {
    throw new Error("Node is not HTMLElement");
  }

  return node;
}
