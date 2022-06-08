import userStore from './user'
import counterStore from './counter'
const appStore = {}

export const registerStore = () => {
  appStore.userStore = userStore()
  appStore.counterStore = counterStore()
}

export default appStore