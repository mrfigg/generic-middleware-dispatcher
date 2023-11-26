/*! @license generic-middleware-dispatcher v0.1.0
 *
 * MIT License
 *
 * Copyright (c) MrFigg
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type PositiveInteger<T extends number> = number extends T
  ? never
  : `${T}` extends `-${string}` | `${string}.${string}`
  ? never
  : T

type Length<T extends any[]> = T extends { length: infer L } ? L : never

type AnyTuple<L extends number, T extends any[] = []> = T extends {
  length: L
}
  ? T
  : AnyTuple<L, [...T, any]>

type Add<A extends number, B extends number> = Length<
  [...AnyTuple<A>, ...AnyTuple<B>]
>

export type Error = any

export type NextCallback = (err?: Error) => any

export type GeneralGenericMiddleware<TContexts extends any[]> = (
  ...args: [...Required<TContexts>, NextCallback]
) => any

export type ErrorHandlerGenericMiddleware<TContexts extends any[]> = (
  ...args: [Error, ...Required<TContexts>, NextCallback] & {
    length: Add<Required<TContexts>['length'], 2>
  }
) => any

export type GenericMiddleware<TContexts extends any[]> =
  | GeneralGenericMiddleware<TContexts>
  | ErrorHandlerGenericMiddleware<TContexts>

export type GenericMiddlewareDispatcherPrototype<TContexts extends any[]> = {
  /**
   * Dispatch middleware in the stack.
   */
  (...args: any[]): void
  /**
   * Add middleware to the end of the stack.
   *
   * @param middleware Middleware to add to the stack.
   */
  use: (...middleware: GenericMiddleware<Required<TContexts>>[]) => void
  /**
   * Add middleware to the stack at the given index.
   *
   * @param index Index to add middleware at.
   * @param middleware Middleware to add to the stack.
   */
  useAt: (
    index: number,
    ...middleware: GenericMiddleware<Required<TContexts>>[]
  ) => void
  /**
   * Add middleware to the start of the stack.
   *
   * @param middleware Middleware to add to the stack.
   */
  useFirst: (...middleware: GenericMiddleware<Required<TContexts>>[]) => void
  /**
   * Add middleware to the end of the stack.
   *
   * @param middleware Middleware to add to the stack.
   */
  useLast: (...middleware: GenericMiddleware<Required<TContexts>>[]) => void
  /**
   * Add middleware to the stack before the given middleware.
   *
   * @param beforeMiddleware A middleware already in the stack.
   * @param middleware Middleware to add to the stack.
   */
  useBefore: (
    beforeMiddleware: GenericMiddleware<Required<TContexts>>,
    ...middleware: GenericMiddleware<Required<TContexts>>[]
  ) => void
  /**
   * Add middleware to the stack after the given middleware.
   *
   * @param afterMiddleware A middleware already in the stack.
   * @param middleware Middleware to add to the stack.
   */
  useAfter: (
    afterMiddleware: GenericMiddleware<Required<TContexts>>,
    ...middleware: GenericMiddleware<Required<TContexts>>[]
  ) => void
}

export type GeneralGenericMiddlewareDispatcher<TContexts extends any[]> = {
  (...args: [...Required<TContexts>, NextCallback]): void
} & GenericMiddlewareDispatcherPrototype<TContexts>

export type ErrorHandlerGenericMiddlewareDispatcher<TContexts extends any[]> = {
  (
    ...args: [Error, ...Required<TContexts>, NextCallback] & {
      length: Add<Required<TContexts>['length'], 2>
    }
  ): void
} & GenericMiddlewareDispatcherPrototype<TContexts>

export type GenericMiddlewareDispatcher<TContexts extends any[]> =
  | GeneralGenericMiddlewareDispatcher<TContexts>
  | ErrorHandlerGenericMiddlewareDispatcher<TContexts>

// ()
export function createMiddlewareDispatcher<
  TContexts extends any[] & { length: 2 } = AnyTuple<2>,
>(): GeneralGenericMiddlewareDispatcher<Required<TContexts>>

