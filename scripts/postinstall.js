import fs from 'node:fs'

const lockfile = 'pnpm-lock.yaml'

// 移除 lockfile 在部署时，以免发生版本冲突错误
// eslint-disable-next-line node/prefer-global/process
if (fs.existsSync(lockfile) && process.env.DEPLOY_PAGES === '1') {
  fs.unlinkSync(lockfile)
  console.log(`Removed ${lockfile}`)
}
