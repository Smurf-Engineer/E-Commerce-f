/**
 * DesignCenterStyle Component - Created by david on 12/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import reverse from 'lodash/reverse'
import withLoading from '../WithLoadingData'
import withError from '../WithError'
import { QueryProps, StyleModalType, Style } from '../../types/common'
import { stylesQuery } from './data'
import messages from './messages'
import StyleItem from '../Theme'
import { DesignStyle } from '../../types/common'
import {
  Container,
  Row,
  List,
  ModalMessage,
  Empty,
  EmptyTitle,
  EmptyMessage
} from './styledComponents'
import ModalTitle from '../ModalTitle'
import ModalFooter from '../ModalFooter'

interface Data extends QueryProps {
  styles: Style[]
}

interface Props {
  data: Data
  styleModalData: StyleModalType
  styleIndex: number
  designHasChanges: boolean
  productId: number
  themeId: number
  complexity: number
  onSelectStyle: (style: DesignStyle, index: number, colors: string[]) => void
  onSelectStyleComplexity: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
  openNewStyleModalAction: (
    open: boolean,
    indexStyle?: any,
    idStyle?: number
  ) => void
}

export class DesignCenterStyle extends React.PureComponent<Props, {}> {
  handleOnSelectStyle = (id: number, index: any) => {
    const { styleIndex, openNewStyleModalAction, designHasChanges } = this.props
    if (styleIndex !== -1 && designHasChanges) {
      openNewStyleModalAction(true, index, id)
      return
    }
    this.selectStyle(id, index)
  }

  selectStyle = (id: number, index: any) => {
    const {
      onSelectStyle,
      data: { styles }
    } = this.props
    const style = styles[index] || {}
    const styleAreas = style.colors || []
    const colors = styleAreas.map(({ color }: any) => color)
    onSelectStyle(style, index, reverse(colors))
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

  render() {
    const {
      data: { styles = [] },
      formatMessage,
      styleModalData: { openNewStyleModal }
    } = this.props

    if (!styles.length) {
      return (
        <Container>
          <Empty>
            <EmptyTitle>
              <FormattedMessage {...messages.emptyTitle} />
            </EmptyTitle>
            <EmptyMessage>
              <FormattedMessage {...messages.emptyMessage} />
            </EmptyMessage>
          </Empty>
        </Container>
      )
    }

    const list = styles.map(({ id, image, name }, index) => (
      <StyleItem
        key={index}
        {...{ index, id, name, image }}
        onClick={this.handleOnSelectStyle}
      />
    ))

    return (
      <Container>
        <List>
          <Row>{list}</Row>
        </List>
        <Modal
          visible={openNewStyleModal}
          title={
            <ModalTitle title={formatMessage(messages.modalNewStyleTitle)} />
          }
          footer={
            <ModalFooter
              onOk={this.reselectStyle}
              onCancel={this.cancelReselectStyle}
              {...{ formatMessage }}
            />
          }
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
  graphql<Data, Props>(stylesQuery, {
    options: ({ productId, themeId, complexity }) => ({
      variables: { productId, themeId, complexity }
    })
  }),
  withError,
  withLoading
)(DesignCenterStyle)

export default DesignCenterStyleWithData
