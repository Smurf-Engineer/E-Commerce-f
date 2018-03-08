declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export = value
}

declare module 'react-star-ratings' {
  interface Props {
    rating: number
    typeOfWidget?: string
    numberOfStars: number
    changeRating?: () => void
    starHoverColor?: string
    starRatedColor?: string
    starEmptyColor?: string
    starDimension?: string
    starSpacing?: string
    gradientPathName?: string
    ignoreInlineStyles?: boolean
    svgIconPath?: string
    svgIconViewBox?: string
  }
  class StarRatings extends React.Component<Props, any> {}

  export default StarRatings
}

declare module 'react-facebook-login' {
  interface Props {
    appId: string
    autoLoad: boolean
    fields: string
    onClick?: (param: any | null) => void
    callback: (param: any) => void
    cssClass?: string
    scope?: string
    icon?: JSX.Element | string
  }

  class FacebookLogin extends React.Component<Props, any> {}
  export default FacebookLogin
}

declare module 'react-rangeslider' {
  interface Props {
    min: number
    max: number
    value: number
    orientation: string
    tooltip: boolean
    onChange: (value: number) => void
  }

  class Slider extends React.Component<Props, any> {}
  export default Slider
}
