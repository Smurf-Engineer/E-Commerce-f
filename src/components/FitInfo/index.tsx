/**
 * FitInfo Component - Created by gustavomedina on 08/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import find from 'lodash/find'
import Modal from 'antd/lib/modal'
import Radio from 'antd/lib/radio'
import { Product } from '../../types/common'
import messages from './messages'
import {
  Container,
  Col,
  StyledRow,
  ReverseDiv,
  TitleLabel,
  radioGroupStyle,
  StyledFooterLabel,
  ImageContainer,
  ImageStyle,
  SizingTable
} from './styledComponents'
import * as fitActions from './actions'
import SizingChart from '../SizingChart'
import slimFit from '../../assets/slim_fit.svg'
import standardFit from '../../assets/standard_fit.svg'
import relaxedFit from '../../assets/relaxed_fit.svg'
import { charts } from '../../screens/FitAndSizing/staticData'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const IMAGES = {
  slim: slimFit,
  standard: standardFit,
  relaxed: relaxedFit
}

interface Props {
  history: any
  requestClose: () => void
  setGender: (param: number) => void
  setFitStyle: (param: number) => void
  setFitStyleDescription: (param: string) => void
  setFitStyleImage: (param: string) => void
  setMetric: (param: string) => void
  dispatch: any
  open: boolean
  product: Product
  gender: number
  fitStyle: number
  fitStyleDescription: string
  fitStyleImage: string
  metric: string
  formatMessage: (messageDescriptor: any, values?: {}) => string
}

class FitInfo extends React.Component<Props, {}> {
  onGenderChange = async (e: any) => {
    const { setGender } = this.props
    setGender(e.target.value)
  }

  onFitChange = (e: any) => {
    const {
      product: { fitStyles },
      setFitStyle,
      setFitStyleDescription,
      setFitStyleImage
    } = this.props
    const selectedStyle = find(fitStyles, { id: e.target.value })
    setFitStyle(e.target.value)
    const name = selectedStyle ? selectedStyle.name : ''
    setFitStyleDescription(selectedStyle ? selectedStyle.info : '')
    const image = this.getFitStyleImage(name.toLowerCase())
    setFitStyleImage(image)
  }

  getFitStyleImage = (fitStyle: string) => (fitStyle ? IMAGES[fitStyle] : '')

  onMetricChange = (e: any) => {
    const { setMetric } = this.props
    setMetric(e.target.value)
  }

  gotoGetFittedPage = () => {
    const { history } = this.props
    history.push('/fit-widget')
  }

  render() {
    const {
      open,
      gender,
      metric,
      fitStyle,
      product: { genders, fitStyles },
      fitStyleDescription,
      fitStyleImage,
      setGender,
      setFitStyle,
      setFitStyleDescription,
      setFitStyleImage,
      formatMessage
    } = this.props

    if (genders.length === 1) {
      setGender(genders[0].id)
    }

    if (fitStyles.length === 1) {
      setFitStyle(fitStyles[0].id)
    }

    const selectedStyle = find(fitStyles, { id: fitStyle })
    const fitName = selectedStyle ? selectedStyle.name : ''
    setFitStyleDescription(selectedStyle ? selectedStyle.info : '')
    const image = this.getFitStyleImage(fitName && fitName.toLowerCase())
    setFitStyleImage(image)

    const genderList = genders.map(
      ({ id, name }) =>
        id && (
          <RadioButton key={id} value={id}>
            {name}
          </RadioButton>
        )
    )

    const fitStylesList = fitStyles.map(
      ({ id, name }) =>
        id && (
          <RadioButton key={id} value={id}>
            {name}
          </RadioButton>
        )
    )

    const genderFilter = genders.find(({ id }) => id === gender)
    const genderName = genderFilter && genderFilter.name.toLowerCase()
    const chart = charts.find(({ title }) => title === genderName) || charts[0]

    const sizingTable = (
      <SizingChart units={metric} {...{ chart, formatMessage }} />
    )

    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          maskClosable={true}
          width={'85%'}
          destroyOnClose={true}
          onCancel={this.handleCancel}
        >
          {/* TODO: Uncomment when the widget gets implemented */}
          {/* <StyledLabel>
            <FormattedMessage {...messages.getFittedLabel} />
          </StyledLabel>
          <StyledLoginButton type="danger" onClick={this.gotoGetFittedPage}>
            <FormattedMessage {...messages.getFittedButton} />
          </StyledLoginButton> */}
          <StyledRow>
            <Col span={12}>
              <TitleLabel>
                <FormattedMessage {...messages.sizeChart} />
              </TitleLabel>
              <StyledRow>
                <ReverseDiv>
                  <Col span={13}>
                    <RadioGroup
                      defaultValue={gender}
                      onChange={this.onGenderChange}
                    >
                      {genderList}
                    </RadioGroup>
                  </Col>
                  <Col span={8}>
                    <RadioGroup
                      defaultValue={metric}
                      onChange={this.onMetricChange}
                    >
                      <RadioButton value="in">
                        <FormattedMessage {...messages.inches} />
                      </RadioButton>
                      <RadioButton value="cm">
                        <FormattedMessage {...messages.centimeters} />
                      </RadioButton>
                    </RadioGroup>
                  </Col>
                </ReverseDiv>
              </StyledRow>
              <SizingTable>{sizingTable}</SizingTable>
            </Col>
            <Col span={12}>
              <TitleLabel>
                <FormattedMessage {...messages.fitStyles} />
              </TitleLabel>
              <RadioGroup
                defaultValue={fitStyle}
                style={radioGroupStyle}
                onChange={this.onFitChange}
              >
                {fitStylesList}
              </RadioGroup>
              <ImageContainer>
                <img style={ImageStyle} src={fitStyleImage} />
              </ImageContainer>
              <StyledFooterLabel>{fitStyleDescription}</StyledFooterLabel>
            </Col>
          </StyledRow>
        </Modal>
      </Container>
    )
  }

  handleCancel = () => {
    const { requestClose } = this.props
    requestClose()
  }
}

const mapStateToProps = (state: any) => state.get('fitInfo').toJS()

const FitInfoEnhance = compose(
  connect(
    mapStateToProps,
    { ...fitActions }
  )
)(FitInfo)

export default FitInfoEnhance
