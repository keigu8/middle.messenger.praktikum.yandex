import type {
  EditAvatarRequest,
  EditPasswordRequest,
  EditProfileRequest,
  SearchUserRequest,
  UserApi,
} from "../../api/user";
import type { AuthService } from "../auth";

export class UserService {
  constructor(
    private readonly userApi: UserApi,
    private readonly authService: AuthService,
  ) {}

  public editProfile(data: EditProfileRequest) {
    this.userApi.editProfile(data).then((user) => {
      this.authService.setUser(user);
    });
  }

  public editAvatar(data: EditAvatarRequest, onSuccess: VoidFunction) {
    this.userApi.editAvatar(data).then((user) => {
      this.authService.setUser(user);
      onSuccess();
    });
  }

  public editPassword(data: EditPasswordRequest) {
    this.userApi.editPassword(data);
  }

  public search(data: SearchUserRequest) {
    return this.userApi.search(data);
  }
}
