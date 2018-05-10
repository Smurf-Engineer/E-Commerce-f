/**
 * Checkout Screen - Created by cazarez on 05/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import Steps from 'antd/lib/steps'
import * as checkoutActions from './actions'
import messages from './messages'
import {
  Container,
  Content,
  CheckoutTitle,
  StepsContainer,
  SummaryContainer,
  ContinueButton,
  StepWrapper,
  SummaryTitle
} from './styledComponents'
import Layout from '../../components/MainLayout'
import Shipping from '../../components/Shippping'

const { Step } = Steps
interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  firstName: string
  lastName: string
  street: string
  apartment: string
  country: string
  state: string
  city: string
  zipCode: string
  phone: string
  currentStep: number
  hasError: boolean
  stepAdvanceAction: (step: number) => void
  validFormAction: (hasError: boolean) => void
  selectDropdownAction: (id: string, value: string) => void
  inputChangeAction: (id: string, value: string) => void
  smsCheckAction: (checked: boolean) => void
  emailCheckAction: (checked: boolean) => void
}

const stepperTitles = ['SHIPPING', 'PAYMENT', 'REVIEW']
class Checkout extends React.Component<Props, {}> {
  render() {
    const { intl, history, currentStep, hasError } = this.props
    const steps = stepperTitles.map((step, key) => (
      <Step title={step} {...{ key }} />
    ))

    return (
      <Layout {...{ history, intl }}>
        <Container>
          <CheckoutTitle>
            {intl.formatMessage(messages.title).toLocaleUpperCase()}
          </CheckoutTitle>
          <Content>
            <StepsContainer>
              <StepWrapper>
                <Steps current={currentStep}>{steps}</Steps>
              </StepWrapper>
              <div>{this.renderStepContent(currentStep)}</div>
            </StepsContainer>
            <SummaryContainer>
              <SummaryTitle>{'Order Summary'}</SummaryTitle>
            </SummaryContainer>
          </Content>
          <ContinueButton onClick={this.nextStep}>{'Continue'}</ContinueButton>
        </Container>
      </Layout>
    )
  }

  nextStep = () => {
    const {
      currentStep,
      stepAdvanceAction,
      firstName,
      lastName,
      street,
      apartment,
      country,
      state,
      city,
      zipCode,
      phone,
      validFormAction,
      smsCheckAction,
      emailCheckAction
    } = this.props
    const error =
      !firstName ||
      !lastName ||
      !street ||
      !country ||
      !state ||
      !city ||
      !zipCode ||
      !phone
    if (error) {
      validFormAction(error)
      return
    }
    console.log(
      'button ',
      error,
      firstName,
      lastName,
      street,
      country,
      state,
      zipCode,
      phone
    )
    if (currentStep < stepperTitles.length - 1) {
      stepAdvanceAction(currentStep + 1)
    }
  }

  renderStepContent = (step: number) => {
    const {
      firstName,
      lastName,
      street,
      apartment,
      country,
      state,
      city,
      zipCode,
      phone,
      hasError,
      intl,
      smsCheckAction,
      emailCheckAction,
      inputChangeAction,
      selectDropdownAction
    } = this.props
    switch (step) {
      case 0:
        return (
          <Shipping
            {...{
              hasError,
              firstName,
              lastName,
              street,
              apartment,
              country,
              state,
              city,
              zipCode,
              phone,
              smsCheckAction,
              emailCheckAction,
              inputChangeAction,
              selectDropdownAction
            }}
            formatMessage={intl.formatMessage}
          />
        )
      case 1:
        return 'step two'
      case 2:
        return 'step three'
      default:
        return null
    }
  }
}

const mapStateToProps = (state: any) => state.get('checkout').toJS()

const CheckoutEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...checkoutActions })
)(Checkout)

export default CheckoutEnhance
