export const BASE_URL = "http://localhost:3001";

// Public endpoints
export const GET_ALL_BRANCHES_URL = `${BASE_URL}/auth/branches`;
export const SIGN_IN_URL = `${BASE_URL}/auth/sign_in`;
export const LOG_IN_URL = `${BASE_URL}/auth/log_in`;
export const getTopicsByBranchUrl = (branchId) => `${BASE_URL}/auth/branches/${branchId}/topics`;
export const getCommentsByTopicUrl = (topicId) => `${BASE_URL}/auth/topics/${topicId}/comments`;

// Protected endpoints
export const getProfileDetailsUrl = (id) => `${BASE_URL}/api/profile/${id}`;
export const updateProfileUrl = (userId) => `${BASE_URL}/api/profile/update/${userId}`;
export const addNewTopicUrl = `${BASE_URL}/api/topics/add`;
export const addNewCommentUrl = `${BASE_URL}/api/comments/add`;
export const updateCommentUrl = (id) => `${BASE_URL}/api/comments/update/${id}`;
export const deleteCommentUrl = (id) => `${BASE_URL}/api/comments/delete/${id}`;
export const getCommentByIdUrl = (id) => `${BASE_URL}/api/comments/${id}`;