export function createMiddlewareDispatcher<
  TContextsCount extends 2 = 2,
  TContexts extends any[] & {
    length: TContextsCount extends number ? TContextsCount : 0
  } = AnyTuple<TContextsCount extends number ? TContextsCount : 0>,
>(): GeneralGenericMiddlewareDispatcher<Required<TContexts>>

// (contextsCount)
export function createMiddlewareDispatcher<
  TContexts extends any[] = AnyTuple<2>,
>(
  contextsCount: PositiveInteger<
    Required<TContexts>['length'] extends number
      ? Required<TContexts>['length']
      : 0
  >
): GeneralGenericMiddlewareDispatcher<Required<TContexts>>

export function createMiddlewareDispatcher<
  TContextsCount extends number,
  TContexts extends any[] & {
    length: TContextsCount extends number
      ? `${TContextsCount}` extends `-${string}`
        ? 0
        : TContextsCount
      : 0
  } = AnyTuple<
    TContextsCount extends number
      ? `${TContextsCount}` extends `-${string}`
        ? 0
        : TContextsCount
      : 0
  >,
>(
  contextsCount: PositiveInteger<TContextsCount>
): GeneralGenericMiddlewareDispatcher<Required<TContexts>>

// (errorHandler)
export function createMiddlewareDispatcher<
  TContexts extends any[] & { length: 2 } = AnyTuple<2>,
>(errorHandler: false): GeneralGenericMiddlewareDispatcher<Required<TContexts>>

export function createMiddlewareDispatcher<
  TContextsCount extends 2 = 2,
  TContexts extends any[] & {
    length: TContextsCount extends number ? TContextsCount : 0
  } = AnyTuple<TContextsCount extends number ? TContextsCount : 0>,
>(errorHandler: false): GeneralGenericMiddlewareDispatcher<TContexts>

export function createMiddlewareDispatcher<
  TContexts extends any[] & { length: 2 } = AnyTuple<2>,
>(
  errorHandler: true
): ErrorHandlerGenericMiddlewareDispatcher<Required<TContexts>>

export function createMiddlewareDispatcher<
  TContextsCount extends 2 = 2,
  TContexts extends any[] & {
    length: TContextsCount extends number ? TContextsCount : 0
  } = AnyTuple<TContextsCount extends number ? TContextsCount : 0>,
>(errorHandler: true): ErrorHandlerGenericMiddlewareDispatcher<TContexts>

// (errorHandler, contextsCount)
export function createMiddlewareDispatcher<
  TContexts extends any[] = AnyTuple<2>,
>(
  errorHandler: false,
  contextsCount: PositiveInteger<
    Required<TContexts>['length'] extends number
      ? Required<TContexts>['length']
      : 0
  >
): GeneralGenericMiddlewareDispatcher<Required<TContexts>>

export function createMiddlewareDispatcher<
  TContextsCount extends number,
  TContexts extends any[] & {
    length: TContextsCount extends number
      ? `${TContextsCount}` extends `-${string}`
        ? 0
        : TContextsCount
      : 0
  } = AnyTuple<
    TContextsCount extends number
      ? `${TContextsCount}` extends `-${string}`
        ? 0
        : TContextsCount
      : 0
  >,
>(
  errorHandler: false,
  contextsCount: PositiveInteger<TContextsCount>
): GeneralGenericMiddlewareDispatcher<Required<TContexts>>

export function createMiddlewareDispatcher<
  TContexts extends any[] = AnyTuple<2>,
>(
  errorHandler: true,
  contextsCount: PositiveInteger<
    Required<TContexts>['length'] extends number
      ? Required<TContexts>['length']
      : 0
  >
): ErrorHandlerGenericMiddlewareDispatcher<Required<TContexts>>

export function createMiddlewareDispatcher<
  TContextsCount extends number,
  TContexts extends any[] & {
    length: TContextsCount extends number
      ? `${TContextsCount}` extends `-${string}`
        ? 0
        : TContextsCount
      : 0
  } = AnyTuple<
    TContextsCount extends number
      ? `${TContextsCount}` extends `-${string}`
        ? 0
        : TContextsCount
      : 0
  >,
