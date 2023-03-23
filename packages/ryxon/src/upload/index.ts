import { withInstall } from '../utils'
import _Upload, { UploadProps } from './Upload'

export const Upload = withInstall(_Upload)
export default Upload
export { uploadProps } from './Upload'
export type { UploadProps }
export type {
  UploadInstance,
  UploadThemeVars,
  UploadResultType,
  UploadFileListItem
} from './types'

declare module 'vue' {
  export interface GlobalComponents {
    RUpload: typeof Upload
  }
}
