/**
 * CreateStore Screen - Created by david on 09/04/18.
 */
import * as React from 'react'
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'

import { RouteComponentProps } from 'react-router-dom'
import Layout from '../../components/MainLayout'
import LockerTable from '../../components/LockerTable'
import Dragger from '../../components/TeamDragger'
import StoreForm from '../../components/StoreForm'
import TeamSizes from '../../components/TeamSizes'
import * as createStoreActions from './actions'
import messages from './messages'
import {
  Container,
  Title,
  Subtitle,
  Message,
  PriceMessage,
  LockerMessage,
  PreviewImage,
  buttonStyle
} from './styledComponents'

interface Props extends RouteComponentProps<any> {
  teamSizeId: number
  intl: InjectedIntl
  // Redux actions
  setTeamSizeAction: (id: number, range: string) => void
}

export class CreateStore extends React.Component<Props, {}> {
  state = {
    file: null,
    imagePreviewUrl: null
  }

  handleOnSelectRange = (id: number, range: string) => {
    const { setTeamSizeAction } = this.props
    setTeamSizeAction(id, range)
  }

  handleOnSelectFile = (file: any, imagePreviewUrl: any) =>
    this.setState({ file, imagePreviewUrl })

  render() {
    const { imagePreviewUrl } = this.state
    const { intl, history, teamSizeId } = this.props
    if (
      typeof window !== 'undefined' &&
      !JSON.parse(localStorage.getItem('user') as string)
    ) {
      return <Redirect to="/us?lang=en&currency=usd" />
    }

    return (
      <Layout {...{ history, intl }}>
        <Container>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <StoreForm />
          <Subtitle>
            <FormattedMessage {...messages.teamSizeTitle} />
          </Subtitle>
          <Message>
            <FormattedMessage {...messages.teamSizeMessage} />
          </Message>
          <TeamSizes
            currentSelected={teamSizeId}
            onSelectRange={this.handleOnSelectRange}
          />
          <Subtitle>
            <FormattedMessage {...messages.priceDropTitle} />
          </Subtitle>
          <PriceMessage>
            <p>{intl.formatMessage(messages.priceDropMessageP1)}</p>
            <p>{intl.formatMessage(messages.priceDropMessageP2)}</p>
            <p>{intl.formatMessage(messages.priceDropMessageP3)}</p>
          </PriceMessage>
          <Subtitle>
            <FormattedMessage {...messages.storeItemsTitle} />
          </Subtitle>
          <LockerMessage>
            <FormattedMessage {...messages.storeItemsMessage} />
          </LockerMessage>
          <Button type="primary" ghost={true} size="large" style={buttonStyle}>
            {`+ ${intl.formatMessage(messages.addItem)}`}
          </Button>
          <Subtitle>
            <FormattedMessage {...messages.stock} />
          </Subtitle>
          <LockerTable />
          <Subtitle>
            <FormattedMessage {...messages.bannerMessage} />
          </Subtitle>
          {imagePreviewUrl ? (
            <PreviewImage src={imagePreviewUrl} />
          ) : (
            <Dragger onSelectImage={this.handleOnSelectFile} />
          )}
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('createStore').toJS()

const CreateStoreEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...createStoreActions })
)(CreateStore)

export default CreateStoreEnhance