>(
  errorHandler: true,
  contextsCount: PositiveInteger<TContextsCount>
): ErrorHandlerGenericMiddlewareDispatcher<Required<TContexts>>

// (contextsCount, errorHandler)
export function createMiddlewareDispatcher<
  TContexts extends any[] = AnyTuple<2>,
>(
  contextsCount: PositiveInteger<
    Required<TContexts>['length'] extends number
      ? Required<TContexts>['length']
      : 0
  >,
  errorHandler: false
): GeneralGenericMiddlewareDispatcher<Required<TContexts>>

export function createMiddlewareDispatcher<
  TContextsCount extends number,
  TContexts extends any[] & {
    length: TContextsCount extends number
      ? `${TContextsCount}` extends `-${string}`
        ? 0
        : TContextsCount
      : 0
  } = AnyTuple<
    TContextsCount extends number
      ? `${TContextsCount}` extends `-${string}`
        ? 0
        : TContextsCount
      : 0
  >,
>(
  contextsCount: PositiveInteger<TContextsCount>,
  errorHandler: false
): GeneralGenericMiddlewareDispatcher<Required<TContexts>>

export function createMiddlewareDispatcher<
  TContexts extends any[] = AnyTuple<2>,
>(
  contextsCount: PositiveInteger<
    Required<TContexts>['length'] extends number
      ? Required<TContexts>['length']
      : 0
  >,
  errorHandler: true
): ErrorHandlerGenericMiddlewareDispatcher<Required<TContexts>>

export function createMiddlewareDispatcher<
  TContextsCount extends number,
  TContexts extends any[] & {
    length: TContextsCount extends number
      ? `${TContextsCount}` extends `-${string}`
        ? 0
        : TContextsCount
      : 0
  } = AnyTuple<
    TContextsCount extends number
      ? `${TContextsCount}` extends `-${string}`
        ? 0
        : TContextsCount
      : 0
  >,
>(
  contextsCount: PositiveInteger<TContextsCount>,
  errorHandler: true
): ErrorHandlerGenericMiddlewareDispatcher<Required<TContexts>>

// (...args)
/**
 * Returns a new generic middleware dispatcher.
 */
export function createMiddlewareDispatcher<
  TContexts extends any[] = AnyTuple<2>,
