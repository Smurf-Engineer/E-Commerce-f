declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare module '*.png' {
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

declare module 'react-responsive-redux' {
  let reducer: any
  let setMobileDetect: any
  let mobileParser: any
  let MobileScreen: any
  let DesktopScreen: any
}

declare module 'rc-drawer' {
  interface Props {
    prefixCls?: string
    sidebarStyle?: object
    contentStyle?: object
    overlayStyle?: object
    dragHandleStyle?: object
    docked?: boolean
    open: boolean
    transitions?: boolean
    touch?: boolean
    enableDragHandle?: boolean
    position?: string
    dragToggleDistance?: number
    onOpenChange?: () => void
    sidebar: any
    style?: any
  }

  class Drawer extends React.Component<Props, any> {}
  export default Drawer
}

declare module 'react-swipeable-clickeable-bottom-sheet' {
  interface Props {
    defaultOpen?: boolean
    fullScreen?: boolean
    marginTop?: number
    overflowHeight?: number
    overlay?: boolean
    scrollTopAtClose?: boolean
    shadowTip?: boolean
    swipeableViewsProps?: object
    topShadow?: boolean
    open?: boolean
    onChange?: () => void
    overlayClicked?: (evt: any) => void
  }

  class SwipeableBottomSheet extends React.Component<Props, any> {}
  export default SwipeableBottomSheet
}

declare module 'react-paypal-express-checkout-authorize' {
  interface Props {
    currency: string
    env: string
    total: number
    shipping: number
    client: object
    style?: object
    onError: any
    onSuccess: any
    onCancel: any
    paymentOptions?: object
  }

  class PaypalExpressBtn extends React.Component<Props, any> {}
  export default PaypalExpressBtn
}

declare module 'react-intercom' {
  interface Props {
    appID: string
    user_id?: string
    email?: string
    name?: string
  }

  class Intercom extends React.Component<Props, any> {}
  export function IntercomAPI(method: string): void

  export default Intercom
}
