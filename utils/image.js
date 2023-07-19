export function swapSrcTemp(img) {
    const temp = img.getAttribute("src")
    img.setAttribute("src", img.getAttribute("data-src"))
    img.setAttribute("data-src", temp)
  }