export const apiBaseUrl = "https://www.saraba1st.com/2b/api/mobile/";
export const apiAPPUrl = "https://app.saraba1st.com/2b/api/app/";
export const apiWebUrl = "https://www.saraba1st.com/2b/";

export const apiLogin = apiAPPUrl + 'user/login'
export const apiPostList = apiAPPUrl + 'thread/page';
export const apiGetForums = apiBaseUrl + 'index.php?module=forumindex';

export const getApiThreadList = (fid, page) => apiBaseUrl + `index.php?module=forumdisplay&version=4&filter=typeid&tpp=50&fid=${fid}&page=${page}`;
export const getPostDate = (timestamp) => {
    let dateFormat = new Date(timestamp * 1000);

    return dateFormat.getFullYear() + 
            "-" + ("0" + (dateFormat.getMonth()+1)).slice(-2) + 
            "-" + ("0" + dateFormat.getDate()).slice(-2) +
            " "+("0" + dateFormat.getHours()).slice(-2)+
            ":"+("0" + dateFormat.getMinutes()).slice(-2)+
            ":"+("0" + dateFormat.getSeconds()).slice(-2);
}
export const getThreadLink = (thread) => `2b/thread-${thread.tid}-1-1`
export const getThreadOrigUrl = (route, pageNum) => apiWebUrl + `thread-${route.params.id}-${pageNum.value}-${route.params.threadListPage}.html`
