export const apiBaseUrl = "https://www.saraba1st.com/2b/api/mobile/";

export const getApiPostList = (tid, page) => apiBaseUrl + `index.php?module=viewthread&version=1&ppp=30&tid=${tid}&page=${page}`;
export const getApiThreadList = (fid, page) => apiBaseUrl + `index.php?module=forumdisplay&version=4&filter=typeid&tpp=50&fid=${fid}&page=${page}`;
