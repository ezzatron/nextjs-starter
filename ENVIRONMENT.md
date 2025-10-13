# Environment variables

The `nextjs-starter` app uses **declarative environment variables** powered by
**[Austenite]**.

[austenite]: https://github.com/ezzatron/austenite

| Name                                      | Usage    | Description                       |
| :---------------------------------------- | :------- | :-------------------------------- |
| [`OTEL_SERVICE_NAME`](#otel_service_name) | Optional | OpenTelemetry service name        |
| [`WEB_LISTEN_PORT`](#web_listen_port)     | Optional | Port to listen on for web traffic |

<!-- prettier-ignore-start -->

> [!TIP]
> If you set an empty value for an environment variable, the app behaves as if that variable isn't set.

<!-- prettier-ignore-end -->

## `OTEL_SERVICE_NAME`

_OpenTelemetry service name_

The `OTEL_SERVICE_NAME` variable is an **optional** variable that takes
**string** values.

### Default value

```sh
export OTEL_SERVICE_NAME=nextjs-starter # default
```

### Example values

```sh
export OTEL_SERVICE_NAME=conquistador # any value
```

```sh
export OTEL_SERVICE_NAME='alabaster parakeet' # some values may need escaping
```

## `WEB_LISTEN_PORT`

_Port to listen on for web traffic_

The `WEB_LISTEN_PORT` variable is an **optional** variable that takes **port
number** values.

### Default value

```sh
export WEB_LISTEN_PORT=8000 # default
```

### Example values

```sh
export WEB_LISTEN_PORT=12345 # a port number
```
