import * as assert from 'assert'

export class TaskPages {
  public static ResourceTaskListRoute = '/oss-sdk/v1/resource-task'

  public static UploadTestRoute = '/v1/upload-test'

  public static buildRoute(route: string, params: { [p: string]: string | number } | (string | number)[]) {
    if (Array.isArray(params)) {
      let index = 0
      const url = route.replace(/:([_a-zA-Z][\w-]*)/g, () => {
        return `${params[index++]}`
      })
      assert.ok(index === params.length)
      return url
    }
    return route.replace(/:([_a-zA-Z][\w-]*)/g, (_, matchStr1) => {
      return `${params[matchStr1]}`
    })
  }
}
