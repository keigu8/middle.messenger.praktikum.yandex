export type EditProfileRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type EditAvatarRequest = {
  avatar: File;
};

export type EditPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type SearchUserRequest = {
  login: string;
};

export type ProfileResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};
