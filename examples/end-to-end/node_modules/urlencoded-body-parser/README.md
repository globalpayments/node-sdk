# Urlencoded Body Parser

Small parser for [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) that turns `application/x-www-form-urlencoded` data into a javascript object using [qs](https://github.com/ljharb/qs).

### Api

`parse(req, {limit = '1mb'} = {})`

- Use `require('urlencoded-body-parser')`
- Returns a `Promise`
- Buffers and parses the incoming body and returns it.
- `limit` is how much data is aggregated before parsing at max. It can be a `Number` of bytes or [a string](https://www.npmjs.com/package/bytes) like `'1mb'`.
- The Promise is rejected when an error occurs

### Usage

Using [Micro](https://www.github.com/zeit/micro):

```js
const parse = require('urlencoded-body-parser')
module.exports = async function (req, res) {
  const data = await parse(req)
  console.log(data)
  return ''
}
```

Using build in HTTP server:

```js
const http = require('http');
const parse = require('urlencoded-body-parser')

const server = http.createServer((req, res) => {
  parse(req).then(data => {
    console.log(data)
    res.end();
  })
});

server.listen(8000);
```
