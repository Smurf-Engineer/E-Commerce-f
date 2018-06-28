/**
 * DesignCenterStyle Component - Created by david on 12/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import withLoading from '../WithLoadingData'
import { QueryProps, StyleModalTypes } from '../../types/common'
import { stylesQuery } from './data'
import messages from './messages'
import StyleItem from '../Theme'
import { StyleResult } from '../../types/common'
import {
  Container,
  Title,
  Slider,
  Row,
  List,
  ModalMessage
} from './styledComponents'
// TODO: TEST DATA
import dummieData from '../../components/DesignCenterCustomize/Render3D/dummieData'

interface Data extends QueryProps {
  styles?: StyleResult
}

interface Props {
  data: Data
  styleModalData: StyleModalTypes
  currentStyle: number
  onSelectStyle: (style: any, id: number, index: any) => void
  onSelectStyleComplexity: (index: number, colors: string[]) => void
  formatMessage: (messageDescriptor: any) => string
  openNewStyleModalAction: (
    open: boolean,
    indexStyle?: any,
    idStyle?: number
  ) => void
}

const marks = {
  1: 'Classic',
  2: 'Edgy',
  3: 'Extreme'
}

export class DesignCenterStyle extends React.PureComponent<Props, {}> {
  handleOnSelectStyle = (id: number, index: any) => {
    const { currentStyle, openNewStyleModalAction } = this.props
    if (currentStyle !== -1 && currentStyle !== index) {
      openNewStyleModalAction(true, index, id)
      return
    }
    this.selectStyle(id, index)
  }

  selectStyle = (id: number, index: any) => {
    // TODO: see what to do with this commented code
    const {
      onSelectStyle
      // data: { styles }
    } = this.props
    // const allStyles = styles ? styles.styles || [] : []
    // const colors = allStyles ? allStyles[index].colors : {}
    onSelectStyle(index, id, index)
  }

  reselectStyle = () => {
    const {
      styleModalData: { indexStyle, idStyle }
    } = this.props
    this.selectStyle(idStyle, indexStyle)
  }

  cancelReselectStyle = () => {
    const { openNewStyleModalAction } = this.props
    openNewStyleModalAction(false)
  }

  handleOnSelectComplexity = (value: any) => {
    const { onSelectStyleComplexity } = this.props
    const currentStyle = value - 1
    onSelectStyleComplexity(currentStyle, dummieData[currentStyle].colors)
  }

  render() {
    const {
      data: { styles, error },
      formatMessage,
      styleModalData: { openNewStyleModal }
    } = this.props
    if (error) {
      return <div>Error</div>
    }
    const stylesItems = styles ? styles.styles || [] : []
    const list = stylesItems.map(({ id, image, name }, index) => (
      <StyleItem
        key={index}
        {...{ index, id, name, image }}
        onClick={this.handleOnSelectStyle}
      />
    ))

    return (
      <Container>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <Slider
          onChange={this.handleOnSelectComplexity}
          marks={marks}
          defaultValue={1}
          min={1}
          max={3}
        />
        <List>
          <Row>{list}</Row>
        </List>
        <Modal
          visible={openNewStyleModal}
          title={formatMessage(messages.modalNewStyleTitle)}
          okText={formatMessage(messages.modalNewStyleConfirm)}
          onOk={this.reselectStyle}
          cancelText={formatMessage(messages.modalNewStyleCancel)}
          onCancel={this.cancelReselectStyle}
          closable={false}
          maskClosable={false}
          destroyOnClose={true}
        >
          <ModalMessage>
            {formatMessage(messages.modalNewStyleMessage)}
          </ModalMessage>
        </Modal>
      </Container>
    )
  }
}

const DesignCenterStyleWithData = compose(
  graphql<Data>(stylesQuery),
  withLoading
)(DesignCenterStyle)

export default DesignCenterStyleWithData