>(...args: any[]): GenericMiddlewareDispatcher<Required<TContexts>> {
  let contextsCount = 2
  let errorHandler = false

  for (let i = 0; i < 2; i++) {
    const arg = args[i]

    if (typeof arg === 'number' && Number.isInteger(arg) && arg >= 0) {
      contextsCount = arg

      continue
    }

    if (typeof arg === 'boolean') {
      errorHandler = arg

      continue
    }

    if (arg === undefined) {
      continue
    }

    throw new TypeError(
      `Expected argument[${i}] to be a positive integer, a boolean value, or undefined`
    )
  }

  const stack: GenericMiddleware<Required<TContexts>>[] = []

  const dispatcher = Object.assign(
    (...args: any[]) => {
      let storedErr: Error
      const contexts = args.slice()
      let dispatcherNextCallback: NextCallback

      if (
        args.length >= dispatcher.length &&
        args[dispatcher.length - 1] !== undefined
      ) {
        if (typeof args[dispatcher.length - 1] === 'function') {
          dispatcherNextCallback = args[dispatcher.length - 1]
        } else {
          throw new TypeError(
            `Expected argument[${
              dispatcher.length - 1
            }] to be a function or undefined`
          )
        }
      }

      if (errorHandler) {
        storedErr = contexts.shift()
      }

      contexts.length = contextsCount

      const generalMiddlewareLength = contextsCount + 1

      let i = 0

      const nextInStack: NextCallback = async function nextInStack(
        err?: Error
      ): Promise<void> {
        storedErr = err

        let progressed = false

        const middlewareNextCallback: NextCallback = function callback(
          err?: Error
        ): void {
          if (progressed) {
            return
          }

          progressed = true

          nextInStack(err)
        }

        while (i < stack.length) {
          const middleware = stack[i]

          i++

          try {
            if (
              storedErr !== undefined &&
              middleware.length > generalMiddlewareLength
            ) {
              // @ts-ignore
              return await middleware.apply(undefined, [
                storedErr,
                ...contexts,
                middlewareNextCallback,
              ])
            }

            if (
              storedErr === undefined &&
              middleware.length <= generalMiddlewareLength
            ) {
              // @ts-ignore
              return await middleware.apply(undefined, [
                ...contexts,
                middlewareNextCallback,
              ])
            }
          } catch (err) {
            if (progressed) {
              return
            }

            progressed = true

            nextInStack(err)

            return
          }
        }

        if (dispatcherNextCallback) {
          dispatcherNextCallback(storedErr)
        }
      }

      nextInStack(storedErr)
    },
    {
      use(
        this: GenericMiddlewareDispatcher<Required<TContexts>>,
        ...middleware: GenericMiddleware<Required<TContexts>>[]
      ) {
        // @ts-ignore
        return this.useLast.apply(this, middleware)
      },
      useAt(
        this: GenericMiddlewareDispatcher<Required<TContexts>>,
        index: number,
        ...middleware: GenericMiddleware<Required<TContexts>>[]
      ) {
        if (typeof index !== 'number' || !Number.isInteger(index)) {
          throw new TypeError(`Expected index to be an integer`)
        }

        for (const [i, mid] of middleware.entries()) {
          if (typeof mid !== 'function') {
            throw new TypeError(`Expected middleware[${i}] to be a function`)
          }
        }

        // @ts-ignore
        stack.splice.apply(stack, [index, 0].concat(middleware))
      },
      useFirst(
        this: GenericMiddlewareDispatcher<Required<TContexts>>,
        ...middleware: GenericMiddleware<Required<TContexts>>[]
      ) {
        // @ts-ignore
        return this.useAt.apply(this, [0].concat(middleware))
      },
      useLast(
        this: GenericMiddlewareDispatcher<Required<TContexts>>,
        ...middleware: GenericMiddleware<Required<TContexts>>[]
      ) {
        // @ts-ignore
        return this.useAt.apply(this, [stack.length].concat(middleware))
      },
      useBefore(
        this: GenericMiddlewareDispatcher<Required<TContexts>>,
        beforeMiddleware: GenericMiddleware<Required<TContexts>>,
        ...middleware: GenericMiddleware<Required<TContexts>>[]
      ) {
        if (typeof beforeMiddleware !== 'function') {
          throw new TypeError(`Expected beforeMiddleware to be a function`)
        }

        const index = stack.indexOf(beforeMiddleware)

        if (index === -1) {
          throw new Error(`beforeMiddleware not found in stack`)
        }

        // @ts-ignore
        return this.useAt.apply(this, [index].concat(middleware))
      },
      useAfter(
        this: GenericMiddlewareDispatcher<Required<TContexts>>,
        afterMiddleware: GenericMiddleware<Required<TContexts>>,
        ...middleware: GenericMiddleware<Required<TContexts>>[]
      ) {
        if (typeof afterMiddleware !== 'function') {
          throw new TypeError(`Expected afterMiddleware to be a function`)
        }

        const index = stack.lastIndexOf(afterMiddleware)

        if (index === -1) {
          throw new Error(`afterMiddleware not found in stack`)
        }

        // @ts-ignore
        return this.useAt.apply(this, [index + 1].concat(middleware))
      },
    }
  )

  Object.defineProperty(dispatcher, '_errorHandler', {
    value: errorHandler,
    writable: false,
  })

  Object.defineProperty(dispatcher, '_contextsCount', {
    value: contextsCount,
    writable: false,
  })

  Object.defineProperty(dispatcher, '_stack', {
    value: stack,
    writable: false,
  })

  Object.defineProperty(dispatcher, 'length', {
    value: (errorHandler ? 1 : 0) + contextsCount + 1,
    writable: false,
  })

  return dispatcher
}

export default createMiddlewareDispatcher
