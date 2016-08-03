import { createAction } from 'redux-actions';


const payloadCreator = (payload) => payload;
const metaCreator = (payload, meta) => meta;


export default function actionsBuilder(constants) {
  return {
    request: createAction(constants.REQUEST, payloadCreator, metaCreator),
    pending: createAction(constants.PENDING, payloadCreator, metaCreator),
    success: createAction(constants.SUCCESS, payloadCreator, metaCreator),
    failure: createAction(constants.FAILURE, payloadCreator, metaCreator),
  };
}
