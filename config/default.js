module.exports = {
  Env: 'It will be rewritten by process.env.NODE_CONFIG_ENV or process.env.NODE_ENV',
  Tags: [],
  Job: {
    configVersion: '0.0.0',

    adminBaseURL: 'http://localhost:3799',
    adminPort_frontend: 3799,
    adminPort: 3800,
    adminJwtKey: 'job_admin_jwt_key',
    adminJwtSecret: '<Task Random 32>',

    adminSSO: {
      baseURL: 'https://sso.example.com',
      clientId: '<clientId>',
      clientSecret: '<clientSecret>',
      authorizePath: '/api/v1/oauth/authorize',
      tokenPath: '/api/v1/oauth/token',
      logoutPath: '/api/v1/logout',
      scope: 'basic',
      callbackUri: 'http://localhost:2599/api-302/auth-sdk/v1/handle-sso',
      userInfoURL: 'https://sso.example.com/api/v1/oauth/user-info',
    },
    adminFrontendConfig: {
      appName: 'Job Admin',
      colorPrimary: 'rgb(221 115 164)',
    },
    userService: {
      urlBase: '<urlBase>',
      username: '<username>',
      password: '<password>',
    },
    useResque: false,
    useSchedule: false,
    jobResque: {
      redisHost: '127.0.0.1',
      redisPort: 31100,
      dynamicQueues: [],
    },
    jobDB: {
      host: '127.0.0.1',
      port: 3306,
      database: 'task_db',
      username: 'root',
      password: '',
      dialect: 'mysql',
      timezone: '+08:00',
      logging: false,
    },
  },
}
