'use strict'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  modify(baseConfig, { target, dev }, webpack) {
    const config = Object.assign({}, baseConfig)

    config.resolve.extensions = config.resolve.extensions.concat([
      '.ts',
      '.tsx'
    ])

    config.devtool = 'cheap-module-source-map'

    // Locate eslint-loader and remove it (we're using tslint instead)
    config.module.rules = config.module.rules.filter(
      rule =>
        !(
          Array.isArray(rule.use) &&
          rule.use.length > 0 &&
          rule.use[0].options &&
          'useEslintrc' in rule.use[0].options
        )
    )

    config.module.rules[1].exclude.push(/\.mjs$/)

    // Safely locate Babel-Loader in Razzle's webpack internals
    const babelLoader = config.module.rules.findIndex(
      rule => rule.options && rule.options.babelrc
    )

    // Get the correct `include` option, since that hasn't changed.
    // This tells Razzle which directories to transform.
    const { include } = config.module.rules[babelLoader]

    // Declare our TypeScript loader configuration
    const tsLoader = {
      include,
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        experimentalWatchApi: true
      }
    }

    const tslintLoader = {
      include,
      enforce: 'pre',
      test: /\.tsx?$/,
      loader: 'tslint-loader',
      options: {
        emitErrors: true,
        configFile: './tslint.json'
      }
    }

    config.module.rules.push(tslintLoader)

    // Fully replace babel-loader with ts-loader
    //  config.module.rules[babelLoader] = tsLoader;

    // If you want to use Babel & Typescript together (e.g. if you
    // are migrating incrementally and still need some Babel transforms)
    // then do the following:
    //
    // - COMMENT out line 59
    // - UNCOMMENT line 68
    //
    config.module.rules.push(tsLoader)

    config.module.rules.push(
      {
        test: /\.ant$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    )

    if (!dev) {
      const index = config.plugins.findIndex(
        plugin => plugin.constructor.name === 'UglifyJsPlugin'
      )
      if (index !== -1) {
        config.plugins[index] = new UglifyJsPlugin({
          uglifyOptions: {
            mangle: {
              safari10: true
            },
            compress: {
              warnings: false,
              comparisons: false
            },
            output: {
              comments: false
            }
          },
          sourceMap: true
        })
      }
    }

    config.plugins.push(new ExtractTextPlugin('static/css/styles.css'))
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop')
    )

    config.plugins.push(
      new webpack.EnvironmentPlugin([
        'GOOGLE_ID',
        'FACEBOOK_ID',
        'GRAPHQL_URI_BASE',
        'BASE_URL',
        'STORAGE_URL',
        'PK_STRIPE_US',
        'PK_STRIPE_EU',
        'PAYPAL_CLIENT_ID',
        'PAYPAL_CLIENT_ID_US',
        'PAYPAL_CLIENT_ID_CA',
        'PAYPAL_CLIENT_ID_EU',
        'PAYPAL_ENV',
        'GOOGLE_MAP_KEY',
        'INTERCOM_KEY',
        'DEFAULT_CURRENCY',
        'GOOGLE_TAG_MANAGER_ID',
        'SLAASK_KEY',
        'SLAASK_TEAM',
        'SLAASK_SUPPORT_KEY',
        'SLAASK_SUPPORT_TEAM',
        'LOG_ROCKET_KEY',
        'GOOGLE_FONTS_KEY',
        'GOOGLE_FONTS_URL',
        'YOUTUBE_ID',
        'YOUTUBE_KEY',
        'TUTORIALS_TAB_ACTIVE',
        'COLOR_SWATCH_ZIP'
      ])
    )

    config.plugins.push(new webpack.IgnorePlugin(/utf-8-validate|bufferutil/))

    return config
  }
}
