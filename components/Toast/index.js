import Toast from './Toast.vue'

const toast = {}

toast.install = function (Vue) {
  const ToastConstructor = Vue.extend(Toast)
  const instance = new ToastConstructor()

  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$toast = (msg, duration = 3000) => {
    instance.message = msg
    instance.show = true

    setTimeout(() => {
      instance.show =false
    }, duration)
  }
}

export default toast