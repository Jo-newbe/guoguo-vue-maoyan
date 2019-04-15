# guoguo-vue-maoyan

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### DevServer

Proxy:

```
'/maoyan': {
  target: 'http://m.maoyan.com/',
  pathRewrite:{'^/maoyan', ''}
}

// $.ajax({
  url: '/maoyan', // 相当于 请求了 http://m.maoyan.com
})
```
