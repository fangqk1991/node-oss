const path = require('path')
const rootDir = path.resolve(__dirname, '../..')

const appList = [
  {
    name: 'oss-admin',
    script: `${rootDir}/packages/oss-backend/dist/oss-admin.js`,
    error_file: '/data/logs/job/oss-admin-err.log',
    out_file: '/data/logs/job/oss-admin-out.log',
    exec_mode: 'fork',
    listen_timeout: 10000,
    log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
    env: {
      CODE_VERSION: 'COMMIT_SHA',
      NODE_ENV: 'development',
      NODE_CONFIG_ENV: 'development',
    },
    env_staging: {
      NODE_ENV: 'staging',
      NODE_CONFIG_ENV: 'staging',
    },
    env_production: {
      NODE_ENV: 'production',
      NODE_CONFIG_ENV: 'production',
    },
  },
]

module.exports = {
  apps: appList,
}
