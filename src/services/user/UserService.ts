import type {
  EditAvatarRequest,
  EditPasswordRequest,
  EditProfileRequest,
  ProfileResponse,
  SearchUserRequest,
  UserApi,
} from "../../api/user";
import type { AuthService } from "../auth";

export class UserService {
  private _profile: ProfileResponse | null = null;

  constructor(
    private readonly userApi: UserApi,
    private readonly authService: AuthService,
  ) {}

  public async init() {
    const user = this.authService.user;
    if (user) {
      this._profile = await this.get({ login: user.login });
    }
  }

  public get profile() {
    return this._profile;
  }

  public editProfile(data: EditProfileRequest) {
    this.userApi.editProfile(data).then((profile) => {
      this._profile = profile;
    });
  }

  public editAvatar(data: EditAvatarRequest) {
    this.userApi.editAvatar(data).then((profile) => {
      this._profile = profile;
    });
  }

  public editPassword(data: EditPasswordRequest) {
    this.userApi.editPassword(data);
  }

  public get(data: SearchUserRequest) {
    return this.userApi.search(data);
  }
}
