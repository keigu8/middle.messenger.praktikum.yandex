import { ErrorView } from "../../components/errorView";
import { mountRoot } from "../../lib/mountRoot";

const page500 = new ErrorView({
  title: "500",
  subtitle: "Мы уже фиксим",
  link: "Назад к чатам",
});

mountRoot(page500.node);
