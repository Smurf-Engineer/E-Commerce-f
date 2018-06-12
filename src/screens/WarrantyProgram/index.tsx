/**
 * WarrantyProgram Screen - Created by gustavomedina on 07/06/18.
 */
// tslint:disable:max-line-length
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import Radio from 'antd/lib/radio'
import Checkbox from 'antd/lib/checkbox'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import * as warrantyProgramActions from './actions'
import messages from './messages'
import {
  Container,
  Text,
  SectionContainder,
  SectionTitle,
  SectionText,
  SectionSubTitle,
  ExpandContainter,
  StyledInput,
  RequiredSpan,
  InputTitleContainer,
  Label,
  ErrorMsg,
  FormInfo,
  FlexContainer,
  InputsContainer,
  TwoInputsContainer,
  StyledRadioGroup,
  ButtonWrapper
} from './styledComponents'
import Layout from '../../components/MainLayout'
import DivInfo from '../../components/ProductInfo'
import Divider from 'antd/lib/divider'

const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const { TextArea } = Input

interface StateProps {
  openForm: boolean
}
interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  firstName: string
  lastName: string
  email: string
  orderNumber: string
  productsAffected: string
  productIs: string
  gender: string
  size: string
  problems: string[]
  issueDescription: string
  hasError: boolean
  inputChangeAction: (id: string, value: string) => void
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
  setEmail: (value: string) => void
  setOrderNumber: (value: string) => void
  setProductsAffected: (value: string) => void
  setProductIs: (value: string) => void
  setGender: (value: string) => void
  setSize: (value: string) => void
  setProblems: (value: string) => void
  setIssueDescription: (value: string) => void
}

const oldOptions = [
  'New and Unused',
  'Less than 6 months old',
  '1 year or older'
]
const genderOptions = ['Male', 'Female', 'Youth', 'Unisex']
const sizeOptions = [
  '2XS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
  '3XL',
  '4XL',
  '5XL'
]
const problemsOptions = [
  'Fabric is defective (holes, runs or tears)',
  'Sewing issues',
  'Zipper Failure',
  'Other (Explain below)'
]

export class WarrantyProgram extends React.Component<Props, StateProps> {
  state: StateProps = {
    openForm: true
  }

  handleToggleRow = () => {
    const { openForm } = this.state
    this.setState({ openForm: !openForm })
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { setFirstName } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    setFirstName(value)
  }

