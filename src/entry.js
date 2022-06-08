import errorHandle from '@/utils/errorHandle'

export default {
  install(app) {
    app.config.errorHandler = errorHandle
  }
}