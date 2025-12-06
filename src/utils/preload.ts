// 预加载策略工具函数
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

/**
 * 预加载关键资源
 * @param urls 要预加载的资源URL数组
 */
export function preloadCriticalResources(urls: string[]): void {
  urls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = getResourceType(url)
    link.href = url
    document.head.appendChild(link)
  })
}

/**
 * 预获取非关键资源
 * @param urls 要预获取的资源URL数组
 */
export function prefetchResources(urls: string[]): void {
  urls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    document.head.appendChild(link)
  })
}

/**
 * 根据URL判断资源类型
 * @param url 资源URL
 * @returns 资源类型
 */
function getResourceType(url: string): string {
  if (url.endsWith('.css')) {
    return 'style'
  } else if (url.endsWith('.js')) {
    return 'script'
  } else if (/\.(jpe?g|png|gif|webp|svg)$/.test(url)) {
    return 'image'
  } else if (url.endsWith('.woff') || url.endsWith('.woff2') || url.endsWith('.ttf')) {
    return 'font'
  } else {
    return 'fetch'
  }
}

/**
 * 图片懒加载实现
 * @param imgElements 图片元素数组
 */
export function lazyLoadImages(imgElements: HTMLImageElement[]): void {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset['src'] || ''
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })

    imgElements.forEach(img => {
      if (img.dataset['src']) {
        imageObserver.observe(img)
      }
    })
  } else {
    // 降级处理：直接加载所有图片
    imgElements.forEach(img => {
      if (img.dataset['src']) {
        img.src = img.dataset['src']
      }
    })
  }
}

/**
 * 预加载重要图片
 * @param urls 要预加载的图片URL数组
 */
export function preloadImportantImages(urls: string[]): void {
  urls.forEach(url => {
    const img = new Image()
    img.src = url
  })
}
