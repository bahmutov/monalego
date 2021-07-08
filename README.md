# MonaLego ![cypress version](https://img.shields.io/badge/cypress-7.7.0-brightgreen) [![ci status][ci image]][ci url] [![renovate-app badge][renovate-badge]][renovate-app]
> Visual testing for HTML canvas drawing

[![monalego](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/vzoo2b&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/vzoo2b/runs)

## Mona Lisa example

This [Legra.js](https://legrajs.com/) demo copied from from [legra-monalisa.glitch.me/](https://legra-monalisa.glitch.me/)

![MonaLego](./images/darwin/canvas-20.png)

The test in [cypress/integration/mona-spec.js](./cypress/integration/mona-spec.js) changes the brick size and saves the produced Lego image as a local file.

Related: [Fast legoization](https://glebbahmutov.com/blog/fast-legoization/)

## Smiley face

Read [Canvas Visual Testing with Retries](https://glebbahmutov.com/blog/canvas-testing/), see the test [cypress/integration/smile-spec.js](./cypress/integration/smile-spec.js).

![Visual canvas testing](./gif/recurse-smile.gif)

## Pixel match in the browser

Look at [pixelmatch-spec.js](./cypress/integration/pixelmatch-spec.js) where we compare the canvas image to itself after N milliseconds using [pixelmatch](https://github.com/mapbox/pixelmatch#readme) library. This let's us retry until the canvas stabilizes and becomes static - which means the animation has finished.

![Canvas becomes static](./images/canvas-static.gif)

Watch the video [Canvas image diffing in the browser using pixelmatch](https://youtu.be/WGigbAupExQ).

## Bar chart

An animated [Chart.js bar chart](https://www.chartjs.org/samples/latest/scriptable/bar.html) with multiple visual diffs against it. You can change the animation duration in [public/bar.html](./public/bar.html), the test should still work.

![Visual tests against animated bar chart](./gif/bar.gif)

Watch [the video](https://youtu.be/aeBclf9A92A) for more details

## Native screenshots

This repository is showing how to use Chrome debugger protocol to capture the browser screenshot natively in Chrome browsers. See the [screenshot-spec.js](./cypress/integration/screenshot-spec.js) test file.

[ci image]: https://github.com/bahmutov/monalego/workflows/main/badge.svg?branch=main
[ci url]: https://github.com/bahmutov/monalego/actions
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
