import { ErrorView } from "../../components/errorView/errorView";
import { mountRoot } from "../../lib/mountRoot";

const page404 = new ErrorView({
  title: "404",
  subtitle: "Не туда попали",
  link: "Назад к чатам",
});

mountRoot(page404.node);
