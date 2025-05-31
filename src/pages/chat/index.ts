import { mountRoot } from "../../lib/mountRoot";
import { chat, ChatPage } from "./chat";
import "./index.css";

const chatPage = new ChatPage(chat);

mountRoot(chatPage.node);
