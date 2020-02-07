export function StartVisitRequest(visit) {
  return {
    type: '@visit/START_VISIT_REQUEST',
    payload: {visit},
  };
}

export function StartVisitSuccess(visit) {
  return {
    type: '@auth/START_VISIT_SUCCESS',
    payload: {visit},
  };
}

export function StartVisitFailure() {
  return {
    type: '@auth/START_VISIT_FAILURE',
  };
}
