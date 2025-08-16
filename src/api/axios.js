import axios from 'axios'

// 请求拦截器
axios.interceptors.request.use((config) => {
  console.log('请求URL:', config.url) // 打印请求 URL
  return config
})

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    console.log('响应数据:', response.data) // 打印响应数据
    return response
  },
  (error) => {
    console.error('请求异常:', error) // 捕获异常
    return Promise.reject(error)
  },
)

export default axios
