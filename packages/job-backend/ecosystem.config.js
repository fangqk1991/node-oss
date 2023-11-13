const { makeRunningConfig } = require('fc-config/config.utils')
const path = require('path')
const rootDir = path.resolve(__dirname, '../..')

const appList = [
  {
    name: 'job-admin',
    script: `${rootDir}/packages/job-backend/dist/job-admin.js`,
    error_file: '/data/logs/job/job-admin-err.log',
    out_file: '/data/logs/job/job-admin-out.log',
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

const resqueApp = {
  name: 'job-resque',
  script: `${rootDir}/packages/job-backend/dist/job-resque.js`,
  error_file: '/data/logs/job/job-resque-err.log',
  out_file: '/data/logs/job/job-resque-out.log',
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
}

const scheduleApp = {
  name: 'job-schedule',
  script: `${rootDir}/packages/job-backend/dist/job-schedule.js`,
  error_file: '/data/logs/job/job-schedule-err.log',
  out_file: '/data/logs/job/job-schedule-out.log',
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
}

const config = makeRunningConfig()
if (!config.Tags.includes('Backup')) {
  if (config.Job.useResque) {
    appList.push(resqueApp)
  }
  if (config.Job.useSchedule) {
    appList.push(scheduleApp)
  }
}

module.exports = {
  apps: appList,
}
