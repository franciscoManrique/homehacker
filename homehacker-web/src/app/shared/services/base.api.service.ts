import { User } from "../../models/user.model";

export class BaseApiService {
    protected static readonly CURRENT_USER = 'current-user';
    protected static readonly USER_LOGGED = JSON.parse(localStorage.getItem(BaseApiService.CURRENT_USER));
    protected foo: string = "hola";
}
