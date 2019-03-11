<h3 align="center">
	NOTE: This package is currently a work in progress and shouldn't be used!
</h3>

<h2 align="center">
  <div>
    <a href="https://github.com/salte-auth/popup">
      <img height="190px" src="https://raw.githubusercontent.com/salte-auth/logos/master/images/logo.svg?sanitize=true">
      <br>
      <br>
      <img height="50px" src="https://raw.githubusercontent.com/salte-auth/logos/master/images/%40salte-auth/popup.svg?sanitize=true">
    </a>
  </div>
</h2>

<h3 align="center">
	A Salte Auth provider for authenticating via Popup!
</h3>

<p align="center">
	<strong>
		<a href="https://salte-auth.gitbook.io">Docs</a>
		•
		<a href="https://salte-auth-demo.glitch.me">Demo</a>
	</strong>
</p>

<div align="center">

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Downloads][npm-downloads-image]][npm-url]
  [![Travis][travis-ci-image]][travis-ci-url]
  [![Coveralls][coveralls-image]][coveralls-url]

  [![semantic-release][semantic-release-image]][semantic-release-url]
  [![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

</div>

## Install

```sh
$ npm install @salte-auth/popup
```

## Usage

```js
import { SalteAuth } from '@salte-auth/salte-auth';
import { GitHub } from '@salte-auth/github';
import { Popup } from '@salte-auth/popup';

const auth = new SalteAuth({
  providers: [
    new GitHub({
      clientID: '12345'
    })
  ],

  handlers: [
    new Popup({
      default: true
    })
  ]
});

auth.login('github');
```

## Known Issues

_These are issues that we know about, but don't have a clear fix for!_

**There are currently no known issues, thanks for checking!**

[npm-version-image]: https://img.shields.io/npm/v/@salte-auth/popup.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/@salte-auth/popup.svg?style=flat
[npm-url]: https://npmjs.org/package/@salte-auth/popup

[travis-ci-image]: https://img.shields.io/travis/com/salte-auth/popup/master.svg?style=flat
[travis-ci-url]: https://travis-ci.com/salte-auth/popup

[coveralls-image]: https://img.shields.io/coveralls/salte-auth/popup/master.svg
[coveralls-url]: https://coveralls.io/github/salte-auth/popup?branch=master

[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: https://commitizen.github.io/cz-cli/

[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[greenkeeper-image]: https://badges.greenkeeper.io/salte-auth/popup.svg
[greenkeeper-url]: https://greenkeeper.io
