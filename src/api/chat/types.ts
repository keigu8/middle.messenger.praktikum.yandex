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
  chatId: number;
};

export type GetChatUsersRequest = {
  chatId: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
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

export type GetChatUsersResponse = Array<{
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: string;
}>;
