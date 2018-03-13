/**
 * FitInfo Component - Created by gustavomedina on 08/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import keys from 'lodash/keys'
import forEach from 'lodash/forEach'
import compact from 'lodash/compact'
import get from 'lodash/get'
import find from 'lodash/find'
import Modal from 'antd/lib/modal'
import Col from 'antd/lib/col'
import Radio from 'antd/lib/radio'
import Table from 'antd/lib/table'
import FitInfoTable from '../FitInfoTable'
import { ReducersObject } from '../../store/rootReducer'
import { categoriesQuery } from './data'
import {
  ImageType,
  QueryProps,
  Filter,
  Product,
  BodyChartItem,
  FitStyle
} from '../../types/common'
import messages from './messages'
import {
  Container,
  Text,
  CloseIcon,
  StyledRow,
  StyledLoginButton,
  StyledLabel,
  TitleLabel,
  CenterDiv,
  radioGroupStyle,
  tableStyle,
  ImageDiv,
  StyledFooterLabel,
  ImageContainer,
  ImageStyle
} from './styledComponents'
import closeIcon from '../../assets/cancel-button.svg'
import {
  setGender,
  setFitStyle,
  setMetric,
  setFitStyleDescription,
  setFitStyleImage
} from './actions'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface Data extends QueryProps {
  product: Product
}

interface Props {
  requestClose: () => void
  dispatch: any
  open: boolean
  data: Data
  productId: number
  gender: number
  fitStyle: number
  fitStyleDescription: string
  fitStyleImage: string
  metric: string
}

class FitInfo extends React.Component<Props, {}> {
  onGenderChange = async (e: any) => {
    const { dispatch } = this.props
    dispatch(setGender(e.target.value))
  }

  onFitChange = (e: any) => {
    const { data: { product }, dispatch } = this.props
    const selectedStyle = find(product.fitStyles, { id: e.target.value })
    dispatch(setFitStyle(e.target.value))
    dispatch(setFitStyleDescription(selectedStyle ? selectedStyle.info : ''))
    dispatch(setFitStyleImage(selectedStyle ? selectedStyle.image : ''))
  }

  onMetricChange = (e: any) => {
    const { dispatch } = this.props
    dispatch(setMetric(e.target.value))
  }

  render() {
    const {
      open,
      data,
      gender,
      metric,
      fitStyle,
      fitStyleDescription,
      fitStyleImage,
      dispatch,
      productId
    } = this.props
    const { product } = data

    let genderList
    let fitStylesList

    if (!data.loading && !data.error) {
      genderList = product.genders.map((genderObject, index) => (
        <RadioButton key={genderObject.id} value={genderObject.id}>
          {genderObject.name}
        </RadioButton>
      ))

      fitStylesList = product.fitStyles.map((fit, index) => (
        <RadioButton key={fit.id} value={fit.id}>
          {fit.name}
        </RadioButton>
      ))
    }

    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          maskClosable={true}
          width={'60%'}
          destroyOnClose={true}
          onCancel={this.handleCancel}
        >
          <StyledLabel>
            <FormattedMessage {...messages.getFittedLabel} />
          </StyledLabel>
          <StyledLoginButton type="danger">
            <FormattedMessage {...messages.getFittedButton} />
          </StyledLoginButton>
          <StyledRow>
            <Col span={12}>
              <TitleLabel>
                <FormattedMessage {...messages.sizeChart} />
              </TitleLabel>
              <StyledRow>
                <Col span={14}>
                  <RadioGroup defaultValue="1" onChange={this.onGenderChange}>
                    {genderList}
                  </RadioGroup>
                </Col>
                <Col span={6}>
                  <RadioGroup defaultValue="1" onChange={this.onMetricChange}>
                    <RadioButton value="IN">
                      <FormattedMessage {...messages.inches} />
                    </RadioButton>
                    <RadioButton value="CM">
                      <FormattedMessage {...messages.centimeters} />
                    </RadioButton>
                  </RadioGroup>
                </Col>
              </StyledRow>
              <FitInfoTable bodyChartId={1} metric={metric} genderId={gender} />
            </Col>
            <Col span={12}>
              <TitleLabel>
                <FormattedMessage {...messages.fitStyles} />
              </TitleLabel>
              <RadioGroup
                defaultValue="1"
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

  handleCancel = (e: any) => {
    const { requestClose } = this.props
    requestClose()
  }
}

type OwnProps = {
  productId?: number
}

const mapStateToProps = ({ fitInfo }: ReducersObject) => fitInfo.toJS()

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const FitInfoEnhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql<Data>(categoriesQuery, {
    options: ({ productId }: OwnProps) => ({
      fetchPolicy: 'network-only',
      variables: { id: productId }
    })
  })
)(FitInfo)

export default FitInfoEnhance
