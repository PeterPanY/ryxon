export default {
  name: 'ryxon',
  build: {
    srcDir: 'src',
    tagPrefix: 'r-',
    namedExport: true,
    skipInstall: ['lazyload'],
    packageManager: 'pnpm',
    extensions: {
      esm: '.mjs'
    },
    site: {
      publicPath:
        (typeof window === 'undefined' && process.env.PUBLIC_PATH) || '/ryxon/'
    },
    vetur: {
      tagPrefix: 'r-'
    },
    css: {
      removeSourceFile: true
    }
  }
}
