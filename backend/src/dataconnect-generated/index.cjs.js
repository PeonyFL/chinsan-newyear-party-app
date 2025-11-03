const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'party-registration',
  location: 'asia-east1'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getEventRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEvent', inputVars);
}
getEventRef.operationName = 'GetEvent';
exports.getEventRef = getEventRef;

exports.getEvent = function getEvent(dcOrVars, vars) {
  return executeQuery(getEventRef(dcOrVars, vars));
};

const createCommentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateComment', inputVars);
}
createCommentRef.operationName = 'CreateComment';
exports.createCommentRef = createCommentRef;

exports.createComment = function createComment(dcOrVars, vars) {
  return executeMutation(createCommentRef(dcOrVars, vars));
};

const listPublicEventsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicEvents');
}
listPublicEventsRef.operationName = 'ListPublicEvents';
exports.listPublicEventsRef = listPublicEventsRef;

exports.listPublicEvents = function listPublicEvents(dc) {
  return executeQuery(listPublicEventsRef(dc));
};
