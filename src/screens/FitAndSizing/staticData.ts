export const boxHeaders = ['men', 'women', 'youth', 'accessories']

export const charts = [
  {
    title: 'men',
    tables: [
      {
        headers: ['size', 'waist', 'chest', 'inseam'],
        size: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
        waist: [
          '23 - 25.5',
          '26 - 28.5',
          '29 - 31.5',
          '32 - 34.5',
          '35 - 37.5',
          '38 - 39.5',
          '40 - 42.5'
        ],
        chest: [
          '31 - 33',
          '33 - 35',
          '36 - 38',
          '39 - 41',
          '42 - 44',
          '44 - 46',
          '46 - 49'
        ],
        inseam: ['31', '31.5', '32', '32.5', '33', '33.5', '34']
      }
    ]
  },
  {
    title: 'women',
    tables: [
      {
        headers: ['size', 'waist', 'chest', 'hips', 'inseam'],
        size: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
        waist: [
          '21 - 23',
          '23 - 25',
          '25 - 27',
          '27 - 29',
          '29 - 32',
          '32 - 34',
          '34 - 37'
        ],
        chest: [
          '29 - 31',
          '31 - 33',
          '33 - 35',
          '35 - 37.5',
          '37.5 - 40',
          '40 - 42.5',
          '42.5 - 45'
        ],
        hips: [
          '31 - 33',
          '33 - 35',
          '35 - 37',
          '37 - 39',
          '39 - 42',
          '42 - 44',
          '44 - 47'
        ],
        inseam: ['28.5', '29', '29.5', '30', '30.5', '31', '31.5']
      }
    ]
  },
  {
    title: 'youth',
    tables: [
      {
        title: '',
        headers: ['size', 'waist', 'chest', 'height'],
        size: ['age6', 'age8', 'age10', 'age12', 'age14'],
        waist: ['22 - 23', '23 - 25', '24 - 25', '25 - 26', '27 - 29'],
        chest: ['24 - 26', '26 - 28', '28 - 30', '30 - 32', '32 - 34'],
        height: [
          '< 4´3´´',
          '4´3´´ - 4´5´´',
          '4´5´´ - 4´8´´',
          '4´8´´ - 5´1´´',
          '5´1´´ - 5´4´´'
        ]
      }
    ]
  },
  {
    title: 'accessories',
    tables: [
      {
        title: 'armWarmer',
        headers: ['size', 'bicep', 'length'],
        size: ['s', 'm', 'l', 'xl'],
        bicep: ['9 - 10', '11 - 12', '13 - 14', '15 - 16'],
        length: ['16.75', '17.5', '18.25', '19']
      },
      {
        title: 'kneeWarmer',
        headers: ['size', 'tight', 'calf', 'length'],
        size: ['s', 'm', 'l', 'xl'],
        tight: ['17 - 20', '18.5 - 22', '20 - 24', '22 - 26'],
        calf: ['11.5 - 13.5', '12 - 14.5', '13 - 15.5', '14 - 16.5'],
        length: ['15', '16', '17.5', '19']
      },
      {
        title: 'shoeCover',
        headers: ['size', 'mens', 'womens'],
        size: ['xxs_xs', 's_m', 'l_xl', 'xxl'],
        mens: ['5 - 6.5', '7 - 8.5', '9 - 11.5', '12 - 14'],
        womens: ['N/A', '5 - 6.5', '7 - 8.5', 'N/A']
      },
      {
        title: 'legWarmer',
        headers: ['size', 'tight', 'calf', 'length'],
        size: ['s', 'm', 'l', 'xl'],
        tight: ['17 - 20', '18.5 - 22', '20 - 24', '22 - 26'],
        calf: ['11.5 - 13.5', '12 - 14.5', '13 - 15.5', '14 - 16.5'],
        length: ['23', '24', '25', '27']
      },
      {
        title: 'cyclingCap',
        headers: ['size', 'circumference'],
        size: ['s_m', 'l_xl'],
        circumference: ['21', '22.4']
      }
    ]
  }
]
