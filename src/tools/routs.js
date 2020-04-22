
// === pages
export const LOGIN = '/login'
export const DASHBOARD = '/dashboard'
export const DASHBOARD_OVERVIEW = '/dashboard/overview'
export const DASHBOARD_TASKS = '/dashboard/tasks'
export const DASHBOARD_CONTACTS = '/dashboard/contacts'


// === contacts api:
export const CONTACT_CREATE = '/secure/contact/create'
export const CONTACT_UPDATE = '/secure/contact/update?_id=_ID'
export const CONTACT_DELETE = '/secure/contact/delete?_id=_ID'
export const CONTACT_PAGINATION = '/secure/contact/pagination/get?limit=LIMIT&page=PAGE&user_key=USER_KEY'
export const CONTACT_GET_ALL = '/secure/contact/get?user_key=USER_KEY'
export const CONTACT_SEARCH_BY_NAME = '/secure/contact/search/name/get?keyword=KEYWORD&user_key=USER_KEY'
export const CONTACT_GET_FILTER = '/secure/contact/filter/get?user_key=USER_KEY&key=KEY&value=VALUE'
export const CONTACT_GET_GROUP_COUNT = '/secure/contact/group/count/get?user_key=USER_KEY&group=GROUP'
export const CONTACT_GET_GROUP_COUNT_AND_MATCH_STATUS = '/secure/contact/group/count/get?user_key=USER_KEY&group=GROUP&match_status=MATCH_STATUS'

// === tasks api:
export const TASK_CREATE = '/secure/task/create'
export const TASK_DELETE = '/secure/task/delete?_id=_ID'
export const TASK_UPDATE = '/secure/task/update?_id=_ID'
export const TASK_PAGINATION = '/secure/task/pagination/get?limit=LIMIT&page=PAGE&user_key=USER_KEY'
export const TASK_GET_ALL_OPEN_TASKS = '/secure/task/open/get?user_key=USER_KEY'

// === login api:
export const LOGIN_AUTH = '/auth/login'
