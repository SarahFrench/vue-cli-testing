# Conway's Game of Life
Made as a Vue component

## Deployment

https://cli.vuejs.org/guide/deployment.html#github-pages
- `gem install travis && travis --login`
- logged in with my GitHub details
- generated a token for Travis to use to access the repo
  - added it as an ENV variable for the project using `travis env set <ENV_VAR_NAME> <value>`
- Added the .travis.yml file with the correct ENV var name
- pushed that .yml file to the repo

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
