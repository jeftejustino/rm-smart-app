export function StartVisitRequest(visit) {
  return {
    type: '@visit/START_VISIT_REQUEST',
    payload: {visit},
  };
}

export function StartVisitSuccess(visit) {
  return {
    type: '@visit/START_VISIT_SUCCESS',
    payload: {visit},
  };
}

export function StartVisitFailure() {
  return {
    type: '@visit/START_VISIT_FAILURE',
  };
}

export function StopVisitRequest(payload) {
  return {
    type: '@visit/STOP_VISIT_REQUEST',
    payload,
  };
}

export function StopVisitSuccess() {
  return {
    type: '@visit/STOP_VISIT_SUCCESS',
  };
}

export function StopVisitFailure() {
  return {
    type: '@visit/STOP_VISIT_FAILURE',
  };
}
