/**
 * DesignLabAdmin Component - Created by eduardoquintero on 12/06/19.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import message from 'antd/lib/message'
import { BLUE } from '../../theme/colors'
import {
  getDesignLabInfo,
  setDeliveryDaysMutation,
  setPlaylistMutation
} from './data'
import Spin from 'antd/lib/spin'
import * as DesignLabActions from './actions'
import {
  Container,
  SpinContainer,
  ScreenTitle,
  StyledButton,
  StyledInputNumber,
  StyledInput,
  ButtonWrapper,
  BoxContainer,
  InfoText
} from './styledComponents'
import messages from './messages'

interface Props {
  history: any
  client: any
  loading: any
  dispatch: any
  tutorialPlaylist: string
  deliveryDays: number
  deliveryDaysChanges: boolean
  tutorialPlaylistChanged: boolean
  formatMessage: (messageDescriptor: any) => string
  setDataAction: (data: any) => void
  setDeliveryDaysAction: (value: number) => void
  setPlaylistAction: (value: string) => void
  setDeliveryDays: (variables: {}) => Promise<any>
  setPlaylist: (variables: {}) => Promise<any>
}

class DesignLabAdmin extends React.Component<Props, {}> {
  async componentDidMount() {
    const {
      client: { query },
      setDataAction
    } = this.props
    try {
      const response = await query({
        query: getDesignLabInfo,
        fetchPolicy: 'network-only'
      })
      setDataAction(response.data.getDesignLabInfo)
    } catch (e) {
      message.error(e.message)
    }
  }
  handleChangeText = (event: any) => {
    const { setPlaylistAction } = this.props
    setPlaylistAction(event.target.value)
  }
  saveDeliveryDays = async () => {
    const { setDeliveryDays, deliveryDays } = this.props
    try {
      const response = await setDeliveryDays({ variables: { deliveryDays } })
      message.success(get(response, 'data.setDeliveryDays.message', ''))
    } catch (e) {
      message.error(e.message)
    }
  }
  savePlaylist = async () => {
    const { tutorialPlaylist, setPlaylist } = this.props
    try {
      const response = await setPlaylist({
        variables: { playlist: tutorialPlaylist }
      })
      message.success(get(response, 'data.setPlaylist.message', ''))
    } catch (e) {
      message.error(e.message)
    }
  }
  render() {
    const {
      formatMessage,
      loading,
      tutorialPlaylist,
      deliveryDays,
      tutorialPlaylistChanged,
      deliveryDaysChanges,
      setDeliveryDaysAction
    } = this.props

    return loading ? (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    ) : (
      <Container>
        <ScreenTitle>{formatMessage(messages.deliveryDates)}</ScreenTitle>
        <BoxContainer>
          <InfoText>{formatMessage(messages.currentDeliveryDate)}</InfoText>
          <StyledInputNumber
            onChange={setDeliveryDaysAction}
            value={deliveryDays}
          />
          <ButtonWrapper color={BLUE}>
            <StyledButton
              type="primary"
              disabled={!deliveryDaysChanges}
              onClick={this.saveDeliveryDays}
              loading={loading}
            >
              {formatMessage(messages.update)}
            </StyledButton>
          </ButtonWrapper>
        </BoxContainer>
        <ScreenTitle>{formatMessage(messages.videoTutorial)}</ScreenTitle>
        <BoxContainer>
          <InfoText>{formatMessage(messages.tutorialPlaylist)}</InfoText>
          <StyledInput
            onChange={this.handleChangeText}
            value={tutorialPlaylist}
          />
          <ButtonWrapper color={BLUE}>
            <StyledButton
              type="primary"
              disabled={!tutorialPlaylistChanged}
              onClick={this.savePlaylist}
              loading={loading}
            >
              {formatMessage(messages.update)}
            </StyledButton>
          </ButtonWrapper>
        </BoxContainer>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('designLabAdmin').toJS()

const DesignLabAdminEnhance = compose(
  withApollo,
  setDeliveryDaysMutation,
  setPlaylistMutation,
  connect(
    mapStateToProps,
    { ...DesignLabActions }
  )
)(DesignLabAdmin)

export default DesignLabAdminEnhance
