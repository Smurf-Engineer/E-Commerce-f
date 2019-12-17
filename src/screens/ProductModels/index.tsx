/**
 * ProductModels Screen - Created by Jesús Apodaca on 16/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as productModelsActions from './actions'
import messages from './messages'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
import {
  Container,
  Header,
  Logo,
  Title,
  BackIcon,
  BackButton,
  Back,
  TopMenu,
  Layout,
  Side,
  TopMessage,
  ModelContainer,
  SaveButton,
  AddModel
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'

interface Props {
  intl: InjectedIntl
}
export class ProductModels extends React.Component<Props, {}> {
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
        <Layout>
          <Side>
            <TopMessage>{formatMessage(messages.build3D)}</TopMessage>
            <AddModel>{formatMessage(messages.addModel)}</AddModel>
          </Side>
          <ModelContainer>
            <SaveButton>{formatMessage(messages.saveDesign)}</SaveButton>
            <Logo src={logo} />
          </ModelContainer>
        </Layout>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const productModelsReducer = state.get('productModels').toJS()
  return {
    ...productModelsReducer
  }
}

const ProductModelsEnhance = compose(
  withApollo,
  injectIntl,
  connect(mapStateToProps, {
    ...productModelsActions
  })
)(ProductModels)

export default ProductModelsEnhance
