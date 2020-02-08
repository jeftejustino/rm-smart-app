import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  visit_started: false,
  visit: false,
};

export default function visit(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@visit/START_VISIT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@visit/START_VISIT_SUCCESS': {
        draft.loading = false;
        draft.visit = action.payload.visit;
        draft.visit_started = true;
        break;
      }
      case '@visit/START_VISIT_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@visit/STOP_VISIT_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@visit/STOP_VISIT_SUCCESS': {
        draft.loading = false;
        draft.visit = null;
        draft.visit_started = false;
        break;
      }

      case '@visit/STOP_VISIT_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
