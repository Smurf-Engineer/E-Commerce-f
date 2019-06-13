/**
 * DesignLabAdmin Component - Created by eduardoquintero on 12/06/19.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import message from 'antd/lib/message'
import { BLUE } from '../../theme/colors'
import { getDesignLabAdmin, setSecondaryHeaderMutation } from './data'
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
  formatMessage: (messageDescriptor: any) => string
}

class DesignLabAdmin extends React.Component<Props, {}> {
  async componentDidMount() {
    const {
      client: { query }
    } = this.props
    try {
      const response = await query({
        query: getDesignLabAdmin,
        fetchPolicy: 'network-only'
      })
      console.log(response)
    } catch (e) {
      message.error(e.message)
    }
  }

  render() {
    const { formatMessage, loading } = this.props

    return loading ? (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    ) : (
      <Container>
        <ScreenTitle>{formatMessage(messages.deliveryDates)}</ScreenTitle>
        <BoxContainer>
          <InfoText>{formatMessage(messages.currentDeliveryDate)}</InfoText>
          <StyledInputNumber />
          <ButtonWrapper color={BLUE}>
            <StyledButton
              type="primary"
              onClick={this.onSaveDiscount}
              loading={loading}
            >
              {formatMessage(messages.update)}
            </StyledButton>
          </ButtonWrapper>
        </BoxContainer>
        <ScreenTitle>{formatMessage(messages.videoTutorial)}</ScreenTitle>
        <BoxContainer>
          <InfoText>{formatMessage(messages.tutorialPlaylist)}</InfoText>
          <StyledInput />
          <ButtonWrapper color={BLUE}>
            <StyledButton
              type="primary"
              onClick={this.onSaveDiscount}
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
  setSecondaryHeaderMutation,
  connect(
    mapStateToProps,
    { ...DesignLabActions }
  )
)(DesignLabAdmin)

export default DesignLabAdminEnhance
