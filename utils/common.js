export const apiBaseUrl = "https://www.saraba1st.com/2b/api/mobile/";
export const apiAPPUrl = "https://app.saraba1st.com/2b/api/app/";


export const getApiPostList = () => apiAPPUrl + `thread/page`;
export const getApiThreadList = (fid, page) => apiBaseUrl + `index.php?module=forumdisplay&version=4&filter=typeid&tpp=50&fid=${fid}&page=${page}`;
