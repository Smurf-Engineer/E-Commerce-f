/**
 * FitInfo Component - Created by gustavomedina on 08/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Modal from 'antd/lib/modal'
import Col from 'antd/lib/col'
import Radio from 'antd/lib/radio'
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
  radioGroupStyle
} from './styledComponents'
import closeIcon from '../../assets/cancel-button.svg'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface Props {
  open: boolean
}

class FitInfo extends React.Component<Props, {}> {
  render() {
    const { open } = this.props

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
              <RadioGroup defaultValue="a" size="large" style={radioGroupStyle}>
                <RadioButton value="a">Men</RadioButton>
                <RadioButton value="b">Women</RadioButton>
              </RadioGroup>
            </Col>
            <Col span={12}>
              <TitleLabel>FIT STYLES</TitleLabel>
              <RadioGroup defaultValue="a" size="large" style={radioGroupStyle}>
                <RadioButton value="a">Slim</RadioButton>
                <RadioButton value="b">Standard</RadioButton>
                <RadioButton value="c">Relaxed</RadioButton>
              </RadioGroup>
            </Col>
          </StyledRow>
        </Modal>
      </Container>
    )
  }
}

export default FitInfo
