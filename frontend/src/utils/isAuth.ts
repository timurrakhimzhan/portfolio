import {RootState, store} from "../redux/store";

export function isAuth(): boolean {
    const {user} = (store.getState() as RootState);
    return user.logged_in;
}