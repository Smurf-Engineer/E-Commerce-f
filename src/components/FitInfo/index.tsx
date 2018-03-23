/**
 * FitInfo Component - Created by gustavomedina on 08/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import find from 'lodash/find'
import Modal from 'antd/lib/modal'
import Col from 'antd/lib/col'
import Radio from 'antd/lib/radio'
import FitInfoTable from '../FitInfoTable'
import { ReducersObject } from '../../store/rootReducer'
import { categoriesQuery } from './data'
import { QueryProps, Product } from '../../types/common'
import messages from './messages'
import {
  Container,
  StyledRow,
  StyledLoginButton,
  StyledLabel,
  TitleLabel,
  radioGroupStyle,
  StyledFooterLabel,
  ImageContainer,
  ImageStyle
} from './styledComponents'
import * as fitActions from './actions'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface Data extends QueryProps {
  product: Product
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
    const { setGender } = this.props
    setGender(e.target.value)
  }

  onFitChange = (e: any) => {
    const {
      data: { product },
      setFitStyle,
      setFitStyleDescription,
      setFitStyleImage
    } = this.props
    const selectedStyle = find(product.fitStyles, { id: e.target.value })
    setFitStyle(e.target.value)
    setFitStyleDescription(selectedStyle ? selectedStyle.info : '')
    setFitStyleImage(selectedStyle ? selectedStyle.image : '')
  }

  onMetricChange = (e: any) => {
    const { setMetric } = this.props
    setMetric(e.target.value)
  }

  gotoGetFittedPage = () => {
    const { history } = this.props
    history.push('/get-fitted')
  }

  render() {
    const {
      open,
      data,
      gender,
      metric,
      fitStyleDescription,
      fitStyleImage
    } = this.props
    const { product } = data

    let genderList
    let fitStylesList
    let sizingTable

    if (!data.loading && !data.error) {
      genderList = product.genders.map(
        ({ id, name }, index) =>
          id ? (
            <RadioButton key={id} value={id}>
              {name}
            </RadioButton>
          ) : (
            undefined
          )
      )

      fitStylesList = product.fitStyles.map(
        (fit, index) =>
          fit.id ? (
            <RadioButton key={fit.id} value={fit.id}>
              {fit.name}
            </RadioButton>
          ) : (
            undefined
          )
      )

      sizingTable = product ? (
        <FitInfoTable
          bodyChartId={product.bodyChartId}
          metric={metric}
          genderId={gender}
        />
      ) : (
        <div> No data. </div>
      )
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
          <StyledLoginButton type="danger" onClick={this.gotoGetFittedPage}>
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
              {sizingTable}
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

  handleCancel = () => {
    const { requestClose } = this.props
    requestClose()
  }
}

type OwnProps = {
  productId?: number
}

const mapStateToProps = ({ fitInfo }: ReducersObject) => fitInfo.toJS()

const FitInfoEnhance = compose(
  connect(mapStateToProps, { ...fitActions }),
  graphql<Data>(categoriesQuery, {
    options: (ownprops: OwnProps) => {
      const { productId } = ownprops
      return {
        fetchPolicy: 'always',
        variables: { id: productId || 0 }
      }
    }
  })
)(FitInfo)

export default FitInfoEnhance
