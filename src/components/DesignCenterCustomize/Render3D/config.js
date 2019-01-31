/**
 * ThreeJs config
 */
export const CANVAS_SIZE = 1024
export const WARNING_FACTOR = 0.2
export const NUMBER_OF_DECIMALS = 3
export const CENTER_ORIGIN = 'center'
export const EXTRA_POSITION = 30
export const BACK_VIEW = 0
export const LEFT_VIEW = 3
export const TOP_VIEW = 4
export const EXTRA_FIELDS = [
  'fileId',
  'fileUrl',
  'isClipArtGroup',
  'isImageGroup'
]
export const INITIAL_ZOOM = 1.85
export const INITIAL_ZOOM_MOBILE = 1.2
export const THUMBNAIL_ZOOM = 150
export const CAMERA_MIN_ZOOM = 100
export const CAMERA_MAX_ZOOM = 350
export const viewPositions = {
  0: {
    // Back
    x: -4.387064103158292,
    y: 3.6432051132451,
    z: -249.938145671558
  },
  1: {
    // Right
    x: -249.82530542034553,
    y: -4.7597012758366954,
    z: -8.041269513965343
  },
  2: {
    // Front
    x: 1.4624917941275544,
    y: 2.3799584848944044,
    z: 200
  },
  3: {
    // Left
    x: 249.7141197905644,
    y: 4.759701275836918,
    z: -10.96374119486817
  },
  4: {
    // TOP
    x: 0,
    y: 250,
    z: 0
  }
}

export const fabricJsConfig = {
  settings: {
    borderColor: 'black',
    cornerSize: 20
  },
  tl: {
    icon: 'delete.svg'
  },
  tr: {
    icon: 'duplicate.svg'
  },
  bl: {
    icon: 'rotate.svg'
  },
  br: {
    icon: 'expand.svg'
  },
  mb: {
    icon: 'layer.svg'
  }
}

/* Canvas element actions  */
export const DELETE_ACTION = 'DELETE_ACTION'
export const DUPLICATE_ACTION = 'DUPLICATE_ACTION'
export const BRING_TO_FRONT_ACTION = 'BRING_TO_FRONT_ACTION'
export const ROTATE_ACTION = 'ROTATE_ACTION'
export const SCALE_ACTION = 'SCALE_ACTION'
export const DRAG_ACTION = 'DRAG_ACTION'

export const CHANGE_ACTIONS = [SCALE_ACTION, DRAG_ACTION, ROTATE_ACTION]

export const MESH_NAME = 'JV2_3D_MODEL'
export const CANVAS_MESH = 'Canvas_Mesh'
export const BRANDING_MESH = 'Branding_Mesh'

export const BIB_BRACE_NAME = 'bibBrace'
export const ZIPPER_NAME = 'zipper'
export const BINDING_NAME = 'binding'
