import {
  createToken,
  IUserState,
  modifyUser,
  resetUser,
} from "@store/reducers/user.reducer";
import { RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";

function useUser() {
  const user: IUserState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const createTokenAction = (payload: any) => dispatch(createToken(payload));
  const modifyUserAction = (payload: IUserState) =>
    dispatch(modifyUser(payload));
  const resetUserAction = () => dispatch(resetUser());

  return {
    user,
    createTokenAction,
    modifyUserAction,
    resetUserAction,
  };
}

export default useUser;
