import { createMiddlewareDispatcher } from '../src/index'

jest.useFakeTimers()

describe('generic-middleware-dispatcher JavaScript execution:', () => {
  test('createMiddlewareDispatcher() should return a function with length 3', () => {
    let test_var = createMiddlewareDispatcher()

    expect(test_var).toEqual(expect.any(Function))
    expect(test_var).toHaveLength(3)
  })

  test.each([[-1], ['2'], [null]])(
    'createMiddlewareDispatcher(%i) should throw a TypeError',
    (a) => {
      expect(() => {
        // @ts-ignore
        let test_var = createMiddlewareDispatcher(a)
      }).toThrow(TypeError)
    }
  )

  test.each([
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [false, 3],
    [true, 4],
  ])(
    'createMiddlewareDispatcher(%i) should return a function with length %i',
    (a, expected) => {
      // @ts-ignore
      let test_var = createMiddlewareDispatcher(a)

      expect(test_var).toEqual(expect.any(Function))
      expect(test_var).toHaveLength(expected)
    }
  )

  test.each([
    [false, -1],
    [-1, false],
    [true, -1],
    [-1, true],
    [false, '2'],
    ['2', false],
    [true, '2'],
    ['2', true],
    [false, null],
    [null, false],
    [true, null],
    [null, true],
  ])('createMiddlewareDispatcher(%i, %i) should throw a TypeError', (a, b) => {
    expect(() => {
      // @ts-ignore
      let test_var = createMiddlewareDispatcher(a, b)
    }).toThrow(TypeError)
  })

  test.each([
    [false, 0, 1],
    [false, 1, 2],
    [false, 2, 3],
    [false, 3, 4],
    [0, false, 1],
    [1, false, 2],
    [2, false, 3],
    [3, false, 4],
    [true, 0, 2],
    [true, 1, 3],
    [true, 2, 4],
    [true, 3, 5],
    [0, true, 2],
    [1, true, 3],
    [2, true, 4],
    [3, true, 5],
  ])(
    'createMiddlewareDispatcher(%i, %i) should return a function with length %i',
    (a, b, expected) => {
      // @ts-ignore
      let test_var = createMiddlewareDispatcher(a, b)

      expect(test_var).toEqual(expect.any(Function))
      expect(test_var).toHaveLength(expected)
    }
  )

  test('#use() should throw a TypeError when called with invalid arguments', () => {
    expect(() => {
      let app = createMiddlewareDispatcher(0)

      // @ts-ignore
      app.use('notAFunction')
    }).toThrow(TypeError)

    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()
      let mid2 = jest.fn()

      // @ts-ignore
      app.use(mid1, 'notAFunction', mid2)
    }).toThrow(TypeError)
  })

  test('#use(...fns) should add fns to tail', () => {
    let app = createMiddlewareDispatcher(0)

    // @ts-ignore
    expect(app._stack).toEqual([])

    let mid1 = jest.fn()

    app.use(mid1)

    // @ts-ignore
    expect(app._stack).toEqual([mid1])

    let mid2 = jest.fn()

    app.use(mid2)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid2])

    let mid3 = jest.fn()

    app.use(mid3)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid2, mid3])

    let mid4 = jest.fn()
    let mid5 = jest.fn()

    app.use(mid4, mid5)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid2, mid3, mid4, mid5])

    let mid6 = jest.fn()
    let mid7 = jest.fn()
    let mid8 = jest.fn()

    app.use(mid6, mid7, mid8)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid2, mid3, mid4, mid5, mid6, mid7, mid8])
  })

  test('#useAt() should throw a TypeError when called with invalid arguments', () => {
    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()

      // @ts-ignore
      app.useAt('notAnInteger', mid1)
    }).toThrow(TypeError)

    expect(() => {
      let app = createMiddlewareDispatcher(0)

      // @ts-ignore
      app.useAt(0, 'notAFunction')
    }).toThrow(TypeError)

    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()
      let mid2 = jest.fn()

      // @ts-ignore
      app.use(0, mid1, 'notAFunction', mid2)
    }).toThrow(TypeError)
  })

  test('#useAt(index, ...fns) should add fns at index', () => {
    let app = createMiddlewareDispatcher(0)

    // @ts-ignore
    expect(app._stack).toEqual([])

    let mid1 = jest.fn()

    app.useAt(0, mid1)

    // @ts-ignore
    expect(app._stack).toEqual([mid1])

    let mid2 = jest.fn()

    app.useAt(0, mid2)

    // @ts-ignore
    expect(app._stack).toEqual([mid2, mid1])

    let mid3 = jest.fn()

    app.useAt(2, mid3)

    // @ts-ignore
    expect(app._stack).toEqual([mid2, mid1, mid3])

    let mid4 = jest.fn()
    let mid5 = jest.fn()

    app.useAt(1, mid4, mid5)

    // @ts-ignore
    expect(app._stack).toEqual([mid2, mid4, mid5, mid1, mid3])

    let mid6 = jest.fn()
    let mid7 = jest.fn()
    let mid8 = jest.fn()

    app.useAt(2, mid6, mid7, mid8)

    // @ts-ignore
    expect(app._stack).toEqual([mid2, mid4, mid6, mid7, mid8, mid5, mid1, mid3])
  })

  test('#useFirst() should throw a TypeError when called with invalid arguments', () => {
    expect(() => {
      let app = createMiddlewareDispatcher(0)

      // @ts-ignore
      app.useFirst('notAFunction')
    }).toThrow(TypeError)

    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()
      let mid2 = jest.fn()

      // @ts-ignore
      app.useFirst(mid1, 'notAFunction', mid2)
    }).toThrow(TypeError)
  })

  test('#useFirst(...fns) should add fns to head', () => {
    let app = createMiddlewareDispatcher(0)

    // @ts-ignore
    expect(app._stack).toEqual([])

    let mid1 = jest.fn()

    app.useFirst(mid1)

    // @ts-ignore
    expect(app._stack).toEqual([mid1])

    let mid2 = jest.fn()

    app.useFirst(mid2)

    // @ts-ignore
    expect(app._stack).toEqual([mid2, mid1])

    let mid3 = jest.fn()

    app.useFirst(mid3)

    // @ts-ignore
    expect(app._stack).toEqual([mid3, mid2, mid1])

    let mid4 = jest.fn()
    let mid5 = jest.fn()

    app.useFirst(mid4, mid5)

    // @ts-ignore
    expect(app._stack).toEqual([mid4, mid5, mid3, mid2, mid1])

    let mid6 = jest.fn()
    let mid7 = jest.fn()
    let mid8 = jest.fn()

    app.useFirst(mid6, mid7, mid8)

    // @ts-ignore
    expect(app._stack).toEqual([mid6, mid7, mid8, mid4, mid5, mid3, mid2, mid1])
  })

  test('#useFirst() should throw a TypeError when called with invalid arguments', () => {
    expect(() => {
      let app = createMiddlewareDispatcher(0)

      // @ts-ignore
      app.useLast('notAFunction')
    }).toThrow(TypeError)

    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()
      let mid2 = jest.fn()

      // @ts-ignore
      app.useLast(mid1, 'notAFunction', mid2)
    }).toThrow(TypeError)
  })

  test('#useLast(...fns) should add fns to tail', () => {
    let app = createMiddlewareDispatcher(0)

    // @ts-ignore
    expect(app._stack).toEqual([])

    let mid1 = jest.fn()

    app.useLast(mid1)

    // @ts-ignore
    expect(app._stack).toEqual([mid1])

    let mid2 = jest.fn()

    app.useLast(mid2)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid2])

    let mid3 = jest.fn()

    app.useLast(mid3)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid2, mid3])

    let mid4 = jest.fn()
    let mid5 = jest.fn()

    app.useLast(mid4, mid5)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid2, mid3, mid4, mid5])

    let mid6 = jest.fn()
    let mid7 = jest.fn()
    let mid8 = jest.fn()

    app.useLast(mid6, mid7, mid8)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid2, mid3, mid4, mid5, mid6, mid7, mid8])
  })

  test('#useBefore() should throw a TypeError when called with invalid arguments', () => {
    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()

      // @ts-ignore
      app.useBefore('notAFunction', mid1)
    }).toThrow(TypeError)

    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()

      app.use(mid1)

      // @ts-ignore
      app.useBefore(mid1, 'notAFunction')
    }).toThrow(TypeError)

    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()
      let mid2 = jest.fn()
      let mid3 = jest.fn()

      app.use(mid1)

      // @ts-ignore
      app.useBefore(mid1, mid2, 'notAFunction', mid3)
    }).toThrow(TypeError)
  })

  test('#useBefore(beforeFn, ...fns) should throw an error when beforeFn is not found in stack', () => {
    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()
      let mid2 = jest.fn()

      // @ts-ignore
      app.useBefore(mid1, mid2)
    }).toThrow(Error)
  })

  test('#useBefore(beforeFn, ...fns) should add fns ahead of beforeFn', () => {
    let app = createMiddlewareDispatcher(0)

    // @ts-ignore
    expect(app._stack).toEqual([])

    let mid1 = jest.fn()

    app.use(mid1)

    // @ts-ignore
    expect(app._stack).toEqual([mid1])

    let mid2 = jest.fn()

    app.useBefore(mid1, mid2)

    // @ts-ignore
    expect(app._stack).toEqual([mid2, mid1])

    let mid3 = jest.fn()

    app.useBefore(mid1, mid3)

    // @ts-ignore
    expect(app._stack).toEqual([mid2, mid3, mid1])

    let mid4 = jest.fn()
    let mid5 = jest.fn()

    app.useBefore(mid3, mid4, mid5)

    // @ts-ignore
    expect(app._stack).toEqual([mid2, mid4, mid5, mid3, mid1])

    let mid6 = jest.fn()
    let mid7 = jest.fn()
    let mid8 = jest.fn()

    app.useBefore(mid2, mid6, mid7, mid8)

    // @ts-ignore
    expect(app._stack).toEqual([mid6, mid7, mid8, mid2, mid4, mid5, mid3, mid1])
  })

  test('#useAfter() should throw a TypeError when called with invalid arguments', () => {
    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()

      // @ts-ignore
      app.useAfter('notAFunction', mid1)
    }).toThrow(TypeError)

    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()

      app.use(mid1)

      // @ts-ignore
      app.useAfter(mid1, 'notAFunction')
    }).toThrow(TypeError)

    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()
      let mid2 = jest.fn()
      let mid3 = jest.fn()

      app.use(mid1)

      // @ts-ignore
      app.useAfter(mid1, mid2, 'notAFunction', mid3)
    }).toThrow(TypeError)
  })

  test('#useAfter(afterFn, ...fns) should throw an error when afterFn is not found in stack', () => {
    expect(() => {
      let app = createMiddlewareDispatcher(0)

      let mid1 = jest.fn()
      let mid2 = jest.fn()

      // @ts-ignore
      app.useAfter(mid1, mid2)
    }).toThrow(Error)
  })

  test('#useAfter(afterFn, ...fns) should add fns behind afterFn', () => {
    let app = createMiddlewareDispatcher(0)

    // @ts-ignore
    expect(app._stack).toEqual([])

    let mid1 = jest.fn()

    app.use(mid1)

    // @ts-ignore
    expect(app._stack).toEqual([mid1])

    let mid2 = jest.fn()

    app.useAfter(mid1, mid2)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid2])

    let mid3 = jest.fn()

    app.useAfter(mid1, mid3)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid3, mid2])

    let mid4 = jest.fn()
    let mid5 = jest.fn()

    app.useAfter(mid3, mid4, mid5)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid3, mid4, mid5, mid2])

    let mid6 = jest.fn()
    let mid7 = jest.fn()
    let mid8 = jest.fn()

    app.useAfter(mid2, mid6, mid7, mid8)

    // @ts-ignore
    expect(app._stack).toEqual([mid1, mid3, mid4, mid5, mid2, mid6, mid7, mid8])
  })

  test('errors passed to next callback in middleware should be caught', async () => {
    expect.assertions(8)

    let app = createMiddlewareDispatcher(0)

    let mid1 = jest.fn((next) => {
      next(new Error('Test Error'))
    })

    let mid2 = jest.fn((next) => {
      next()
    })

    let mid3 = jest.fn((err, next) => {
      next(err)
    })

    app.use(mid1)
    app.use(mid2)
    app.use(mid3)

    expect(mid1).not.toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).not.toHaveBeenCalled()

    let err = await new Promise((resolve) => {
      app(resolve)
    })

    expect(mid1).toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).toHaveBeenCalled()

    expect(err).toBeInstanceOf(Error)
    // @ts-ignore
    expect(err?.message).toBe('Test Error')
  })

  test('errors thrown in synchronous middleware should be caught', async () => {
    expect.assertions(8)

    let app = createMiddlewareDispatcher(0)

    let mid1 = jest.fn((next) => {
      throw new Error('Test Error')
    })

    let mid2 = jest.fn((next) => {
      next()
    })

    let mid3 = jest.fn((err, next) => {
      next(err)
    })

    app.use(mid1)
    app.use(mid2)
    app.use(mid3)

    expect(mid1).not.toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).not.toHaveBeenCalled()

    let err = await new Promise((resolve) => {
      app(resolve)
    })

    expect(mid1).toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).toHaveBeenCalled()

    expect(err).toBeInstanceOf(Error)
    // @ts-ignore
    expect(err?.message).toBe('Test Error')
  })

  test('errors thrown in asynchronous middleware should be caught', async () => {
    expect.assertions(8)

    let app = createMiddlewareDispatcher(0)

    let mid1 = jest.fn(async (next) => {
      throw new Error('Test Error')
    })

    let mid2 = jest.fn(async (next) => {
      next()
    })

    let mid3 = jest.fn(async (err, next) => {
      next(err)
    })

    app.use(mid1)
    app.use(mid2)
    app.use(mid3)

    expect(mid1).not.toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).not.toHaveBeenCalled()

    let err = await new Promise((resolve) => {
      app(resolve)
    })

    expect(mid1).toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).toHaveBeenCalled()

    expect(err).toBeInstanceOf(Error)
    // @ts-ignore
    expect(err?.message).toBe('Test Error')
  })

  test('middleware should be run sequentially', () => {
    let app = createMiddlewareDispatcher(0)

    let mid1 = jest.fn((next) => {
      setTimeout(next, 1000)
    })

    let mid2 = jest.fn((next) => {
      setTimeout(next, 1000)
    })

    let mid3 = jest.fn((next) => {
      setTimeout(next, 1000)
    })

    let end = jest.fn()

    app.use(mid1)
    app.use(mid2)
    app.use(mid3)

    expect(mid1).not.toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).not.toHaveBeenCalled()
    expect(end).not.toHaveBeenCalled()

    app(end)

    expect(mid1).toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).not.toHaveBeenCalled()
    expect(end).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()

    expect(mid1).toHaveBeenCalled()
    expect(mid2).toHaveBeenCalled()
    expect(mid3).not.toHaveBeenCalled()
    expect(end).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()

    expect(mid1).toHaveBeenCalled()
    expect(mid2).toHaveBeenCalled()
    expect(mid3).toHaveBeenCalled()
    expect(end).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()

    expect(mid1).toHaveBeenCalled()
    expect(mid2).toHaveBeenCalled()
    expect(mid3).toHaveBeenCalled()
    expect(end).toHaveBeenCalled()
  })

  test('only error handling middleware should be called with errors', () => {
    let app = createMiddlewareDispatcher(0)

    let mid1 = jest.fn((next) => {
      next(new Error('Test Error 1'))
    })

    let mid2 = jest.fn((next) => {
      next()
    })

    let mid3 = jest.fn((err, next) => {
      next(err)
    })

    let mid4 = jest.fn((next) => {
      next()
    })

    let mid5 = jest.fn((err, next) => {
      next()
    })

    let mid6 = jest.fn((next) => {
      next()
    })

    let mid7 = jest.fn((next) => {
      next(new Error('Test Error 2'))
    })

    let mid8 = jest.fn((next) => {
      next()
    })

    let mid9 = jest.fn((err, next) => {
      next()
    })

    let end = jest.fn()

    app.use(mid1)
    app.use(mid2)
    app.use(mid3)
    app.use(mid4)
    app.use(mid5)
    app.use(mid6)
    app.use(mid7)
    app.use(mid8)
    app.use(mid9)

    expect(mid1).not.toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).not.toHaveBeenCalled()
    expect(mid4).not.toHaveBeenCalled()
    expect(mid5).not.toHaveBeenCalled()
    expect(mid6).not.toHaveBeenCalled()
    expect(mid7).not.toHaveBeenCalled()
    expect(mid8).not.toHaveBeenCalled()
    expect(mid9).not.toHaveBeenCalled()
    expect(end).not.toHaveBeenCalled()

    app(end)

    expect(mid1).toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).toHaveBeenCalled()
    expect(mid4).not.toHaveBeenCalled()
    expect(mid5).toHaveBeenCalled()
    expect(mid6).toHaveBeenCalled()
    expect(mid7).toHaveBeenCalled()
    expect(mid8).not.toHaveBeenCalled()
    expect(mid9).toHaveBeenCalled()
    expect(end).toHaveBeenCalled()
  })

  test('contexts should be correctly passed to middleware', () => {
    expect.assertions(3)

    let app1 = createMiddlewareDispatcher(1)

    let context1 = { context1: 'context1' }

    app1.use((midContext1: any) => {
      expect(midContext1).toBe(context1)
    })

    app1(context1)

    let app2 = createMiddlewareDispatcher(2)

    let context2 = { context2: 'context2' }
    let context3 = { context3: 'context3' }

    app2.use((midContext2: any, midContext3: any) => {
      expect(midContext2).toBe(context2)
      expect(midContext3).toBe(context3)
    })

    app2(context2, context3)
  })

  test('middleware dispatcher should be a valid middleware', () => {
    expect.assertions(5)

    let app1 = createMiddlewareDispatcher(1)
    let app2 = createMiddlewareDispatcher(1)
    let app3 = createMiddlewareDispatcher(1, true)
    let app4 = createMiddlewareDispatcher(1)

    let context1 = { context1: 'context1' }

    let mid1 = jest.fn((midContext1, next) => {
      expect(midContext1).toBe(context1)

      next()
    })

    let mid2 = jest.fn((midContext1, next) => {
      next()
    })

    let mid3 = jest.fn((midContext1, next) => {
      expect(midContext1).toBe(context1)

      next()
    })

    app1.use(app2)
    app1.use(app3)
    app1.use(app4)

    app2.use(mid1)
    app3.use(mid2)
    app4.use(mid3)

    app1(context1)

    expect(mid1).toHaveBeenCalled()
    expect(mid2).not.toHaveBeenCalled()
    expect(mid3).toHaveBeenCalled()
  })
})
