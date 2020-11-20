import { createApp } from './createApp.js'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    
    let url = context.url
    router.push(url)

    /**
     * onReady
     * 该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
     * 这可以有效确保服务端渲染时服务端和客户端输出的一致。
     * 第二个参数 errorCallback 只在 2.4+ 支持。它会在初始化路由解析运行出错 (比如解析一个异步组件失败) 时被调用。
     */
    router.onReady(() => {
      /**
       * getMatchedComponents
       * 返回目标位置或是当前路由匹配的组件数组 (是数组的定义/构造类，不是实例)。通常在服务端渲染的数据预加载时使用
       */
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({code: 404})
      }
      resolve(app)
    }, reject)
  })
}
