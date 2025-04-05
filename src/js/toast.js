let toastQueue = []
let toastCount = 0

function injectStyles() {
    const style = document.createElement('style')
    style.textContent = `
    .toast-notification {
      position: fixed;
      right: 20px;
      padding: 15px 25px;
      background: #333;
      color: white;
      border-radius: 4px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.2);
      z-index: 1000;
      transition: 
        opacity 0.3s,
        bottom 0.3s ease-out;
      min-height: 60px;
      display: flex;
      align-items: center;
      max-width: 300px;
      word-break: break-word;
    }

    .toast-notification.fade-out {
      opacity: 0;
      transform: translateY(10px);
    }
  `
    document.head.appendChild(style)
}

let stylesInjected = false

export function showToast(message, duration = 3000) {
    if (!stylesInjected) {
        injectStyles()
        stylesInjected = true
    }

    const toast = document.createElement('div')
    toast.className = 'toast-notification'
    toast.textContent = message
    toast.dataset.id = `toast-${Date.now()}-${toastCount++}`

    toastQueue.push(toast)

    positionToasts()

    document.body.appendChild(toast)

    setTimeout(() => {
        toast.classList.add('fade-out')
        setTimeout(() => {
            toast.remove()
            toastQueue = toastQueue.filter(t => t.dataset.id !== toast.dataset.id)
            positionToasts()
        }, 300)
    }, duration)
}

function positionToasts() {
    const bottomOffset = 20
    const toastHeight = 60
    const gap = 10

    toastQueue.forEach((toast, index) => {
        const offset = bottomOffset + (toastQueue.length - 1 - index) * (toastHeight + gap)
        toast.style.bottom = `${offset}px`
        toast.style.right = '20px'
    })
}