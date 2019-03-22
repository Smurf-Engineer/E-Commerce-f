/**
 * ColorChart Component - Created by eduardoquintero on 19/03/18.
 */
import * as React from 'react'

import messages from './messages'
import {
  Container,
  CloseIcon,
  ModalContainer,
  Title,
  Button,
  ButtonsContainer,
  ColorsImage,
  TopText,
  BottomText,
  Info,
  LastButtonContainer
} from './styledComponents'
import Modal from 'antd/lib/modal'

import closeIcon from '../../assets/cancel-button.svg'
import ColorChartImg from '../../assets/color-chart.png'
import { FormattedMessage } from 'react-intl'

interface Props {
  open: boolean
  handleClose: () => void
  formatMessage: (messageDescriptor: any) => string
  handleOpenForm: () => void
}

export class ColorChart extends React.Component<Props> {
  render() {
    const { open, handleClose, handleOpenForm } = this.props

    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          width={'auto'}
          destroyOnClose={true}
          style={{ maxWidth: 800 }}
        >
          <ModalContainer>
            <CloseIcon src={closeIcon} onClick={handleClose} />
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
            <TopText>
              <FormattedMessage {...messages.digitalCalibration} />
              <FormattedMessage {...messages.curatedColors} />
              <FormattedMessage {...messages.monitorBrightness} />
            </TopText>
            <ColorsImage src={ColorChartImg} />
            <ButtonsContainer>
              <Button onClick={this.handleDownloadLibrary}>
                <FormattedMessage {...messages.downloadLibrary} />
              </Button>
              <LastButtonContainer>
                <Button onClick={handleOpenForm}>
                  <FormattedMessage {...messages.requestChart} />
                </Button>
                <Info>
                  <FormattedMessage {...messages.swatchesShip} />
                </Info>
              </LastButtonContainer>
            </ButtonsContainer>
            <BottomText>
              <FormattedMessage {...messages.readme} />
            </BottomText>
          </ModalContainer>
        </Modal>
      </Container>
    )
  }
  handleDownloadLibrary = () => {
    const { handleClose } = this.props
    window.open(
      'https://jakroo.storage.googleapis.com/screens/JAKROO%20COLOR%20SWATCH%20LIBRARY.zip'
    )
    handleClose()
  }
}

export default ColorChart
