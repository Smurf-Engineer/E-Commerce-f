/**
 * File configuration
 */
import { UploadFile } from '../../../../types/common'

export const TOTAL_OF_FILES = 5
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
  Branding = 'branding',
  Binding = 'binding',
  BibBrace = 'bibBrace',
  Zipper = 'zipper'
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
    label: 'Extra area (Branding, Predyed, etc...)',
    extension: Extension.Svg
  }
]

export const optionalFiles = {
  flatlock: {
    file: File.Flatlock,
    label: 'Flatlock',
    extension: Extension.Png
  },
  binding: {
    file: File.Binding,
    label: 'Binding',
    extension: Extension.Jpg
  },
  zipper: {
    file: File.Zipper,
    label: 'Zipper',
    extension: Extension.Jpg
  },
  bibBrace: {
    file: File.BibBrace,
    label: 'Bib Brace',
    extension: Extension.Jpg
  }
}

export const WHITE = 'white'
export const BLACK = 'black'

export type ExtraFiles = {
  flatlock?: UploadFile
  binding?: {
    white: UploadFile
    black: UploadFile
  }
  zipper?: {
    white: UploadFile
    black: UploadFile
  }
  bibBrace?: {
    white: UploadFile
    black: UploadFile
  }
}
