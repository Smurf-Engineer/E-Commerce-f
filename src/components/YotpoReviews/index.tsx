/**
 * YotpoReviews Component - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import { Container, YotpoContainer } from './styledComponents'

interface Props {
  yotpoId: string
}

class YotpoReviews extends React.Component<Props, {}> {
  state = {
    render: true
  }
  render() {
    const { yotpoId } = this.props
    return (
      <Container>
        <YotpoContainer
          dangerouslySetInnerHTML={{
            __html: `<div class="yotpo yotpo-main-widget"
            data-product-id="${yotpoId}"
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
