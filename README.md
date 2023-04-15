## Description
A url shortner that helps shorten the length of really long urls

## Installation

```bash
$ yarn add
```

## Running the app
Make sure you have node installed on your system.

```bash
# start app
$ yarn start

```

## Test

```bash
# start test (in watch mode)
$ yarn test

```


### API ENDPOINTS ROUTE

- **POST** `http://localhost:4000/encode`
Payload = {"url": "the long url"}

- **POST** `http://localhost:4000/decode`
Payload = {"url": "the shortened url"}

- **GET** `http://localhost:4000/statistic/:urlPath`
Param = `${code}`


