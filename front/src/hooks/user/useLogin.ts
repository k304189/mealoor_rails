import { useContext } from "react";

import {
  LoginUserContext,
  LoginUserContextType
} from "../../providers/LoginUserProvider";

export const useLogin = (): LoginUserContextType =>
  useContext(LoginUserContext);