  render() {
    const {
      history,
      intl,
      firstName,
      lastName,
      email,
      orderNumber,
      productsAffected,
      issueDescription,
      hasError
    } = this.props
    const { openForm } = this.state
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <SectionContainder>
            <Text>
              <FormattedMessage {...messages.title} />
            </Text>
            <SectionText
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.titleText)
              }}
            />
          </SectionContainder>
          <Divider />
          <SectionContainder>
            <SectionTitle id="TermsAndConditions">
              {intl.formatMessage(messages.warrantyTitle).toLocaleUpperCase()}
            </SectionTitle>
            <SectionSubTitle>
              {intl.formatMessage(messages.warrantySubtitle)}
            </SectionSubTitle>
            <SectionText
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.warrantyText)
              }}
            />
          </SectionContainder>
          <ExpandContainter>
            <DivInfo
              titleWidth={'85%'}
              title={intl.formatMessage(messages.formTitle)}
              titleColor={'#5F6062'}
              showContent={openForm}
              toggleView={this.handleToggleRow}
            >
              <FlexContainer>
                <TwoInputsContainer>
                  <InputsContainer>
                    <InputTitleContainer>
                      <Label>{intl.formatMessage(messages.firstName)}</Label>
                      <RequiredSpan>*</RequiredSpan>
                    </InputTitleContainer>
                    <StyledInput
                      id="firstName"
                      value={firstName}
                      onChange={this.handleInputChange}
                      maxLength="50"
                    />
                    {!firstName &&
                      hasError && (
                        <ErrorMsg>{'This field is required'}</ErrorMsg>
                      )}
                  </InputsContainer>
                  <InputsContainer>
                    <InputTitleContainer>
                      <Label>{intl.formatMessage(messages.lastName)}</Label>
                      <RequiredSpan>*</RequiredSpan>
                    </InputTitleContainer>
                    <StyledInput
                      id="lastName"
                      value={lastName}
                      onChange={this.handleInputChange}
                      maxLength="50"
                    />
                    {!lastName &&
                      hasError && (
                        <ErrorMsg>{'This field is required'}</ErrorMsg>
                      )}
                  </InputsContainer>
                </TwoInputsContainer>
                <FormInfo>
                  <FormattedMessage {...messages.nameInfo} />
                </FormInfo>
              </FlexContainer>
              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>{intl.formatMessage(messages.email)}</Label>
                    <RequiredSpan>*</RequiredSpan>
                  </InputTitleContainer>
                  <StyledInput
                    id="email"
                    value={email}
                    onChange={this.handleInputChange}
                    maxLength="100"
                  />
                  {!firstName &&
                    hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
                </InputsContainer>
                <FormInfo>
                  <FormattedMessage {...messages.emailInfo} />
                </FormInfo>
              </FlexContainer>
              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>{intl.formatMessage(messages.orderNumber)}</Label>
                  </InputTitleContainer>
                  <StyledInput
                    id="orderNumber"
                    value={orderNumber}
                    onChange={this.handleInputChange}
                    maxLength="100"
                  />
                  {!firstName &&
                    hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
                </InputsContainer>
                <FormInfo>
                  <FormattedMessage {...messages.orderNumberInfo} />
                </FormInfo>
              </FlexContainer>
              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>
                      {intl.formatMessage(messages.productsAffected)}
                    </Label>
                    <RequiredSpan>*</RequiredSpan>
                  </InputTitleContainer>
                  <StyledInput
                    id="productsAffected"
                    value={productsAffected}
                    onChange={this.handleInputChange}
                    maxLength="100"
                  />
                  {!firstName &&
                    hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
                </InputsContainer>
                <FormInfo>
                  <FormattedMessage {...messages.productsAffectedInfo} />
                </FormInfo>
              </FlexContainer>

              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>{intl.formatMessage(messages.productIs)}</Label>
                    <RequiredSpan>*</RequiredSpan>
                  </InputTitleContainer>
                  <StyledRadioGroup>
                    <RadioGroup options={oldOptions} />
                  </StyledRadioGroup>
                  {!firstName &&
                    hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
                </InputsContainer>
              </FlexContainer>

              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>{intl.formatMessage(messages.gender)}</Label>
                    <RequiredSpan>*</RequiredSpan>
                  </InputTitleContainer>
                  <StyledRadioGroup>
                    <RadioGroup options={genderOptions} />
                  </StyledRadioGroup>
                  {!firstName &&
                    hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
                </InputsContainer>
                <FormInfo>
                  <FormattedMessage {...messages.genderInfo} />
                </FormInfo>
              </FlexContainer>

              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>{intl.formatMessage(messages.size)}</Label>
                    <RequiredSpan>*</RequiredSpan>
                  </InputTitleContainer>
                  <StyledRadioGroup>
                    <RadioGroup options={sizeOptions} />
                  </StyledRadioGroup>
                  {!firstName &&
                    hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
                </InputsContainer>
              </FlexContainer>

              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>{intl.formatMessage(messages.problems)}</Label>
                    <RequiredSpan>*</RequiredSpan>
                  </InputTitleContainer>
                  <StyledRadioGroup>
                    <CheckboxGroup options={problemsOptions} />
                  </StyledRadioGroup>
                  {!firstName &&
                    hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
                </InputsContainer>
              </FlexContainer>

              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>{intl.formatMessage(messages.description)}</Label>
                    <RequiredSpan>*</RequiredSpan>
                  </InputTitleContainer>
                  <TextArea
                    id="issueDescription"
                    value={issueDescription}
                    rows={7}
                  />
                  {!firstName &&
                    hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
                </InputsContainer>
                <FormInfo>
                  <FormattedMessage {...messages.issueInfo} />
                </FormInfo>
              </FlexContainer>

              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>{intl.formatMessage(messages.attachPicture)}</Label>
                    <RequiredSpan>*</RequiredSpan>
                  </InputTitleContainer>
                  <Upload
                    multiple={false}
                    showUploadList={true}
                    supportServerRender={true}
                  >
                    <Button>
                      <Icon type="upload" /> Select File
                    </Button>
                  </Upload>
                  {!firstName &&
                    hasError && <ErrorMsg>{'This field is required'}</ErrorMsg>}
                </InputsContainer>
                <FormInfo>
                  <FormattedMessage {...messages.uploadInfo} />
                </FormInfo>
              </FlexContainer>
              <ButtonWrapper>
                <Button
                  type="primary"
                  // onClick={this.handleSendMessage}
                  // loading={sendMessageLoading}
                >
                  <FormattedMessage {...messages.submit} />
                </Button>
              </ButtonWrapper>
            </DivInfo>
          </ExpandContainter>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('warrantyProgram').toJS()

const WarrantyProgramEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    { ...warrantyProgramActions }
  )
)(WarrantyProgram)

export default WarrantyProgramEnhance
