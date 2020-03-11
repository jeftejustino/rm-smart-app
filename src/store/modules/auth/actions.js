export function SignInRequest({email, password}) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {email, password},
  };
}

export function SignInSuccess(profile) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {profile},
  };
}

export function SignInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function SingOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
