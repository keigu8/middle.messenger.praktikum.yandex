import { chatService } from "../../globals";
import { ChatPage } from "./chat";
import "./index.css";
import { getChatPageState } from "./state";

const chatPage = new ChatPage(getChatPageState(chatService.chats));

export default chatPage;
