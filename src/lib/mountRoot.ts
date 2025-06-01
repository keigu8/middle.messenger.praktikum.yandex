import type { View } from "./view";

export function mountRoot<T extends object>(view: View<T>) {
  const root = document.getElementById("root");

  if (!root) {
    throw new Error("No root element");
  }

  root.appendChild(view.node);
  view.dispatchComponentDidMount();
}
