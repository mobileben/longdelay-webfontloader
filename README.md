# Overview
This is a simple project used to illustrate slow loading times when using `custom` fonts with `webfontloader`. This issue was reported [here](https://github.com/typekit/webfontloader/issues/421).

This is a basic project, setup like my project has been setup. My project uses Webpack as well as Typescript.

Packages in use are the following, as I am not committing the `node_modules` directory.

```
npm install --save-dev typescript
npm install --save-dev ts-loader
npm install --save-dev webpack-cli webpack webpack-dev-server
npm install --save-dev html-webpack-plugin copy-webpack-plugin
npm install --save-dev ifdef-loader

npm install --save @types/css-font-loading-module
npm install --save webfontloader
```

There are a few scripts defined. These allow you to just build or run the webpack dev server. I am using `ifdef-loader` to allow easy switching between `webfontloader` and `FontFace` method.

When using `webfontloader`, I get a delay of roughly 3000 ms+ whereas using `FontFace` is roughly 4 ms.

Scripts are of two sets.

The first set build/runs with `webfontloader`.
```
npm run build
npm run def
```

The second set builds/runs without `webfontloader`. This one loads the fonts manually.
```
npm run build-nowebfontloader
npm run def-nowebfontloader
```

# Caveats
I'm by no means an expert around web fonts and how things like `@font-face` work. I usually don't work with HTML and encountered when trying to make an HTML 5 game. So if I'm doing something dumb, please let me know, I'm more than happy to learn.

I've noticed a couple of things.

1. If I omit `google` from the `load`, the `custom` fonts will not load at all (ie. `initialStartGame` will not be called). I am not sure why this is the case.
2. If I omit `custom`, you'll see a faster start time. It still is not as fast as the manual loading and if you look at the network timings, it is still much slower than the load of `Pacifico`.

I've added comments in the code for both.