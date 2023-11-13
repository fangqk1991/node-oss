import { IResqueTask } from '@fangcha/resque'

export class SomeTask implements IResqueTask {
  public async perform() {
    console.info('SomeTask...')
  }
}
