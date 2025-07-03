export enum DataType {
  Message = "message",
  GetOld = "get old",
  Error = "error",
}

export type MessageRequest = {
  type: DataType.Message;
  content: string;
};

export type GetOldRequest = {
  type: DataType.GetOld;
  content: "0";
};

export type MessageResponse = {
  type: DataType.Message;
  content: string;
  time: string;
  user_id: number;
  id: number;
};

export type GetOldResponse = Array<{
  type: DataType.Message;
  chat_id: number;
  content: string;
  id: number;
  is_read: boolean;
  time: string;
  user_id: number;
}>;

export type DataRequest = MessageRequest | GetOldRequest;

export type DataResponse = MessageResponse | GetOldResponse;
