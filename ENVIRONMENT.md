# Environment variables

The `nextjs-starter` app uses **declarative environment variables** powered by
**[Austenite]**.

[austenite]: https://github.com/ezzatron/austenite

| Name                                                | Usage    | Description                         |
| :-------------------------------------------------- | :------- | :---------------------------------- |
| [`OTEL_SERVICE_NAME`](#otel_service_name)           | Optional | OpenTelemetry service name          |
| [`PET_STORE_SERVICE_HOST`](#pet_store_service_host) | Required | Kubernetes `pet-store` service host |
| [`PET_STORE_SERVICE_PORT`](#pet_store_service_port) | Required | Kubernetes `pet-store` service port |
| [`WEB_LISTEN_PORT`](#web_listen_port)               | Optional | Port to listen on for web traffic   |

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

## `PET_STORE_SERVICE_HOST`

_Kubernetes `pet-store` service host_

The `PET_STORE_SERVICE_HOST` variable is a **required** variable that takes
**hostname** values.

### Example values

```sh
export PET_STORE_SERVICE_HOST=service.example.org # a hostname
```

```sh
export PET_STORE_SERVICE_HOST=10.0.0.11 # an IP address
```

## `PET_STORE_SERVICE_PORT`

_Kubernetes `pet-store` service port_

The `PET_STORE_SERVICE_PORT` variable is a **required** variable that takes
**port number** values.

### Example values

```sh
export PET_STORE_SERVICE_PORT=12345 # a port number
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
