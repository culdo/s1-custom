# S1 Custom

使用Nuxt.js開發的自定義S1網頁

## 使用須知
需搭配下列瀏覽器擴充使用：
1. [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)：允許在此自定義網站取得論壇數據
3. 如出現`Oops something went wrong!retry`，請啟用`Allow CORS`後使用`Crtl+Shift+R`清空緩存重整一次
4. 如出現`No more result`，表示無此討論串權限，如還是無權限代表可能原S1帳號權限不足。
## Setup
Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```
## CD
Related file locate at `.github/workflows`

## To-do-list
- [x] three dots menu
- [ ] jump to specific post
- [x] jump to specific page
- [x] cast dark magic
- [x] link post author to author space