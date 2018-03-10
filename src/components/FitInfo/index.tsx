/**
 * FitInfo Component - Created by gustavomedina on 08/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import keys from 'lodash/keys'
import forEach from 'lodash/forEach'
import Modal from 'antd/lib/modal'
import Col from 'antd/lib/col'
import Radio from 'antd/lib/radio'
import Table from 'antd/lib/table'
import QuickViewSlider from '../QuickViewSlider'
import { categoriesQuery } from './data'
import {
  ImageType,
  QueryProps,
  Filter,
  Product,
  BodyChartItem
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
  ImageContainer
} from './styledComponents'
import closeIcon from '../../assets/cancel-button.svg'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface Data extends QueryProps {
  genders: Filter[]
  fitStyles: Filter[]
  product: Product[]
  bodyChart: BodyChartItem[]
}

interface Props {
  open: boolean
  data: Data
  productId: number
}

export class FitInfo extends React.Component<Props, {}> {
  render() {
    const { open, data } = this.props
    const { genders, fitStyles, product, bodyChart } = data

    let chartcolumns: any = [] as any
    let chartData: any = [] as any

    if (!data.loading && !data.error) {
      chartcolumns = Object.keys(bodyChart[0]).map((key, index) => {
        return {
          title: key,
          dataIndex: key
        }
      })

      for (const cosa of bodyChart) {
        console.log('------------cosa-----------')
        console.log(cosa)
      }

      console.log('------------chartcolumns-----------')
      console.log(chartcolumns)

      chartData = bodyChart.map((key: any, index) => {
        const keyss = keys(key)
        const object: any = {}
        forEach(keyss, value => {
          object[value] = key[value]
          object.index = index
        })
        return object
      })

      console.log('------------chartData-----------')
      console.log(chartData)
    }

    const columns = [
      {
        title: 'Size',
        dataIndex: 'name',
        render: (text: String) => <a href="#">{text}</a>
      },
      {
        title: 'Waist',
        dataIndex: 'age'
      },
      {
        title: 'Chest',
        dataIndex: 'address'
      },
      {
        title: 'Inseam',
        dataIndex: 'inseam'
      }
    ]
    const datas = [
      {
        key: '1',
        name: '2XS',
        age: '20-20',
        address: '20-20',
        inseam: '20-20'
      },
      {
        key: '2',
        name: 'XS',
        age: '20-20',
        address: '20-20',
        inseam: '20-20'
      },
      {
        key: '3',
        name: 'S',
        age: '20-20',
        address: '20-20',
        inseam: '20-20'
      },
      {
        key: '4',
        name: 'M',
        age: '20-20',
        address: '20-20',
        inseam: '20-20'
      },
      {
        key: '5',
        name: 'L',
        age: '20-20',
        address: '20-20',
        inseam: '20-20'
      },
      {
        key: '6',
        name: 'XL',
        age: '20-20',
        address: '20-20',
        inseam: '20-20'
      },
      {
        key: '7',
        name: '2XL',
        age: '20-20',
        address: '20-20',
        inseam: '20-20'
      }
    ]

    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          maskClosable={true}
          width={'60%'}
          destroyOnClose={true}
        >
          <CloseIcon src={closeIcon} />
          <StyledLabel>
            Don’t want to look at charts? We’ll get you the right sizing.
          </StyledLabel>
          <StyledLoginButton type="danger">GET FITTED</StyledLoginButton>
          <StyledRow>
            <Col span={12}>
              <TitleLabel>SIZING CHART</TitleLabel>
              <StyledRow>
                <Col span={14}>
                  <RadioGroup defaultValue="a">
                    <RadioButton value="a">Men</RadioButton>
                    <RadioButton value="b">Women</RadioButton>
                    <RadioButton value="c">Youth</RadioButton>
                  </RadioGroup>
                </Col>
                <Col span={6}>
                  <RadioGroup defaultValue="a">
                    <RadioButton value="a">IN</RadioButton>
                    <RadioButton value="b">CM</RadioButton>
                  </RadioGroup>
                </Col>
              </StyledRow>
              <Table
                columns={chartcolumns}
                dataSource={chartData}
                style={tableStyle}
                pagination={false}
              />
            </Col>
            <Col span={12}>
              <TitleLabel>FIT STYLES</TitleLabel>
              <RadioGroup defaultValue="a" style={radioGroupStyle}>
                <RadioButton value="a">Slim</RadioButton>
                <RadioButton value="b">Standard</RadioButton>
                <RadioButton value="c">Relaxed</RadioButton>
                <RadioButton value="d">Oversized</RadioButton>
              </RadioGroup>
              <ImageContainer />
              <StyledFooterLabel>
                Standard Fit style provides regular fitting, by balancing
                aerodynamic performance with comfort functionality.
              </StyledFooterLabel>
            </Col>
          </StyledRow>
        </Modal>
      </Container>
    )
  }
}

type OwnProps = {
  productId?: number
}

// const FitInfoEnhance = compose(graphql<Data>(categoriesQuery))(FitInfo)

const FitInfoEnhance = compose(
  graphql<Data>(categoriesQuery, {
    options: ({ productId }: OwnProps) => ({
      fetchPolicy: 'network-only',
      variables: { id: productId }
    })
  })
)(FitInfo)

export default FitInfoEnhance
