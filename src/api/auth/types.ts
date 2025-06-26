export type SignupRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignupResponse = {
  id: number;
};

export type SigninRequest = {
  login: string;
  password: string;
};
