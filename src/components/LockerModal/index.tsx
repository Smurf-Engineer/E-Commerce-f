/**
 * LockerModal Component - Created by david on 10/04/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import { Title, List } from './styledComponents'

interface Props {
  visible: boolean
  onRequestClose: () => void
}

class LockerModal extends React.PureComponent<Props, {}> {
  render() {
    const { visible, onRequestClose } = this.props
    return (
      <Modal
        {...{ visible }}
        onOk={() => {}}
        closable={false}
        onCancel={onRequestClose}
        maskStyle={{ backgroundColor: 'rgba(241,244,245,0.5)' }}
        destroyOnClose={true}
        okText="ADD"
        cancelText="Cancel"
      >
        <Title>My Locker</Title>
        <List>LIST</List>
      </Modal>
    )
  }
}

export default LockerModal
