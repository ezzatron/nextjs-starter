# Environment variables

The `nextjs-starter` app uses **declarative environment variables** powered by
**[Austenite]**.

[austenite]: https://github.com/ezzatron/austenite

| Name            | Usage    | Description       |
| :-------------- | :------- | :---------------- |
| [`PORT`](#port) | Optional | Port to listen on |

<!-- prettier-ignore-start -->

> [!TIP]
> If you set an empty value for an environment variable, the app behaves as if that variable isn't set.

<!-- prettier-ignore-end -->

## `PORT`

_Port to listen on_

The `PORT` variable is an **optional** variable that takes **port number**
values.

### Default value

```sh
export PORT=8000 # default
```

### Example values

```sh
export PORT=12345 # a port number
```
