import { AppPluginProtocol } from '@fangcha/backend-kit'
import { _RouterState } from '@fangcha/backend-kit/lib/router'
import { CommonJobSpecs } from './CommonJobSpecs'
import { JobServer } from '@fangcha/job'

export interface JobWebOptions {
  jobServer: JobServer
}

export const JobWebPlugin = (options: JobWebOptions): AppPluginProtocol => {
  return {
    appWillLoad: () => {
      const routerApp = _RouterState.routerApp
      routerApp.addDocItem({
        name: 'Job SDK',
        pageURL: '/api-docs/v1/job-sdk',
        specs: CommonJobSpecs,
      })
      routerApp.addMiddlewareBeforeInit(async (ctx, next) => {
        ctx.jobServer = options.jobServer
        await next()
      })
    },
    appDidLoad: () => {},
  }
}
