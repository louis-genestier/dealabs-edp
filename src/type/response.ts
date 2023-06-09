export interface Response {
  [0]: { data: { comments: Comments } };
  [1]: { data: { features: Features } };
  [2]: { data: { settings: Settings } };
}

export interface Data {
  comments?: Comments | null;
  features?: Features | null;
  settings?: Settings | null;
  newComments?: null;
  me?: null;
}
export interface Comments {
  items?: Comment[] | null;
  pagination: Pagination;
}
export interface Comment {
  commentId: string;
  mainCommentId?: null;
  threadId: string;
  url: string;
  preparedHtmlContent: string;
  user: User;
  reactionCounts?: ReactionCountsEntity[] | null;
  deletable: boolean;
  currentUserReaction: CurrentUserReaction;
  wasEdited: boolean;
  reported?: null;
  reportable: boolean;
  source: string;
  status: string;
  createdAt: string;
  createdAtTs: string;
  updatedAt: string;
  ignored: boolean;
  popular: boolean;
  isPinned: boolean;
  deletedBy?: DeletedBy | null;
  notes?: null;
  parentReply?: null;
  isReply: boolean;
  isNotSeenByCurrentUser: boolean;
  replyCount: number;
  repliesNotSeenByCurrentUserCount: number;
  repliesPreview?: (RepliesPreviewEntity | null)[] | null;
}
export interface User {
  userId: string;
  isDeletedOrPendingDeletion: boolean;
  imageUrls?: ImageUrls | null;
  username: string;
  isUserProfileHidden: boolean;
  persona?: Persona | null;
  title: string;
  bestBadge?: BestBadge | null;
}
export interface ImageUrls {
  user_small_avatar: string;
}
export interface Persona {
  type: string;
  text: string;
}
export interface BestBadge {
  badgeId: string;
  level: Level;
}
export interface Level {
  key: string;
  name: string;
  description: string;
}
export interface ReactionCountsEntity {
  type: string;
  count: number;
}
export interface CurrentUserReaction {
  type?: null;
}
export interface DeletedBy {
  username: string;
}
export interface RepliesPreviewEntity {
  commentId: string;
  mainCommentId: string;
  threadId: string;
  url: string;
  preparedHtmlContent: string;
  user: User1;
  reactionCounts?: (ReactionCountsEntity1 | null)[] | null;
  deletable: boolean;
  currentUserReaction: CurrentUserReaction;
  wasEdited: boolean;
  reported?: null;
  reportable: boolean;
  source: string;
  status: string;
  createdAt: string;
  createdAtTs: string;
  updatedAt: string;
  ignored: boolean;
  popular: boolean;
  isPinned: boolean;
  deletedBy?: null;
  notes?: null;
  parentReply?: null;
  isReply: boolean;
  isNotSeenByCurrentUser: boolean;
}
export interface User1 {
  userId: string;
  isDeletedOrPendingDeletion: boolean;
  imageUrls?: ImageUrls1 | null;
  username: string;
  isUserProfileHidden: boolean;
  persona?: null;
  title: string;
  bestBadge: BestBadge1;
}
export interface ImageUrls1 {
  user_small_avatar: string;
}
export interface BestBadge1 {
  badgeId: string;
  level: Level;
}
export interface ReactionCountsEntity1 {
  type: string;
  count: number;
}
export interface Pagination {
  count: number;
  current: number;
  last: number;
  next?: null;
  previous: number;
  size: number;
  order: string;
  orderBy: string;
}
export interface Features {
  commentForm: CommentForm;
  adminTools: AdminTools;
}
export interface CommentForm {
  permalink: boolean;
  issueReporting: boolean;
  subscribe: boolean;
  reCaptcha: boolean;
  wysiwyg: Wysiwyg;
}
export interface Wysiwyg {
  html: boolean;
  expand: boolean;
  bold: boolean;
  italic: boolean;
  strike: boolean;
  blockquote: boolean;
}
export interface AdminTools {
  deletable: boolean;
  demoteComment: boolean;
  directMessage: boolean;
  editable: boolean;
  enabled: boolean;
  expanded: boolean;
  imposeInfractions: boolean;
  inspectUser: boolean;
  moderate: boolean;
  promoteComment: boolean;
  seeDeleted: boolean;
  showCountry: boolean;
  spamReport: boolean;
}
export interface Settings {
  application: Application;
}
export interface Application {
  appStore: string;
  reCaptcha2Key: string;
}
