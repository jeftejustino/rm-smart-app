import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  signed: false,
  token: null,
  userId: null,
  gerenciador: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        draft.loading = false;
        draft.signed = true;
        draft.token = action.payload.profile.token;
        draft.userId = action.payload.profile.id;
        draft.gerenciador = action.payload.profile.gerenciador;
        break;
      }

      case '@auth/SIGN_IN_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.signed = false;
        draft.token = false;
        draft.userId = false;
        draft.gerenciador = false;
        break;
      }

      default:
    }
  });
}
