/**
 * File configuration
 */

export const TOTAL_OF_FILES = 5
export const MINIMUM_OF_AREAS = 1

export const enum Extension {
  Config = 'application/json',
  Svg = 'image/svg+xml'
}

export const enum File {
  Config = 'config'
}

export const filesInfo = [
  {
    file: File.Config,
    label: 'Config JSON',
    extension: Extension.Config
  }
]
