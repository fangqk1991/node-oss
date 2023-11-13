import { ResqueProtocol } from './ResqueProtocol'
import { FCMaster, Resque } from '@fangcha/resque'
import { ResqueObserverHelper } from './ResqueObserverHelper'
import { AppPluginProtocol } from '@fangcha/backend-kit'

export const ResqueSdkPlugin = (options: ResqueProtocol): AppPluginProtocol => {
  return {
    appDidLoad: (app) => {
      if (!options.observer && options.jobServer) {
        options.observer = ResqueObserverHelper.makeTypicalObserver(options.jobServer.CommonJob, options)
      }
      Resque.addObserver(options.observer || ResqueObserverHelper.makeDefaultObserver(options))

      for (const plugin of app.plugins) {
        if (plugin.resqueModuleMap) {
          options.moduleMapData = {
            ...options.moduleMapData,
            ...plugin.resqueModuleMap,
          }
        }
      }

      const master = new FCMaster(options)
      master.run()
    },
  }
}
