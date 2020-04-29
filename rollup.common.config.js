const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const glob = require('rollup-plugin-glob-import');
const babel = require('rollup-plugin-babel');
const deindent = require('deindent');
const { terser } = require('rollup-plugin-terser');
const serve = require('rollup-plugin-serve');
const copy = require('rollup-plugin-copy-assets-to');
const builtins = require('rollup-plugin-node-builtins');

const { name, contributors, homepage, version, browserslist } = require('./package.json');

const [, scopedName] = name.split('/');

module.exports = function({ minified, es6, tests, coverage, demo, server }) {
  demo = demo || server;

  return {
    input: demo ? 'demo/index.ts' : `src/${scopedName}.ts`,
    external: tests || server ? [] : ['@salte-auth/salte-auth'],
    output: {
      file: `dist/${scopedName}${minified ? '.min' : ''}.${es6 ? 'mjs' : 'js'}`,
      format: es6 ? 'es' : 'umd',
      name: `salte.auth.${scopedName}`,
      sourcemap: tests ? 'inline' : true,
      exports: 'named',
      banner: deindent`
        /**
         * ${name} JavaScript Library v${version}
         *
         * @license MIT (${homepage}/blob/master/LICENSE)
         *
         * Made with ♥ by ${contributors.join(', ')}
         */
      `,
      globals: {
        '@salte-auth/salte-auth': 'salte.auth'
      }
    },

    plugins: [
      tests && builtins(),

      resolve({
        mainFields: ['main', 'browser'],

        extensions: [ '.mjs', '.js', '.jsx', '.json', '.ts' ],
        preferBuiltins: true
      }),

      commonjs({
        namedExports: {

          'chai': [ 'expect' ],
          '@salte-auth/salte-auth': ['SalteAuth', 'SalteAuthError', 'OAuth2Provider', 'OpenIDProvider', 'Handler', 'Utils', 'Generic'],
          '@salte-auth/redirect': ['Redirect']        }
      }),
      glob(),

      babel({
        runtimeHelpers: true,

        presets: [
          '@babel/typescript',
          ['@babel/preset-env', {
            targets: es6 ? {
              esmodules: true
            } : {
              browsers: browserslist
            }
          }]
        ],

        plugins: [
          ['@babel/plugin-transform-runtime', {
            regenerator: true
          }]
        ].concat(coverage ? [['istanbul', {
          include: [
            'src/**/*.ts'
          ]
        }]] : []),

        exclude: 'node_modules/!(chai|sinon)/**',
        extensions: [".ts", ".js", ".jsx", ".es6", ".es", ".mjs"]
      }),

      minified && terser({
        output: {
          comments: function (node, comment) {
            const { value, type } = comment;
            if (type == 'comment2') {
              // multiline comment
              return /@license/i.test(value);
            }
          }
        }
      }),

      demo && copy({
        assets: [
          './demo/index.html'
        ],
        outputDir: 'dist'
      }),

      server && serve({
        contentBase: 'dist',
        historyApiFallback: '/index.html',
        port: 8081
      })
    ],

    watch: {
      include: '**',
      exclude: 'node_modules/**'
    },

    onwarn: function(warning) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        console.error(`(!) ${warning.message}`);
      }
    }
  }
}
