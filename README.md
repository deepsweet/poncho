### PhantomJS + Mocha + Blanket = Poncho

Client-side JS code coverage using [PhantomJS](https://github.com/ariya/phantomjs), [Mocha](https://github.com/visionmedia/mocha) and [Blanket](https://github.com/alex-seville/blanket).

#### Install

```sh
$ npm i --save-dev poncho
```

#### Usage

Let's imagine that you already have PhantomJS + Mocha client-side tests (with [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs), for example), something like this `test/test.html`:

```html
<!DOCTYPE html>

<head>
    <meta charset="utf-8"/>
    <title>Mocha Test</title>
    <link rel="stylesheet" href="mocha/mocha.css"/>
</head>

<body>
    <div id="mocha"></div>

    <!-- mocha -->
    <script src="mocha/mocha.js"></script>
    <script>mocha.setup('bdd');</script>

    <!-- target script -->
    <script src="script.js"></script>
    <!-- test file -->
    <script src="test.js"></script>

    <!-- run -->
    <script>window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();</script>
</body>
```

All you need to do is add `data-cover` attribute to the target script tag:

```html
<script src="script.js" data-cover></script>
```

…and run Poncho:

```sh
$ poncho --reporter num test/test.html
```

#### Send data to [coveralls.io](https://coveralls.io/)

Install [node-coveralls](https://github.com/cainus/node-coveralls):

```sh
$ npm i --save-dev coveralls
```
…and pipe Poncho's `lcov` reporter to it:

```sh
$ poncho --reporter lcov test/test.html | coveralls
```

#### How it works?

You don't want to know. Seriosly. It's so hacky way that it can cause [the blood from your eyes](http://funkyimg.com/i/EdqD.gif).
