import { JobResque } from '../../src/services/JobResque'

describe('Test JobResque.test.ts', () => {
  it(`enqueue_SomeTask`, async () => {
    await JobResque.enqueue_SomeTask()
  })
})
