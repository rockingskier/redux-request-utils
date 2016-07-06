import { createAction } from 'redux-actions';


export function actionsBuilder(constants) {
  return {
    request: createAction(constants.REQUEST),
    pending: createAction(constants.PENDING),
    success: createAction(constants.SUCCESS),
    failure: createAction(constants.FAILURE),
  };
}
