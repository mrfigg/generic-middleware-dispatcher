# generic-middleware-dispatcher

[![npm license](https://img.shields.io/npm/l/generic-middleware-dispatcher)](https://www.npmjs.com/package/generic-middleware-dispatcher) [![npm version](https://img.shields.io/npm/v/generic-middleware-dispatcher)](https://www.npmjs.com/package/generic-middleware-dispatcher) [![github issues](https://img.shields.io/github/issues/mrfigg/generic-middleware-dispatcher)](https://github.com/mrfigg/generic-middleware-dispatcher/issues)

An Express-like generic middleware dispatcher with a settable number of contexts and typescript support.

## Install

`npm install generic-middleware-dispatcher`

## Examples

#### Javascript

```js
const { createMiddlewareDispatcher } = require('generic-middleware-dispatcher')
const http = require('http')

// createMiddlewareDispatcher defaults to 2 context objects
const app = createMiddlewareDispatcher()

app.use(function (req, res, next) {
  console.log(req.method, req.url)

  if (req.url === '/') {
    next()
  } else {
    next(new Error('Page Not Found'))
  }
})

app.use(function (req, res, next) {
  console.log('success')

  res.end('Welcome!')

  next()
})

app.use(function (err, req, res, next) {
  console.error(err.message)

  if (/Page Not Found/i.test(err.message)) {
    res.statusCode = 404
    res.end(err.message)
  } else {
    res.statusCode = 500
    res.end('Internal Server Error')
  }
})

http.createServer(app).listen(8080)
```

#### Typescript

```ts
import {
  createMiddlewareDispatcher,
  NextCallback,
} from 'generic-middleware-dispatcher'
import { Server, Socket } from 'socket.io'

const io = new Server(3000)

// createMiddlewareDispatcher with 1 context object that has a type of 'Socket'
const middleware = createMiddlewareDispatcher<[Socket]>(1)

io.use(middleware)

middleware.use(function (socket: Socket, next: NextCallback) {
  console.log(socket.handshake.address)

  if (/127.0.0.1$/.test(socket.handshake.address)) {
    next()
  } else {
    next(new Error('Unauthorized'))
  }
})

middleware.use(function (socket: Socket, next: NextCallback) {
  console.log('success')

  socket.emit('message', 'Welcome!')

  next()
})

middleware.use(function (err: any, socket: Socket, next: NextCallback) {
  console.error(err.message)

  next(err)
})
```
