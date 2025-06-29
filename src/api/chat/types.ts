export type GetChatsRequest = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type CreateChatRequest = {
  title: string;
};

export type AddUsersToChatRequest = {
  users: number[];
  chatId: number;
};

export type DeleteUsersFromChatRequest = {
  users: number[];
  chatId: number[];
};

export type GetChatsResponse = Array<{
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  } | null;
}>;

export type CreateChatResponse = {
  id: number;
};
