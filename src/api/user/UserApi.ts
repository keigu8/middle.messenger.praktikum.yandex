import { Api } from "../../lib/api";
import type { SuccessResponse } from "../../lib/http";
import type {
  EditAvatarRequest,
  EditPasswordRequest,
  EditProfileRequest,
  ProfileResponse,
  SearchUserRequest,
} from "./types";

export class UserApi extends Api {
  protected get prefix(): string {
    return "user";
  }

  public editProfile(request: EditProfileRequest) {
    return this.http.put<ProfileResponse>(this.path("profile"), {
      data: request,
    });
  }

  public editAvatar(request: EditAvatarRequest) {
    return this.http.put<ProfileResponse>(this.path("profile/avatar"), {
      data: request,
    });
  }

  public editPassword(request: EditPasswordRequest) {
    return this.http.put<SuccessResponse>(this.path("password"), {
      data: request,
    });
  }

  public search(request: SearchUserRequest) {
    return this.http.get<ProfileResponse[]>(this.path("search"), {
      data: request,
    });
  }
}
