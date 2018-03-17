/**
 * YotpoReviews Component - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import { Container, YotpoContainer } from './styledComponents'
import ReactDOM from 'react-dom'

interface Props {
  yotpoId: string
}

declare global {
  interface Window {
    yotpo: any
  }
}

class YotpoReviews extends React.Component<Props, any> {
  yotpo: any
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.yotpoId !== this.props.yotpoId) {
      this.updateYotpoWidget(nextProps.yotpoId)
    }
  }

  componentDidMount() {
    this.updateYotpoWidget(this.props.yotpoId)
  }

  updateYotpoWidget = (id: string) => {
    try {
      const element = ReactDOM.findDOMNode(this.yotpo)
      element.setAttribute('class', 'yotpo yotpo-main-widget')
      element.setAttribute('data-product-id', id)
      element.setAttribute('data-price', 'Product Price')
      element.setAttribute('data-currency', 'Price Currency')
      element.setAttribute('data-name', 'Product Title')

      if (window.yotpo.inview) {
        window.yotpo.refreshWidgets()
      }
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <Container>
        <YotpoContainer innerRef={yotpo => (this.yotpo = yotpo)} />
      </Container>
    )
  }
}

export default YotpoReviews
