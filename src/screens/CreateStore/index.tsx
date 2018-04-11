/**
 * CreateStore Screen - Created by david on 09/04/18.
 */
import * as React from 'react'
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import { Moment } from 'moment'
import { RouteComponentProps } from 'react-router-dom'
import Layout from '../../components/MainLayout'
import LockerTable from '../../components/LockerTable'
import LockerModal from '../../components/LockerModal'
import SwitchWithLabel from '../../components/SwitchWithLabel'
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
  Row,
  RowButtons,
  RowSwitch,
  ButtonDelete,
  buttonStyle,
  buttonBuildStyle
} from './styledComponents'

interface Props extends RouteComponentProps<any> {
  teamSizeId: number
  intl: InjectedIntl
  name: string
  privateStore: boolean
  onDemand: boolean
  startDate: string
  startDateMoment?: Moment
  endDate: string
  endDateMoment?: Moment
  passCode: string
  openLocker: boolean
  // Redux actions
  setTeamSizeAction: (id: number, range: string) => void
  updateNameAction: (name: string) => void
  updateStartDateAction: (dateMoment: Moment, date: string) => void
  updateEndDateAction: (dateMoment: Moment, date: string) => void
  updatePrivateAction: (active: boolean) => void
  updateOnDemandAction: (active: boolean) => void
  updatePassCodeAction: (code: string) => void
  setOpenLockerAction: (open: boolean) => void
}

export class CreateStore extends React.Component<Props, {}> {
  state = {
    file: null,
    imagePreviewUrl: null
  }

  beforeUpload = (file: any) => {
    const reader = new FileReader()

    reader.onloadend = () =>
      this.setState({ file, imagePreviewUrl: reader.result })

    if (file) {
      reader.readAsDataURL(file)
    }

    return false
  }

  handleOnSelectRange = (id: number, range: string) => {
    const { setTeamSizeAction } = this.props
    setTeamSizeAction(id, range)
  }

  handleOnDeleteImage = () =>
    this.setState({ file: null, imagePreviewUrl: null })

  handleOnAddItem = () => {
    const { setOpenLockerAction } = this.props
    setOpenLockerAction(true)
  }

  handleOnCloseLocker = () => {
    const { setOpenLockerAction } = this.props
    setOpenLockerAction(false)
  }

  render() {
    const { imagePreviewUrl } = this.state
    const {
      intl,
      history,
      teamSizeId,
      openLocker,
      updateNameAction,
      updateStartDateAction,
      updateEndDateAction,
      updatePrivateAction,
      updateOnDemandAction,
      updatePassCodeAction,
      name,
      startDateMoment,
      endDateMoment,
      privateStore,
      onDemand,
      passCode
    } = this.props
    const { formatMessage } = intl
    if (
      typeof window !== 'undefined' &&
      !JSON.parse(localStorage.getItem('user') as string)
    ) {
      return <Redirect to="/us?lang=en&currency=usd" />
    }

    const bannerComponent = imagePreviewUrl ? (
      <PreviewImage src={imagePreviewUrl} />
    ) : (
      <Dragger onSelectImage={this.beforeUpload} />
    )

    return (
      <Layout {...{ history, intl }}>
        <Container>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <StoreForm
            {...{ name }}
            startDate={startDateMoment}
            endDate={endDateMoment}
            onUpdateName={updateNameAction}
            onSelectStartDate={updateStartDateAction}
            onSelectEndDate={updateEndDateAction}
          />
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
            <p>{formatMessage(messages.priceDropMessageP1)}</p>
            <p>{formatMessage(messages.priceDropMessageP2)}</p>
            <p>{formatMessage(messages.priceDropMessageP3)}</p>
          </PriceMessage>
          <Subtitle>
            <FormattedMessage {...messages.storeItemsTitle} />
          </Subtitle>
          <LockerMessage>
            <FormattedMessage {...messages.storeItemsMessage} />
          </LockerMessage>
          <Button
            type="primary"
            ghost={true}
            size="large"
            style={buttonStyle}
            onClick={this.handleOnAddItem}
          >
            {`+ ${formatMessage(messages.addItem)}`}
          </Button>
          <Subtitle>
            <FormattedMessage {...messages.stock} />
          </Subtitle>
          <LockerTable />
          <Row>
            <Subtitle>
              <FormattedMessage {...messages.bannerMessage} />
            </Subtitle>
            {!!imagePreviewUrl && (
              <RowButtons>
                <Upload
                  beforeUpload={this.beforeUpload}
                  multiple={false}
                  showUploadList={false}
                  supportServerRender={true}
                >
                  <Button>Change</Button>
                </Upload>
                <ButtonDelete onClick={this.handleOnDeleteImage}>
                  Delete
                </ButtonDelete>
              </RowButtons>
            )}
          </Row>
          {bannerComponent}
          <RowSwitch>
            <SwitchWithLabel
              {...{ passCode, updatePassCodeAction }}
              withInput={true}
              checked={privateStore}
              onChange={updatePrivateAction}
              label={formatMessage(messages.privateLabel)}
              message={formatMessage(messages.privateMessage)}
            />
            <SwitchWithLabel
              checked={onDemand}
              onChange={updateOnDemandAction}
              label={formatMessage(messages.onDemandLabel)}
              message={formatMessage(messages.onDemandMessage)}
            />
          </RowSwitch>
          <Button type="primary" size="large" style={buttonBuildStyle}>
            {formatMessage(messages.buttonBuild)}
          </Button>
          <LockerModal
            visible={openLocker}
            onRequestClose={this.handleOnCloseLocker}
          />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('createStore').toJS()

const CreateStoreEnhance = compose(
  injectIntl,
  withApollo,
  connect(mapStateToProps, { ...createStoreActions })
)(CreateStore)

export default CreateStoreEnhance
