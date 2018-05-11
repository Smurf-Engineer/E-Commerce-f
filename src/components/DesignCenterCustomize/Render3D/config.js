/**
 * ThreeJs config
 */

export const jerseyTextures = (design = 'default') => ({
  areas: [
    `./models/Tour5/designs/${design}/colorblock_1.png`,
    `./models/Tour5/designs/${design}/colorblock_2.png`,
    `./models/Tour5/designs/${design}/colorblock_3.png`,
    `./models/Tour5/designs/${design}/colorblock_4.png`,
    `./models/Tour5/designs/${design}/colorblock_5.png`
  ],
  textures: {
    backPocket: './models/Tour5/branding.png',
    flatlock: './models/Tour5/flatlock.png',
    label: './models/Red-J.jpg',
    bumpMap: './models/TOUR-SS_Jersey-BUMP.jpg',
    front: './models/Tour5/bb-1-camfront_Front.png'
  }
})

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
    z: 249.98439334358835
  },
  3: {
    // Left
    x: 249.7141197905644,
    y: 4.759701275836918,
    z: -10.96374119486817
  }
}
