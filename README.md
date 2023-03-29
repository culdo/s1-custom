# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## 使用須知
需搭配下列兩款瀏覽器擴充使用：
1. [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)：允許在此自定義網站取得論壇數據
2. [EditThisCookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=en)：允許查看需要權限的討論串
    * 使用網頁版登入S1後開啟此擴充功能找到`B7Y9_2132_saltkey`的cookie，將其`Same Site`設為`No restriction`，並點選左上角鎖頭將其設為唯讀
3. 如出現`Oops something went wrong!retry`，請啟用`Allow CORS`後使用`Crtl+Shift+R`清空緩存重整一次
4. 如出現`No more result`，表示無此討論串權限，需登入S1後啟用`EditThisCookie`，並按照第二部設定
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
- [ ] jump to specific page