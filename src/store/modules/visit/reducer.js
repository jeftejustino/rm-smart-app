import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  visit_started_at: null,
  visit: false,
};

export default function visit(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@visit/START_VISIT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/START_VISIT_SUCCESS': {
        draft.loading = false;
        draft.visit = action.payload.visit;
        draft.visit_started_at = action.payload.visit_started_at;
        break;
      }
      case '@auth/START_VISIT_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
