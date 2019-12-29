import { Action } from "redux";
import { AppState } from "../../store";

const getState = (state: AppState): State => state.auth;

const LOGIN_SUCCESSFUL = "app/auth/SUCCESSFUL_LOGIN";
interface LoginSuccessfulAction extends Action<typeof LOGIN_SUCCESSFUL> {
  payload: {
    userId: string;
    roles: string[];
    hasUserProfile?: boolean;
    hasAllocationProfile?: boolean;
  };
}
export const loginSuccessful = ({
  userId,
  roles,
  hasUserProfile,
  hasAllocationProfile
}: {
  userId: string;
  roles: string[];
  hasUserProfile?: boolean;
  hasAllocationProfile?: boolean;
}): LoginSuccessfulAction => {
  return {
    type: LOGIN_SUCCESSFUL,
    payload: {
      userId,
      roles,
      hasUserProfile,
      hasAllocationProfile
    }
  };
};

const LOGOUT = "app/auth/LOGOUT";
interface LogoutAction extends Action<typeof LOGOUT> {
  payload: {};
}
// Name this explicity to avoid confusion with the `logout()` function exported
// in the `auth.service`.
export const logoutActionCreator = (): LogoutAction => {
  return {
    type: LOGOUT,
    payload: {}
  };
};

export const doesUserHaveRole = (state: AppState, role: string) => {
  const auth = getState(state);
  return auth.roles.indexOf(role) !== -1;
};

type State = {
  isLoggedIn: boolean;
  userId: string;
  roles: string[];
  hasUserProfile?: boolean;
  hasAllocationProfile?: boolean;
};
const empty = {
  isLoggedIn: false,
  userId: "",
  roles: [],
  hasUserProfile: false,
  hasAllocationProfile: false
};

type AuthActions = LoginSuccessfulAction | LogoutAction;

const reducer = (state: State = empty, action: AuthActions) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL: {
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.userId,
        roles: action.payload.roles,
        ...(typeof action.payload.hasUserProfile === "boolean"
          ? { hasUserProfile: action.payload.hasUserProfile }
          : {}),
        ...(typeof action.payload.hasAllocationProfile === "boolean"
          ? { hasUserProfile: action.payload.hasAllocationProfile }
          : {})
      };
    }

    case LOGOUT: {
      return empty;
    }
  }

  return state;
};

export default reducer;
