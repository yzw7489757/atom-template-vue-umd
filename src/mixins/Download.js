import downloadFile from '@/api/downloadFile'

export default {
  methods: {
    /**
     * 项目文件下载处理方法
     * @param { Number } sign 下载标记,
     * 用于说明是什么下载方式 1 审计Excel导出，2 审单文件下载 3 审单规则处理之后的Excel导出
     * @param { Array[any] } downloadParams 下载参数
     */
    triggerToDownloadFile(sign, ...downloadParams) {
      return new Promise((resolve, reject) => {
        switch (sign) {
          case 1:
            downloadFile.xxx(downloadParams)
            resolve(true)
            break
          default:
            console.error('下载标记不匹配, 请检查下载方法逻辑')
        }
      })
    }
  }
}
