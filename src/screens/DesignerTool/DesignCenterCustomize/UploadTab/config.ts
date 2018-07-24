/**
 * File configuration
 */

export const TOTAL_OF_FILES = 7
export const MINIMUM_OF_AREAS = 4

export const enum Extension {
  Obj = 'obj',
  Mtl = 'mtl',
  Jpg = 'image/jpeg',
  Png = 'image/png',
  Config = 'application/json',
  Svg = 'image/svg+xml'
}

export const enum File {
  Obj = 'obj',
  Mtl = 'mtl',
  BumpMap = 'bumpMap',
  Config = 'config',
  Flatlock = 'flatlock',
  Label = 'label',
  Branding = 'branding'
}

export const filesInfo = [
  {
    file: File.Obj,
    label: 'OBJ File',
    extension: Extension.Obj
  },
  {
    file: File.Mtl,
    label: 'MTL File',
    extension: Extension.Mtl
  },
  {
    file: File.BumpMap,
    label: 'Bump Map',
    extension: Extension.Jpg
  },
  {
    file: File.Flatlock,
    label: 'Flatlock',
    extension: Extension.Png
  },
  {
    file: File.Label,
    label: 'Label',
    extension: Extension.Jpg
  },
  {
    file: File.Config,
    label: 'Config JSON',
    extension: Extension.Config
  },
  {
    file: File.Branding,
    label: 'Branding',
    extension: Extension.Svg
  }
]
