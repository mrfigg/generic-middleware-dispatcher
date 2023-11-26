import {
  NextCallback,
  GeneralGenericMiddleware,
  ErrorHandlerGenericMiddleware,
  GenericMiddleware,
  GeneralGenericMiddlewareDispatcher,
  ErrorHandlerGenericMiddlewareDispatcher,
  createMiddlewareDispatcher,
} from '../src/index'

// express type mocks
type Req = {
  reqValue: number
}
type Res = {
  resValue: number
}
// socket.io type mocks
type Socket = {
  socketValue: number
}

describe('generic-middleware-dispatcher TypeScript enforcement:', () => {
  describe('NextCallback', () => {
    let test_var: NextCallback

    test(" = 'notAFunction' should fail", () => {
      // @dts-jest:fail
      test_var = 'notAFunction'
    })

    test(' = () => {} should pass', () => {
      // @dts-jest:pass
      test_var = () => {}
    })

    test(' = (err: any) => {} should pass', () => {
      // @dts-jest:pass
      test_var = (err: any) => {}
    })

    test(' = (err?: any) => {} should pass', () => {
      // @dts-jest:pass
      test_var = (err?: any) => {}
    })

    test(' = (err: any, other: any) => {} should fail', () => {
      // @dts-jest:fail
      test_var = (err: any, other: any) => {}
    })
  })

  describe('GeneralGenericMiddleware', () => {
    test('should fail when untyped', () => {
      // @dts-jest:fail
      let test_var_0: GeneralGenericMiddleware
    })

    let test_var_1: GeneralGenericMiddleware<[]>
    let test_var_2: GeneralGenericMiddleware<[Socket]>
    let test_var_3: GeneralGenericMiddleware<[Req, Res]>

    // 'notAFunction'
    test("<[]> = 'notAFunction' should fail", () => {
      // @dts-jest:fail
      test_var_1 = 'notAFunction'
    })

    test("<[Socket]> = 'notAFunction' should fail", () => {
      // @dts-jest:fail
      test_var_2 = 'notAFunction'
    })

    test("<[Req, Res]> = 'notAFunction' should fail", () => {
      // @dts-jest:fail
      test_var_3 = 'notAFunction'
    })

    // () => {}
    test('<[]> = () => {} should pass', () => {
      // @dts-jest:pass
      test_var_1 = () => {}
    })

    test('<[Socket]> = () => {} should pass', () => {
      // @dts-jest:pass
      test_var_2 = () => {}
    })

    test('<[Req, Res]> = () => {} should pass', () => {
      // @dts-jest:pass
      test_var_3 = () => {}
    })

    // (socket: Socket) => {}
    test('<[]> = (socket: Socket) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (socket: Socket) => {}
    })

    test('<[Socket]> = (socket: Socket) => {} should pass', () => {
      // @dts-jest:pass
      test_var_2 = (socket: Socket) => {}
    })

    test('<[Req, Res]> = (socket: Socket) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (socket: Socket) => {}
    })

    // (socket: Socket, next: NextCallback) => {}
    test('<[]> = (socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (socket: Socket, next: NextCallback) => {}
    })

    test('<[Socket]> = (socket: Socket, next: NextCallback) => {} should pass', () => {
      // @dts-jest:pass
      test_var_2 = (socket: Socket, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (socket: Socket, next: NextCallback) => {}
    })

    // (err: any, socket: Socket, next: NextCallback) => {}
    test('<[]> = (err: any, socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (err: any, socket: Socket, next: NextCallback) => {}
    })

    test('<[Socket]> = (err: any, socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (err: any, socket: Socket, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (err: any, socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (err: any, socket: Socket, next: NextCallback) => {}
    })

    // (req: Req) => {}
    test('<[]> = (req: Req) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (req: Req) => {}
    })

    test('<[Socket]> = (req: Req) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (req: Req) => {}
    })

    test('<[Req, Res]> = (req: Req) => {} should pass', () => {
      // @dts-jest:pass
      test_var_3 = (req: Req) => {}
    })

    // (req: Req, res: Res) => {}
    test('<[]> = (req: Req, res: Res) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (req: Req, res: Res) => {}
    })

    test('<[Socket]> = (req: Req, res: Res) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (req: Req, res: Res) => {}
    })

    test('<[Req, Res]> = (req: Req, res: Res) => {} should pass', () => {
      // @dts-jest:pass
      test_var_3 = (req: Req, res: Res) => {}
    })

    // (req: Req, res: Res, next: NextCallback) => {}
    test('<[]> = (req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Socket]> = (req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (req: Req, res: Res, next: NextCallback) => {} should pass', () => {
      // @dts-jest:pass
      test_var_3 = (req: Req, res: Res, next: NextCallback) => {}
    })

    // (err: any, req: Req, res: Res, next: NextCallback) => {}
    test('<[]> = (err: any, req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (err: any, req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Socket]> = (err: any, req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (err: any, req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (err: any, req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (err: any, req: Req, res: Res, next: NextCallback) => {}
    })
  })

  describe('ErrorHandlerGenericMiddleware', () => {
    test('should fail when untyped', () => {
      // @dts-jest:fail
      let test_var_0: ErrorHandlerGenericMiddleware
    })

    let test_var_1: ErrorHandlerGenericMiddleware<[]>
    let test_var_2: ErrorHandlerGenericMiddleware<[Socket]>
    let test_var_3: ErrorHandlerGenericMiddleware<[Req, Res]>

    // 'notAFunction'
    test("<[]> = 'notAFunction' should fail", () => {
      // @dts-jest:fail
      test_var_1 = 'notAFunction'
    })

    test("<[Socket]> = 'notAFunction' should fail", () => {
      // @dts-jest:fail
      test_var_2 = 'notAFunction'
    })

    test("<[Req, Res]> = 'notAFunction' should fail", () => {
      // @dts-jest:fail
      test_var_3 = 'notAFunction'
    })

    // () => {}
    test('<[]> = () => {} should pass', () => {
      // Ideally this would actually fail with a ts(2322) error, but seems unavoidable
      // @dts-jest:pass
      test_var_1 = () => {}
    })

    test('<[Socket]> = () => {} should pass', () => {
      // Ideally this would actually fail with a ts(2322) error, but seems unavoidable
      // @dts-jest:pass
      test_var_2 = () => {}
    })

    test('<[Req, Res]> = () => {} should pass', () => {
      // Ideally this would actually fail with a ts(2322) error, but seems unavoidable
      // @dts-jest:pass
      test_var_3 = () => {}
    })

    // (socket: Socket) => {}
    test('<[]> = (socket: Socket) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (socket: Socket) => {}
    })

    test('<[Socket]> = (socket: Socket) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (socket: Socket) => {}
    })

    test('<[Req, Res]> = (socket: Socket) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (socket: Socket) => {}
    })

    // (socket: Socket, next: NextCallback) => {}
    test('<[]> = (socket: Socket, next: NextCallback) => {} should pass', () => {
      // Overlaps with (err: any, next: NextCallback) => {}, which is acceptable
      // @dts-jest:pass
      test_var_1 = (socket: Socket, next: NextCallback) => {}
    })

    test('<[Socket]> = (socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (socket: Socket, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (socket: Socket, next: NextCallback) => {}
    })

    // (err: any, socket: Socket, next: NextCallback) => {}
    test('<[]> = (err: any, socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (err: any, socket: Socket, next: NextCallback) => {}
    })

    test('<[Socket]> = (err: any, socket: Socket, next: NextCallback) => {} should pass', () => {
      // @dts-jest:pass
      test_var_2 = (err: any, socket: Socket, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (err: any, socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (err: any, socket: Socket, next: NextCallback) => {}
    })

    // (req: Req) => {}
    test('<[]> = (req: Req) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (req: Req) => {}
    })

    test('<[Socket]> = (req: Req) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (req: Req) => {}
    })

    test('<[Req, Res]> = (req: Req) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (req: Req) => {}
    })

    // (req: Req, res: Res) => {}
    test('<[]> = (req: Req, res: Res) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (req: Req, res: Res) => {}
    })

    test('<[Socket]> = (req: Req, res: Res) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (req: Req, res: Res) => {}
    })

    test('<[Req, Res]> = (req: Req, res: Res) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (req: Req, res: Res) => {}
    })

    // (req: Req, res: Res, next: NextCallback) => {}
    test('<[]> = (req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Socket]> = (req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (req: Req, res: Res, next: NextCallback) => {}
    })

    // (err: any, req: Req, res: Res, next: NextCallback) => {}
    test('<[]> = (err: any, req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (err: any, req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Socket]> = (err: any, req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (err: any, req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (err: any, req: Req, res: Res, next: NextCallback) => {} should pass', () => {
      // @dts-jest:pass
      test_var_3 = (err: any, req: Req, res: Res, next: NextCallback) => {}
    })
  })

  describe('GenericMiddleware', () => {
    test('should fail when untyped', () => {
      // @dts-jest:fail
      let test_var_0: GenericMiddleware
    })

    let test_var_1: GenericMiddleware<[]>
    let test_var_2: GenericMiddleware<[Socket]>
    let test_var_3: GenericMiddleware<[Req, Res]>

    // 'notAFunction'
    test("<[]> = 'notAFunction' should fail", () => {
      // @dts-jest:fail
      test_var_1 = 'notAFunction'
    })

    test("<[Socket]> = 'notAFunction' should fail", () => {
      // @dts-jest:fail
      test_var_2 = 'notAFunction'
    })

    test("<[Req, Res]> = 'notAFunction' should fail", () => {
      // @dts-jest:fail
      test_var_3 = 'notAFunction'
    })

    // () => {}
    test('<[]> = () => {} should pass', () => {
      // @dts-jest:pass
      test_var_1 = () => {}
    })

    test('<[Socket]> = () => {} should pass', () => {
      // @dts-jest:pass
      test_var_2 = () => {}
    })

    test('<[Req, Res]> = () => {} should pass', () => {
      // @dts-jest:pass
      test_var_3 = () => {}
    })

    // (socket: Socket) => {}
    test('<[]> = (socket: Socket) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (socket: Socket) => {}
    })

    test('<[Socket]> = (socket: Socket) => {} should pass', () => {
      // @dts-jest:pass
      test_var_2 = (socket: Socket) => {}
    })

    test('<[Req, Res]> = (socket: Socket) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (socket: Socket) => {}
    })

    // (socket: Socket, next: NextCallback) => {}
    test('<[]> = (socket: Socket, next: NextCallback) => {} should pass', () => {
      // @dts-jest:pass
      test_var_1 = (socket: Socket, next: NextCallback) => {}
    })

    test('<[Socket]> = (socket: Socket, next: NextCallback) => {} should pass', () => {
      // @dts-jest:pass
      test_var_2 = (socket: Socket, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (socket: Socket, next: NextCallback) => {}
    })

    // (err: any, socket: Socket, next: NextCallback) => {}
    test('<[]> = (err: any, socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (err: any, socket: Socket, next: NextCallback) => {}
    })

    test('<[Socket]> = (err: any, socket: Socket, next: NextCallback) => {} should pass', () => {
      // @dts-jest:pass
      test_var_2 = (err: any, socket: Socket, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (err: any, socket: Socket, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_3 = (err: any, socket: Socket, next: NextCallback) => {}
    })

    // (req: Req) => {}
    test('<[]> = (req: Req) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (req: Req) => {}
    })

    test('<[Socket]> = (req: Req) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (req: Req) => {}
    })

    test('<[Req, Res]> = (req: Req) => {} should pass', () => {
      // @dts-jest:pass
      test_var_3 = (req: Req) => {}
    })

    // (req: Req, res: Res) => {}
    test('<[]> = (req: Req, res: Res) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (req: Req, res: Res) => {}
    })

    test('<[Socket]> = (req: Req, res: Res) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (req: Req, res: Res) => {}
    })

    test('<[Req, Res]> = (req: Req, res: Res) => {} should pass', () => {
      // @dts-jest:pass
      test_var_3 = (req: Req, res: Res) => {}
    })

    // (req: Req, res: Res, next: NextCallback) => {}
    test('<[]> = (req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Socket]> = (req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (req: Req, res: Res, next: NextCallback) => {} should pass', () => {
      // @dts-jest:pass
      test_var_3 = (req: Req, res: Res, next: NextCallback) => {}
    })

    // (err: any, req: Req, res: Res, next: NextCallback) => {}
    test('<[]> = (err: any, req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_1 = (err: any, req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Socket]> = (err: any, req: Req, res: Res, next: NextCallback) => {} should fail', () => {
      // @dts-jest:fail
      test_var_2 = (err: any, req: Req, res: Res, next: NextCallback) => {}
    })

    test('<[Req, Res]> = (err: any, req: Req, res: Res, next: NextCallback) => {} should pass', () => {
      // @dts-jest:pass
      test_var_3 = (err: any, req: Req, res: Res, next: NextCallback) => {}
    })
  })

  describe('createMiddlewareDispatcher', () => {
    describe('[untyped]', () => {
      test('() should return GeneralGenericMiddlewareDispatcher<[any, any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher()

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[any, any]> =
          test_var_1
      })

      test('(-1) should fail', () => {
        // @dts-jest:fail
        let test_var = createMiddlewareDispatcher(-1)
      })

      test('(0) should return GeneralGenericMiddlewareDispatcher<[]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(0)

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[]> = test_var_1
      })

      test('(1) should return GeneralGenericMiddlewareDispatcher<[any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(1)

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[any]> = test_var_1
      })

      test('(2) should return GeneralGenericMiddlewareDispatcher<[any, any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(2)

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[any, any]> =
          test_var_1
      })

      test('(false) should return GeneralGenericMiddlewareDispatcher<[any, any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(false)

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[any, any]> =
          test_var_1
      })

      test('(true) should return ErrorHandlerGenericMiddlewareDispatcher<[any, any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(true)

        // @dts-jest:pass
        let test_var_2: ErrorHandlerGenericMiddlewareDispatcher<[any, any]> =
          test_var_1
      })

      test('(false, -1) should fail', () => {
        // @dts-jest:fail
        let test_var = createMiddlewareDispatcher(false, -1)
      })

      test('(false, 0) should return GeneralGenericMiddlewareDispatcher<[]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(false, 0)

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[]> = test_var_1
      })

      test('(false, 1) should return GeneralGenericMiddlewareDispatcher<[any]>', () => {
        // @dts-jest:pass
        let text_var_1 = createMiddlewareDispatcher(false, 1)

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[any]> = text_var_1
      })

      test('(false, 2) should return GeneralGenericMiddlewareDispatcher<[any, any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(false, 2)

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[any, any]> =
          test_var_1
      })

      test('(-1, false) should fail', () => {
        // @dts-jest:fail
        let test_var = createMiddlewareDispatcher(-1, false)
      })

      test('(0, false) should return GeneralGenericMiddlewareDispatcher<[]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(0, false)

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[]> = test_var_1
      })

      test('(1, false) should return GeneralGenericMiddlewareDispatcher<[any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(1, false)

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[any]> = test_var_1
      })

      test('(2, false) should return GeneralGenericMiddlewareDispatcher<[any, any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(2, false)

        // @dts-jest:pass
        let test_var_2: GeneralGenericMiddlewareDispatcher<[any, any]> =
          test_var_1
      })

      test('(true, -1) should fail', () => {
        // @dts-jest:fail
        let test_var = createMiddlewareDispatcher(true, -1)
      })

      test('(true, 0) should return ErrorHandlerGenericMiddlewareDispatcher<[]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(true, 0)

        // @dts-jest:pass
        let test_var_2: ErrorHandlerGenericMiddlewareDispatcher<[]> = test_var_1
      })

      test('(true, 1) should return ErrorHandlerGenericMiddlewareDispatcher<[any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(true, 1)

        // @dts-jest:pass
        let test_var_2: ErrorHandlerGenericMiddlewareDispatcher<[any]> =
          test_var_1
      })

      test('(true, 2) should return ErrorHandlerGenericMiddlewareDispatcher<[any, any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(true, 2)

        // @dts-jest:pass
        let test_var_2: ErrorHandlerGenericMiddlewareDispatcher<[any, any]> =
          test_var_1
      })

      test('(-1, true) should fail', () => {
        // @dts-jest:fail
        let test_var = createMiddlewareDispatcher(-1, true)
      })

      test('(0, true) should return ErrorHandlerGenericMiddlewareDispatcher<[]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(0, true)

        // @dts-jest:pass
        let test_var_2: ErrorHandlerGenericMiddlewareDispatcher<[]> = test_var_1
      })

      test('(1, true) should return ErrorHandlerGenericMiddlewareDispatcher<[any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(1, true)

        // @dts-jest:pass
        let test_var_2: ErrorHandlerGenericMiddlewareDispatcher<[any]> =
          test_var_1
      })

      test('(2, true) should return ErrorHandlerGenericMiddlewareDispatcher<[any, any]>', () => {
        // @dts-jest:pass
        let test_var_1 = createMiddlewareDispatcher(2, true)

        // @dts-jest:pass
        let test_var_2: ErrorHandlerGenericMiddlewareDispatcher<[any, any]> =
          test_var_1
      })
    })

    test('<[Req, Res]>() should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Req, Res]>()
    })

    test('<[]>(0) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[]>(0)
    })

    test('<[Socket]>(1) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Socket]>(1)
    })

    test('<[Req, Res]>(2) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Req, Res]>(2)
    })

    test('<[Req, Res]>(false) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Req, Res]>(false)
    })

    test('<[Req, Res]>(true) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Req, Res]>(true)
    })

    test('<[]>(false, 0) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[]>(false, 0)
    })

    test('<[Socket]>(false, 1) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Socket]>(false, 1)
    })

    test('<[Req, Res]>(false, 2) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Req, Res]>(false, 2)
    })

    test('<[]>(true, 0) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[]>(true, 0)
    })

    test('<[Socket]>(true, 1) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Socket]>(true, 1)
    })

    test('<[Req, Res]>(true, 2) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Req, Res]>(true, 2)
    })

    test('<[]>(0, false) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[]>(0, false)
    })

    test('<[Socket]>(1, false) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Socket]>(1, false)
    })

    test('<[Req, Res]>(2, false) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Req, Res]>(2, false)
    })

    test('<[]>(0, true) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[]>(0, true)
    })

    test('<[Socket]>(1, true) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Socket]>(1, true)
    })

    test('<[Req, Res]>(2, true) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Req, Res]>(2, true)
    })

    test('<[]>() should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[]>()
    })

    test('<[]>(-1) should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[]>(-1)
    })

    test('<[Req, Res?]>(2) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Req, Res?]>(2)
    })

    test('<[Req, Res?]>(1) should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[Req, Res?]>(1)
    })

    test('<[Req?, Res?]>(2) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Req?, Res?]>(2)
    })

    test('<[Req?, Res?]>(1) should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[Req?, Res?]>(1)
    })

    test('<[Req?, Res?]>(0) should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[Req?, Res?]>(0)
    })

    test('<[Socket?]>(1) should pass', () => {
      // @dts-jest:pass
      let test_var = createMiddlewareDispatcher<[Socket?]>(1)
    })

    test('<[Socket?]>(0) should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[Socket?]>(0)
    })

    test('<[Req, Res]>(1) should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[Req, Res]>(1)
    })

    test('<[Socket]>(2) should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[Socket]>(2)
    })

    test('<[Req?, Res?]>(0) should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[Req?, Res?]>(0)
    })

    test('<[]>(1) should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[]>(1)
    })

    test('<[Socket]>() should fail', () => {
      // @dts-jest:fail
      let test_var = createMiddlewareDispatcher<[Socket]>()
    })

    test('<[Req, Res]>() should return GeneralGenericMiddlewareDispatcher<[Req, Res]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[Req, Res]> =
        createMiddlewareDispatcher<[Req, Res]>()
    })

    test('<[]>(0) should return GeneralGenericMiddlewareDispatcher<[]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[]> =
        createMiddlewareDispatcher<[]>(0)
    })

    test('<[Socket]>(1) should return GeneralGenericMiddlewareDispatcher<[Socket]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[Socket]> =
        createMiddlewareDispatcher<[Socket]>(1)
    })

    test('<[Req, Res]>(2) should return GeneralGenericMiddlewareDispatcher<[Req, Res]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[Req, Res]> =
        createMiddlewareDispatcher<[Req, Res]>(2)
    })

    test('<[Req, Res]>(false) should return GeneralGenericMiddlewareDispatcher<[Req, Res]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[Req, Res]> =
        createMiddlewareDispatcher<[Req, Res]>(false)
    })

    test('<[Req, Res]>(true) should return ErrorHandlerGenericMiddlewareDispatcher<[Req, Res]>', () => {
      // @dts-jest:pass
      let test_var: ErrorHandlerGenericMiddlewareDispatcher<[Req, Res]> =
        createMiddlewareDispatcher<[Req, Res]>(true)
    })

    test('<[]>(false, 0) should return GeneralGenericMiddlewareDispatcher<[]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[]> =
        createMiddlewareDispatcher<[]>(false, 0)
    })

    test('<[Socket]>(false, 1) should return GeneralGenericMiddlewareDispatcher<[Socket]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[Socket]> =
        createMiddlewareDispatcher<[Socket]>(false, 1)
    })

    test('<[Req, Res]>(false, 2) should return GeneralGenericMiddlewareDispatcher<[Req, Res]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[Req, Res]> =
        createMiddlewareDispatcher<[Req, Res]>(false, 2)
    })

    test('<[]>(0, false) should return GeneralGenericMiddlewareDispatcher<[]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[]> =
        createMiddlewareDispatcher<[]>(0, false)
    })

    test('<[Socket]>(1, false) should return GeneralGenericMiddlewareDispatcher<[Socket]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[Socket]> =
        createMiddlewareDispatcher<[Socket]>(1, false)
    })

    test('<[Req, Res]>(2, false) should return GeneralGenericMiddlewareDispatcher<[Req, Res]>', () => {
      // @dts-jest:pass
      let test_var: GeneralGenericMiddlewareDispatcher<[Req, Res]> =
        createMiddlewareDispatcher<[Req, Res]>(2, false)
    })

    test('<[]>(true, 0) should return ErrorHandlerGenericMiddlewareDispatcher<[]>', () => {
      // @dts-jest:pass
      let test_var: ErrorHandlerGenericMiddlewareDispatcher<[]> =
        createMiddlewareDispatcher<[]>(true, 0)
    })

    test('<[Socket]>(true, 1) should return ErrorHandlerGenericMiddlewareDispatcher<[Socket]>', () => {
      // @dts-jest:pass
      let test_var: ErrorHandlerGenericMiddlewareDispatcher<[Socket]> =
        createMiddlewareDispatcher<[Socket]>(true, 1)
    })

    test('<[Req, Res]>(true, 2) should return ErrorHandlerGenericMiddlewareDispatcher<[Req, Res]>', () => {
      // @dts-jest:pass
      let test_var: ErrorHandlerGenericMiddlewareDispatcher<[Req, Res]> =
        createMiddlewareDispatcher<[Req, Res]>(true, 2)
    })

    test('<[]>(0, true) should return ErrorHandlerGenericMiddlewareDispatcher<[]>', () => {
      // @dts-jest:pass
      let test_var: ErrorHandlerGenericMiddlewareDispatcher<[]> =
        createMiddlewareDispatcher<[]>(0, true)
    })

    test('<[Socket]>(1, true) should return ErrorHandlerGenericMiddlewareDispatcher<[Socket]>', () => {
      // @dts-jest:pass
      let test_var: ErrorHandlerGenericMiddlewareDispatcher<[Socket]> =
        createMiddlewareDispatcher<[Socket]>(1, true)
    })

    test('<[Req, Res]>(2, true) should return ErrorHandlerGenericMiddlewareDispatcher<[Res, Req]>', () => {
      // @dts-jest:pass
      let test_var: ErrorHandlerGenericMiddlewareDispatcher<[Req, Res]> =
        createMiddlewareDispatcher<[Req, Res]>(2, true)
    })
  })
})
