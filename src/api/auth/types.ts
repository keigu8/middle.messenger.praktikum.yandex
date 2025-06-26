export type SignupRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SigninRequest = {
  login: string;
  password: string;
};
