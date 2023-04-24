export const apiBaseUrl = "https://www.saraba1st.com/2b/api/mobile/";
export const apiAPPUrl = "https://app.saraba1st.com/2b/api/app/";
export const apiWebUrl = "https://www.saraba1st.com/2b/";

export const apiLogin = apiAPPUrl + 'user/login'
export const apiPostList = apiAPPUrl + 'thread/page';
export const apiGetForums = apiBaseUrl + 'index.php?module=forumindex';
export const getApiThreadList = (fid, page) => apiBaseUrl + `index.php?module=forumdisplay&version=4&filter=typeid&tpp=50&fid=${fid}&page=${page}`;

export const getPostDate = (timestamp) => {
    return new Date(timestamp * 1000).toISOString().slice(0, 16).replace('T', ' ')
}