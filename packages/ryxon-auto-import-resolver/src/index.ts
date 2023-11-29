export interface RyxonResolverOptions {
  /**
   * Whether to automatically import the corresponding styles of the components.
   *
   * @default true
   */
  importStyle?:
    | boolean
    | 'css'
    /** Compatible with Ryxon 3.x */
    | 'less'

  /**
   * Set the referenced module type.
   *
   * @default 'esm'
   */
  module?: 'esm' | 'cjs'

  /**
   * @deprecated Please use `module` option instead.
   */
  ssr?: boolean
}

/**
 * Button->button; ButtonGroup->button-group
 */
function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

function getModuleType(options: RyxonResolverOptions): string {
  const { ssr, module = 'esm' } = options

  // compatible with the deprecated `ssr` option
  if (ssr !== undefined) {
    return ssr ? 'lib' : 'es'
  }

  return module === 'cjs' ? 'lib' : 'es'
}

function getSideEffects(dirName: string, options: RyxonResolverOptions) {
  const { importStyle = true } = options

  if (!importStyle) {
    return
  }

  const moduleType = getModuleType(options)

  if (importStyle === 'less') return `ryxon/${moduleType}/${dirName}/style/less`

  return `ryxon/${moduleType}/${dirName}/style/index`
}

export function RyxonResolver(options: RyxonResolverOptions = {}) {
  const moduleType = getModuleType(options)

  return {
    type: 'component' as const,

    resolve: (name: string) => {
      if (name.startsWith('R')) {
        const partialName = name.slice(3)
        return {
          name: partialName,
          from: `ryxon/${moduleType}`,
          sideEffects: getSideEffects(kebabCase(partialName), options)
        }
      }
    }
  }
}
