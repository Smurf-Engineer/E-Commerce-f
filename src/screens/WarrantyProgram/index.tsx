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
import CheckboxGroup from 'antd/lib/checkbox/Group'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import message from 'antd/lib/message'
import Divider from 'antd/lib/divider'
import * as warrantyProgramActions from './actions'
import messages from './messages'
import {
  Container,
  Text,
  SectionContainer,
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
  GenderSizeContainer,
  SizeStyledRadioGroup,
  ButtonWrapper,
  UploadedFile,
  SmallInputsContainer
} from './styledComponents'
import Layout from '../../components/MainLayout'
import DivInfo from '../../components/ProductInfo'
import config from '../../config/index'
import { requestWarrantyMutation } from './data'

const RadioGroup = Radio.Group
const { TextArea } = Input

interface StateProps {
  openForm: boolean
  file: string | null
  fileName: string
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
  loadingSend: boolean
  requestWarranty: any
  resetReducerDataAction: () => void
  inputChangeAction: (id: string, value: string) => void
  setProductIs: (value: string) => void
  setGender: (value: string) => void
  setSize: (value: string) => void
  setProblems: (value: string[]) => void
  setIssueDescription: (value: string) => void
  setLoadingAction: (loading: boolean) => void
  validFormAction: (hasError: boolean) => void
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
    openForm: true,
    file: null,
    fileName: ''
  }

  beforeUpload = (file: any) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({ file, fileName: file.name })
    }

    if (file) {
      reader.readAsDataURL(file)
    }

    return false
  }

  handleToggleRow = () => {
    const { openForm } = this.state
    this.setState({ openForm: !openForm })
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { inputChangeAction } = this.props
    const {
      currentTarget: { id, value }
    } = evt

    inputChangeAction(id, value)
  }

  handleDescriptionChange = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    const { setIssueDescription } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    setIssueDescription(value)
  }

  handleOldProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setProductIs } = this.props
    setProductIs(e.target.value)
  }

  handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setGender } = this.props
    setGender(e.target.value)
  }

  handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setSize } = this.props
    setSize(e.target.value)
  }

  handleProblemsChange = (checkedValues: Array<CheckboxValueType>) => {
    const { setProblems } = this.props
    setProblems(checkedValues as string[])
  }

  validateEmail = (email: string) => {
    const emailPattern = /[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    return emailPattern.test(email)
  }

  handleSendData = async () => {
    const {
      setLoadingAction,
      firstName,
      lastName,
      email,
      orderNumber,
      productsAffected,
      issueDescription,
      validFormAction,
      gender,
      size,
      problems,
      productIs,
      requestWarranty,
      resetReducerDataAction
    } = this.props
    const { file } = this.state
    let fileResponse = ''

    validFormAction(false)

    if (
      !firstName ||
      !lastName ||
      !email ||
      !this.validateEmail(email) ||
      !orderNumber ||
      !productsAffected ||
      !issueDescription ||
      !gender ||
      !size ||
      !problems.length ||
      !productIs
    ) {
      validFormAction(true)
      return
    }

    setLoadingAction(true)
    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file as any)
        const user = JSON.parse(localStorage.getItem('user') || '')

        const uploadResp = await fetch(
          `${config.graphqlUriBase}uploadWarrantyImage`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${user.token}`
            },
            body: formData
          }
        )
        const bannerResp = await uploadResp.json()

        fileResponse = bannerResp.image
      }

      const warrantyObject = {
        firstName,
        lastName,
        email,
        orderNumber,
        productsAffected,
        issueDescription,
        validFormAction,
        gender,
        size,
        problems,
        productIs,
        image: fileResponse
      }

      const {
        data: { warrantyProgramRequest }
      } = await requestWarranty({
        variables: { warrantyObject }
      })

      message.success(warrantyProgramRequest.message)

      resetReducerDataAction()
      this.setState({ file: null, fileName: '' })
      this.handleToggleRow()

      setLoadingAction(false)
    } catch (error) {
      message.error('Something wrong happened. Please try again!')
      setLoadingAction(false)
    }
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
      gender,
      size,
      problems,
      productIs,
      hasError,
      loadingSend
    } = this.props
    const { fileName } = this.state
    const { openForm } = this.state
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <SectionContainer>
            <Text>
              <FormattedMessage {...messages.title} />
            </Text>
            <SectionText
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(messages.titleText)
              }}
            />
          </SectionContainer>
          <Divider />
          <SectionContainer>
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
          </SectionContainer>
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
                  <SmallInputsContainer>
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
                        <ErrorMsg>
                          <FormattedMessage {...messages.required} />
                        </ErrorMsg>
                      )}
                  </SmallInputsContainer>
                  <SmallInputsContainer>
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
                        <ErrorMsg>
                          <FormattedMessage {...messages.required} />
                        </ErrorMsg>
                      )}
                  </SmallInputsContainer>
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
                  {(!email || !this.validateEmail(email)) &&
                    hasError && (
                      <ErrorMsg>
                        <FormattedMessage {...messages.required} />
                      </ErrorMsg>
                    )}
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
                  {!productsAffected &&
                    hasError && (
                      <ErrorMsg>
                        <FormattedMessage {...messages.required} />
                      </ErrorMsg>
                    )}
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
                    <RadioGroup
                      options={oldOptions}
                      onChange={this.handleOldProductChange}
                      value={productIs}
                    />
                  </StyledRadioGroup>
                  {!productIs &&
                    hasError && (
                      <ErrorMsg>
                        <FormattedMessage {...messages.required} />
                      </ErrorMsg>
                    )}
                </InputsContainer>
              </FlexContainer>

              <FlexContainer>
                <GenderSizeContainer>
                  <InputsContainer>
                    <InputTitleContainer>
                      <Label>{intl.formatMessage(messages.gender)}</Label>
                      <RequiredSpan>*</RequiredSpan>
                    </InputTitleContainer>
                    <StyledRadioGroup>
                      <RadioGroup
                        options={genderOptions}
                        onChange={this.handleGenderChange}
                        value={gender}
                      />
                    </StyledRadioGroup>
                    {!gender &&
                      hasError && (
                        <ErrorMsg>
                          <FormattedMessage {...messages.required} />
                        </ErrorMsg>
                      )}
                  </InputsContainer>
                  <InputsContainer>
                    <InputTitleContainer>
                      <Label>{intl.formatMessage(messages.size)}</Label>
                      <RequiredSpan>*</RequiredSpan>
                    </InputTitleContainer>
                    <SizeStyledRadioGroup>
                      <RadioGroup
                        options={sizeOptions}
                        onChange={this.handleSizeChange}
                        value={size}
                      />
                    </SizeStyledRadioGroup>
                    {!size &&
                      hasError && (
                        <ErrorMsg>
                          <FormattedMessage {...messages.required} />
                        </ErrorMsg>
                      )}
                  </InputsContainer>
                </GenderSizeContainer>
                <FormInfo>
                  <FormattedMessage {...messages.genderInfo} />
                </FormInfo>
              </FlexContainer>

              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>{intl.formatMessage(messages.problems)}</Label>
                    <RequiredSpan>*</RequiredSpan>
                  </InputTitleContainer>
                  <StyledRadioGroup>
                    <CheckboxGroup
                      options={problemsOptions}
                      onChange={this.handleProblemsChange}
                    />
                  </StyledRadioGroup>
                  {!problems.length &&
                    hasError && (
                      <ErrorMsg>
                        <FormattedMessage {...messages.required} />
                      </ErrorMsg>
                    )}
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
                    onChange={this.handleDescriptionChange}
                  />
                  {!issueDescription &&
                    hasError && (
                      <ErrorMsg>
                        <FormattedMessage {...messages.required} />
                      </ErrorMsg>
                    )}
                </InputsContainer>
                <FormInfo>
                  <FormattedMessage {...messages.issueInfo} />
                </FormInfo>
              </FlexContainer>

              <FlexContainer>
                <InputsContainer>
                  <InputTitleContainer>
                    <Label>{intl.formatMessage(messages.attachPicture)}</Label>
                  </InputTitleContainer>
                  <Upload
                    beforeUpload={this.beforeUpload}
                    multiple={false}
                    showUploadList={true}
                    supportServerRender={true}
                  >
                    <Button>
                      <Icon type="upload" />
                      {intl.formatMessage(messages.selectFile)}
                    </Button>
                  </Upload>

                  {fileName !== '' && (
                    <UploadedFile>
                      <Icon type="paper-clip" /> {fileName}
                    </UploadedFile>
                  )}
                </InputsContainer>
                <FormInfo>
                  <FormattedMessage {...messages.uploadInfo} />
                </FormInfo>
              </FlexContainer>
              <ButtonWrapper>
                <Button
                  type="primary"
                  onClick={this.handleSendData}
                  loading={loadingSend}
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
  requestWarrantyMutation,
  connect(
    mapStateToProps,
    { ...warrantyProgramActions }
  )
)(WarrantyProgram)

export default WarrantyProgramEnhance
