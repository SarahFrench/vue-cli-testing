# Conway's Game of Life

I took the code I wrote in this repo [Conway's Game of Life](https://github.com/SarahFrench/ConwayGameOfLife) for a TDD exercise and adapted it into a Vue component.

I thought that visualising the progression of a game would be fun to make, and as I've been learning Vue lately decided to make it as a Vue app. In particular, the way Vue handles data to create a 'single source of truth' helps make a project like this more managable.

As I'm still learning Vue (plus this was a short project) the code could do with refactoring, especially after learning more about how component re-rendering is triggered. E.g. in resizeBoard I tried to use <array>.map instead of the nested for loop, but that didn't trigger the board to be re-rendered like the nested for loops do!

By doing this I improved my understanding of Vue, and had my first experience using Travis to deploy my first Vue app, see below.

## Deployment

I looked at this guide: https://cli.vuejs.org/guide/deployment.html#github-pages

- `gem install travis && travis --login`
- logged in with my GitHub details
- generated a token for Travis to use to access the repo
  - added it as an ENV variable for the project using `travis env set <ENV_VAR_NAME> <value>`
- Added the .travis.yml file with the correct ENV var name
- pushed that .yml file to the repo
- Had an issue with asset paths, resolved by adding vue.config.js to make the path look at this project's repo, not the main GitHub Pages one.

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
