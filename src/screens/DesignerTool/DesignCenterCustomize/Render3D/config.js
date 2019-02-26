export const CANVAS_SIZE = 2048
export const CORNER_SIZE = 40

/**
 * ThreeJs config
 */

export const modelPositions = {
  back: {
    x: -4.387064103158292,
    y: 3.6432051132451,
    z: -249.938145671558
  },
  right: {
    x: -249.82530542034553,
    y: -4.7597012758366954,
    z: -8.041269513965343
  },
  front: {
    x: 1.4624917941275544,
    y: 2.3799584848944044,
    z: 125
  },
  left: {
    x: 249.7141197905644,
    y: 4.759701275836918,
    z: -10.96374119486817
  }
}

export const fabricJsConfig = {
  settings: {
    borderColor: 'black',
    cornerSize: 40
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

export const MESH_NAME = 'JV2_3D_MODEL'
export const BIB_BRACE_NAME = 'bibBrace'
export const ZIPPER_NAME = 'zipper'
export const BINDING_NAME = 'binding'

export const CANVAS_MESH = 'Canvas_Mesh'

/* Canvas element actions  */
export const DELETE_ACTION = 'DELETE_ACTION'
export const DUPLICATE_ACTION = 'DUPLICATE_ACTION'
export const BRING_TO_FRONT_ACTION = 'BRING_TO_FRONT_ACTION'
export const ROTATE_ACTION = 'ROTATE_ACTION'
export const SCALE_ACTION = 'SCALE_ACTION'
export const DRAG_ACTION = 'DRAG_ACTION'
