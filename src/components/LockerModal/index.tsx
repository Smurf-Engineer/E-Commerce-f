/**
 * LockerModal Component - Created by david on 10/04/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import { desginsQuery } from './data'
import { QueryProps } from '../../types/common'
import { Title, List } from './styledComponents'

interface Data extends QueryProps {}

interface Props {
  data: Data
  visible: boolean
  onRequestClose: () => void
}

export class LockerModal extends React.PureComponent<Props, {}> {
  render() {
    const { visible, onRequestClose } = this.props

    console.log('---------------------------')
    console.log(this.props)
    console.log('---------------------------')

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

const LockerModalDesgins = compose(graphql<Data>(desginsQuery))(LockerModal)

export default LockerModalDesgins
