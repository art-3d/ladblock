const knownSelectorsToRemove = [
  '.sidebar_right_ad',
  'yatag',
]
const knownSelectorsToClick = [
  { selector: '.close', host: 'dou.ua' },
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

const main = () => {
  removeKnownSelectors()
  clickKnownSelectors()
  removeGoogleAdsIframe()

  if (i < 50) {
    setTimeout(main, 1000)
  }
}

setTimeout(main, 500);

