import { createAction } from 'redux-actions';


const payloadCreator = (payload) => payload;
const metaCreator = (payload, meta) => meta;

export function actionBuilder(constant) {
  return createAction(constant, payloadCreator, metaCreator);
}


export function actionsBuilder(constants) {
  return {
    request: actionBuilder(constants.REQUEST),
    pending: actionBuilder(constants.PENDING),
    success: actionBuilder(constants.SUCCESS),
    failure: actionBuilder(constants.FAILURE),
  };
}
