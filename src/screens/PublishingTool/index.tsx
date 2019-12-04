/**
 * PublishingTool Screen - Created by eduardoquintero on 02/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as publishingToolActions from './actions'
import { GetProductsByIdQuery } from './data'
import messages from './messages'
import { connect } from 'react-redux'
import { compose, withApollo, graphql } from 'react-apollo'
import {
  Container,
  Header,
  Logo,
  Title,
  BackIcon,
  BackButton,
  Back,
  TopMenu,
  Layout
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import { Product, QueryProps } from '../../types/common'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'

interface ProductTypes extends Product {
  intendedUse: string
  temperatures: string
  materials: string
}

interface Data extends QueryProps {
  productFromCode: ProductTypes
}

interface Props {
  intl: InjectedIntl
  productToSearch: string
}
export class PublishingTool extends React.Component<Props, {}> {
  render3D: any
  async componentDidMount() {
    await LoadScripts(threeDScripts)
  }
  handleOnPressBack = () => {
    window.location.replace('/admin')
  }

  render() {
    const { intl } = this.props
    const { formatMessage } = intl

    return (
      <Container>
        <Helmet title={formatMessage(messages.title)} />
        <Header>
          <Logo src={logo} />
          <Title>{formatMessage(messages.title)}</Title>
        </Header>
        <TopMenu>
          <BackButton onClick={this.handleOnPressBack}>
            <BackIcon src={backIcon} />
            <Back>{formatMessage(messages.back)}</Back>
          </BackButton>
        </TopMenu>
        <Layout />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const publishingTool = state.get('publishingTool').toJS()
  return {
    ...publishingTool
  }
}

type OwnProps = {
  productCode?: string
}

const PublishingToolEnhance = compose(
  withApollo,
  injectIntl,
  connect(mapStateToProps, {
    ...publishingToolActions
  }),
  graphql<Data>(GetProductsByIdQuery, {
    options: (ownprops: OwnProps) => {
      const { productCode } = ownprops
      return {
        variables: {
          code: productCode
        },
        skip: !productCode,
        fetchPolicy: 'network-only'
      }
    }
  })
)(PublishingTool)

export default PublishingToolEnhance
