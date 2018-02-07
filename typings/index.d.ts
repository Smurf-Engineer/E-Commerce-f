declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export = value
}
