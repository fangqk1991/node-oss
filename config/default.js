module.exports = {
  Env: 'It will be rewritten by process.env.NODE_CONFIG_ENV or process.env.NODE_ENV',
  Tags: [],
  Oss: {
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
      appName: 'Oss Admin',
      colorPrimary: 'rgb(221 115 164)',
      ossParams: {
        defaultBucketName: 'fc-web-oss',
        defaultOssZone: 'datawich',
      },
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
    ossDB: {
      host: '127.0.0.1',
      port: 3306,
      database: 'task_db',
      username: 'root',
      password: '',
      dialect: 'mysql',
      timezone: '+08:00',
      logging: false,
    },
    ossDownloadDir: '/data/oss-zone/downloads',
    ossOptions: {
      Default: {
        visitor: {
          region: 'oss-cn-shanghai',
          accessKeyId: '__accessKeyId__',
          accessKeySecret: '<OSS accessKeySecret>',
          bucket: '__bucket__',
          secure: true,
        },
        uploader: {
          region: 'oss-cn-shanghai',
          accessKeyId: '__accessKeyId__',
          accessKeySecret: '<OSS accessKeySecret>',
          bucket: '__bucket__',
          secure: true,
        },
        uploadSignature: {
          accessKeyId: '__accessKeyId__',
          accessKeySecret: '<OSS accessKeySecret>',
          bucketURL: '<bucketURL>',
          timeout: 3000,
        },
        remoteRootDir: 'oss-staging',
        downloadRootDir: '/data/oss-zone/downloads',
      },
    },
  },
}
