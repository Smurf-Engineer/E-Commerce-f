/**
 * Screen Generator
 */

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add a screen component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or screen with this name already exists'
            : true
        }

        return 'The name is required'
      }
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message: 'Do you want an actions/constants/reducer tupel for this screen?'
    },
    {
      type: 'confirm',
      name: 'wantNavigationRoute',
      default: true,
      message: 'Do you want create a Navigation Route for this screen?'
    }
  ],
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: '../../src/screens/{{properCase name}}/index.tsx',
        templateFile: './screen/index.tsx.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: '../../src/screens/{{properCase name}}/styledComponents.tsx',
        templateFile: './screen/styledComponents.tsx.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: '../../src/screens/{{properCase name}}/test.tsx',
        templateFile: './screen/test.tsx.hbs',
        abortOnFail: true
      }
    ]

    if (data.wantNavigationRoute) {
      // Import screen
      actions.push({
        type: 'modify',
        path: '../../src/config/routes.ts',
        pattern: /(\/\* Routes \*\/)/g,
        template:
          "$1\nimport {{ properCase name }} from '../screens/{{ properCase name }}'"
      })
      // Create Route
      actions.push({
        type: 'modify',
        path: '../../src/config/routes.ts',
        pattern: /(const routes = \[)/g,
        template:
          "$1\n  {\n    path: '/{{ dashCase name }}',\n    name: '{{ camelCase name }}',\n    component: {{ properCase name }}\n  },"
      })
    }

    if (data.wantActionsAndReducer) {
      actions.push({
        type: 'modify',
        path: '../../src/store/rootReducer.ts',
        pattern: /(import { combineReducers } from 'redux')/g,
        template:
          "$1\nimport {{camelCase name}} from '../screens/{{properCase name}}/reducer'"
      })

      actions.push({
        type: 'modify',
        path: '../../src/store/rootReducer.ts',
        pattern: /(const rootReducer = combineReducers\({)/g,
        template: '$1\n  {{camelCase name}},'
      })

      actions.push({
        type: 'modify',
        path: '../../src/store/rootReducer.ts',
        pattern: /(export interface ReducersObject \{)/g,
        template: '$1\n  {{camelCase name}}: any,'
      })

      // Actions
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/actions.ts',
        templateFile: './screen/actions.ts.hbs',
        abortOnFail: true
      })

      // Constants
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/constants.ts',
        templateFile: './screen/constants.ts.hbs',
        abortOnFail: true
      })

      // Reducer
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/reducer.ts',
        templateFile: './screen/reducer.ts.hbs',
        abortOnFail: true
      })
    }

    return actions
  }
}
