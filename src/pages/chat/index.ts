import { mountRoot } from "../../lib/mountRoot";
import { chat, ChatPage } from "./chat";

const chatPage = new ChatPage(chat);

mountRoot(chatPage.node);
