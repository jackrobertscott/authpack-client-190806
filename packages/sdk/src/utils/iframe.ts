export const createIFrame = (url: string) => {
  const iframe = document.createElement('iframe')
  iframe.src = url
  iframe.width = '100%'
  iframe.height = '100%'
  iframe.style.border = 'none'
  iframe.style.boxShadow = 'none'
  iframe.style.position = 'fixed'
  iframe.style.top = '0'
  iframe.style.bottom = '0'
  iframe.style.right = '0'
  iframe.style.left = '0'
  iframe.style.zIndex = '1000'
  iframe.style.transition = '200ms'
  iframe.style.pointerEvents = 'none'
  return iframe
}
