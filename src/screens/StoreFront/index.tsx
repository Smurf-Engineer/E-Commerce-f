/**
 * StoreFront Screen - Created by gustavomedina on 11/04/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
// import { ReducersObject } from '../../store/rootReducer'
import * as storeFrontActions from './actions'
import messages from './messages'
import {
  Container,
  HeadersContainer,
  SideBar,
  Content,
  Title,
  OrderTitle,
  PriceDescription,
  PriceTitle,
  TierTitle,
  TierDescription,
  AboutContainer,
  AboutTitle,
  TierContainer,
  StyledSlider
} from './styledComponents'
import ProductInfo from '../../components/ProductInfo'

interface Props {
  intl: InjectedIntl
}

// interface StateProps {
//   showDetails: boolean
//   showSpecs: boolean
// }

export class StoreFront extends React.Component<Props, {}> {
  state = {
    showDetails: true,
    showSpecs: true
  }

  toggleProductInfo = (id: string) => {
    const stateValue = this.state[`show${id}`]
    this.setState({ [`show${id}`]: !stateValue } as any)
  }

  render() {
    const { intl } = this.props

    const { formatMessage } = intl

    const marks = {
      1: '1',
      5: '2-5',
      24: '6-24',
      49: '25-49',
      99: '50-99'
    }

    return (
      <Container>
        <HeadersContainer>
          <Content>
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
            <PriceTitle>
              <FormattedMessage {...messages.priceDropTitle} />
            </PriceTitle>
            <PriceDescription>
              <FormattedMessage {...messages.priceDropSubTitle} />
            </PriceDescription>
            <PriceDescription>
              <FormattedMessage {...messages.priceDropDescription} />
            </PriceDescription>
          </Content>
          <SideBar>
            <OrderTitle>
              <FormattedMessage {...messages.orderTitle} />
            </OrderTitle>
          </SideBar>
        </HeadersContainer>
        <TierContainer>
          <TierTitle>
            <FormattedMessage {...messages.tierTitle} />
          </TierTitle>
          <TierDescription>
            <FormattedMessage {...messages.tierDescription} />
          </TierDescription>
          <StyledSlider marks={marks} disabled={true} defaultValue={37} />
        </TierContainer>
        <AboutContainer>
          <AboutTitle>
            <FormattedMessage {...messages.aboutOrdering} />
          </AboutTitle>
          <ProductInfo
            id="Details"
            title={formatMessage(messages.howMuchTitle)}
            showContent={false}
            toggleView={this.toggleProductInfo}
          >
            <div />
          </ProductInfo>
          <ProductInfo
            id="Details"
            title={formatMessage(messages.howLongTitle)}
            showContent={false}
            toggleView={this.toggleProductInfo}
          >
            <div />
          </ProductInfo>
          <ProductInfo
            id="Details"
            title={formatMessage(messages.CanIORder)}
            showContent={false}
            toggleView={this.toggleProductInfo}
          >
            <div />
          </ProductInfo>
        </AboutContainer>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('storeFront').toJS()

const StoreFrontEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...storeFrontActions })
)(StoreFront)

export default StoreFrontEnhance
