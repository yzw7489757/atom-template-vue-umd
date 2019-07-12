#! /usr/local/bin/node
const path = require('path')
const fs = require('fs')
const exec = require('child_process').execSync

const name = exec('git rev-parse --abbrev-ref HEAD').toString().trim()
const devUrl = ''
const testUrl = ''
const onlineUrl = ''
const PRO = path.join(__dirname, '.env.production')

let url = ''
switch (name) {
  case 'develop':
    url = devUrl
    break
  case 'testing':
    url = testUrl
    break
  case 'master':
    url = onlineUrl
    break
  default:
    url = devUrl
    break
}
const env = `
NODE_ENV="production"
ENV_CONFIG="prod"
VUE_APP_BASE_URL="/"
VUE_APP_JAVA_REQUEST_BASE_URL="${url}"
`

fs.open(PRO, 'w', (err, fd) => {
  const writeBuffer = Buffer.from(env)
  fs.write(fd, writeBuffer, 0, writeBuffer.length, 0, (err, written, buffer) => {
    if (err) return console.log(err)
    console.log('修改环境配置成功')
  })
})
