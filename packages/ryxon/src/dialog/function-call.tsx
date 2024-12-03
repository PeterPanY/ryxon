import { extend, inBrowser, ComponentInstance } from '@ryxon/utils'
import { mountComponent, usePopupState } from '../utils/mount-component'
import Dialog from './Dialog'
import type { DialogAction, DialogOptions } from './types'

let instance: ComponentInstance

const DEFAULT_OPTIONS = {
  title: '',
  theme: null,
  width: '',
  position: 'center',
  message: '',
  type: '',
  icon: '',
  allowHtml: false,
  className: '',
  transition: undefined,
  messageAlign: '',
  closeOnPopstate: true,
  showConfirmButton: true,
  confirmButtonText: '',
  confirmButtonColor: null,
  confirmButtonDisabled: false,
  showCancelButton: false,
  cancelButtonText: '',
  cancelButtonColor: null,
  cancelButtonDisabled: false,
  closeOnClickOverlay: false,
  keyboardEnabled: true,
  showClose: true,
  callback: null,
  overlay: true,
  overlayClass: '',
  overlayStyle: undefined,
  teleport: 'body',
  lockScroll: true,
  beforeClose: null
} as const

let currentOptions = extend({}, DEFAULT_OPTIONS)

function initInstance() {
  const Wrapper = {
    setup() {
      const { state, toggle } = usePopupState()
      return () => <Dialog {...state} onUpdate:show={toggle} />
    }
  }

  ;({ instance } = mountComponent(Wrapper))
}

/**
 * Display a message prompt dialog with a default confirm button
 */
export function showDialog(
  options: DialogOptions
): Promise<DialogAction | undefined> {
  /* istanbul ignore if */
  if (!inBrowser) {
    return Promise.resolve(undefined)
  }

  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance()
    }

    instance.open(
      extend({}, currentOptions, options, {
        callback: (action?: DialogAction) => {
          ;(action === 'confirm' ? resolve : reject)(action)
        }
      })
    )
  })
}

/**
 * Modify the default configuration that affects all `showDialog` calls
 */
export const setDialogDefaultOptions = (options: DialogOptions) => {
  extend(currentOptions, options)
}

/**
 * Reset the default configuration that affects all `showDialog` calls
 */
export const resetDialogDefaultOptions = () => {
  currentOptions = extend({}, DEFAULT_OPTIONS)
}

/**
 * Display a message confirmation dialog with default confirm and cancel buttons
 */
export const showConfirmDialog = (options: DialogOptions) =>
  showDialog(extend({ showCancelButton: true }, options))

/**
 * Close the currently displayed dialog
 */
export const closeDialog = () => {
  if (instance) {
    instance.toggle(false)
  }
}
