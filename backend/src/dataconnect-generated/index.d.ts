import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateCommentData {
  comment_insert: Comment_Key;
}

export interface CreateCommentVariables {
  eventId: UUIDString;
  content: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email: string;
  username: string;
}

export interface Event_Key {
  id: UUIDString;
  __typename?: 'Event_Key';
}

export interface GetEventData {
  event?: {
    id: UUIDString;
    name: string;
    description?: string | null;
    location: string;
    eventDate: DateString;
    startTime: TimestampString;
    endTime?: TimestampString | null;
    isPublic?: boolean | null;
    organizer: {
      id: UUIDString;
      displayName?: string | null;
      email: string;
    } & User_Key;
  } & Event_Key;
}

export interface GetEventVariables {
  id: UUIDString;
}

export interface Invitation_Key {
  inviteeId: UUIDString;
  eventId: UUIDString;
  __typename?: 'Invitation_Key';
}

export interface ListPublicEventsData {
  events: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    location: string;
    eventDate: DateString;
    startTime: TimestampString;
    endTime?: TimestampString | null;
    organizer: {
      displayName?: string | null;
    };
  } & Event_Key)[];
}

export interface Photo_Key {
  id: UUIDString;
  __typename?: 'Photo_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEventVariables): QueryRef<GetEventData, GetEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEventVariables): QueryRef<GetEventData, GetEventVariables>;
  operationName: string;
}
export const getEventRef: GetEventRef;

export function getEvent(vars: GetEventVariables): QueryPromise<GetEventData, GetEventVariables>;
export function getEvent(dc: DataConnect, vars: GetEventVariables): QueryPromise<GetEventData, GetEventVariables>;

interface CreateCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  operationName: string;
}
export const createCommentRef: CreateCommentRef;

export function createComment(vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;
export function createComment(dc: DataConnect, vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;

interface ListPublicEventsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicEventsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPublicEventsData, undefined>;
  operationName: string;
}
export const listPublicEventsRef: ListPublicEventsRef;

export function listPublicEvents(): QueryPromise<ListPublicEventsData, undefined>;
export function listPublicEvents(dc: DataConnect): QueryPromise<ListPublicEventsData, undefined>;

