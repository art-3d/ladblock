const knownSelectorsToRemove = [
  '.sidebar_right_ad',
  'yatag',
  '.flat_pm_out',
  '.roxotAd'
]
const knownHrefsToRemove = [
  'oqwrba',
  'ad.',
  'click',
]
const knownHostsToIgnore = [
  'mail.google.com',
  'drive.google.com',
  'translate.google.com',
  'console.cloud.google.com',
  'map.land.gov.ua',
  'news.ycombinator.com',
  'tagmanager.google.com',
  'wikipedia.org',
]
const knownSelectorsToClick = [
  { selector: '.close', host: 'dou.ua' },
  { selector: '.flash-alert .js-close-icon', host: 'gitlab.com' },
]
let i = 0;

const removeKnownSelectors = () => {
  var removed = 0
  knownSelectorsToRemove.forEach(selector => {
    const element = document.querySelector(selector)
    if (element) {
      element.parentNode.removeChild(element)
      removed++
    }
  })

  return removed
}

const clickKnownSelectors = () => {
  var clicked = 0
  knownSelectorsToClick.forEach(params => {
    const element = document.querySelector(params.selector)
    if (element && document.location.host === params.host) {
      element.click()
      clicked++
    }
  })

  return clicked
}

const removeGoogleAdsIframe = () => {
  const iframes = document.querySelectorAll('iframe')

  if (iframes) {
    iframes.forEach(iframe => {
      const src = iframe.getAttribute('src')
      const id = iframe.getAttribute('id')
      if (src && src.includes('google') || id && id.includes('google')) {
        iframe.parentNode.removeChild(iframe)
      }
    })
  }
}

const removeKnownHrefOnA = () => {
  const as = document.querySelectorAll('a')

  if (as) {
    as.forEach(a => {
      const href = a.getAttribute('href')
      if (href) {
        knownHrefsToRemove.forEach(targetHref => {
          if (href.includes(targetHref) && a.parentNode) {
            a.parentNode.removeChild(a)
          }
        })
      }
    })
  }
}

const main = () => {
  const domain = document.location.host.replace(/.+\.(.+\..+)/, '$1')

  if (knownHostsToIgnore.includes(domain)) {
    return
  }

  removeKnownSelectors()
  clickKnownSelectors()
  removeGoogleAdsIframe()
  removeKnownHrefOnA()

  if (i < 50) {
    setTimeout(main, 1000)
  }
}

setTimeout(main, 500);

