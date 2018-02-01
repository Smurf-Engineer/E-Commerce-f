/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => [
        'ES6 Class',
        'ES6 Class (PureComponent)',
        'Stateless Function',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: data => {
    let componentTemplate;

    switch (data.type) {
    case 'ES6 Class':
      componentTemplate = './component/es6.tsx.hbs';
      break;
    case 'ES6 Class (PureComponent)':
      componentTemplate = './component/pure.tsx.hbs';
      break;
    case 'Stateless Function':
      componentTemplate = './component/stateless.tsx.hbs';
      break;
    default:
      componentTemplate = './component/es6.tsx.hbs';
      break;
    }

    const actions = [
      {
        type: 'add',
        path: '../../src/components/{{properCase name}}/index.tsx',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../src/components/{{properCase name}}/styledComponents.tsx',
        templateFile: './component/styledComponents.tsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../src/components/{{properCase name}}/test.tsx',
        templateFile: './component/test.tsx.hbs',
        abortOnFail: true,
      },
    ];
    return actions;
  },
};
