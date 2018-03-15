/**
 * YotpoReviews Component - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, YotpoContainer } from './styledComponents'

interface Props {
  yotpoId: string
}

class YotpoReviews extends React.Component<Props, {}> {
  state = {
    render: true
  }
  componentDidMount() {
    this.setState({ render: false })
  }

  shouldComponentUpdate() {
    return this.state.render
  }

  render() {
    const { yotpoId } = this.props
    console.log('RENDER YOTPO REVIEWS')
    return (
      <Container>
        <div>YOTPO REVIEWS</div>
        <YotpoContainer
          dangerouslySetInnerHTML={{
            __html: `<div class="yotpo yotpo-main-widget"
            data-product-id="fondo"
            data-price="Product Price"
            data-currency="Price Currency"
            data-name="Product Title"
            </div>
        `
          }}
        />
      </Container>
    )
  }
}

export default YotpoReviews
