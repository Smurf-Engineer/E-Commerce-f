/**
 * DropPricingModal Component - Created by eduardoquintero on 10/03/20.
 */
import * as React from 'react'
import messages from './messages'
import { Container, Title, ModalTitle, ModalMessage } from './styledComponents'
import { Modal, Table } from 'antd'
import { Message } from '../../types/common'

interface Props {
  pricingModalOpen: boolean
  toggleModal: () => void
  formatMessage: (messageDescriptor: Message) => string
}

const columns = [
  {
    dataIndex: 'pieces'
  },
  {
    dataIndex: 'discount'
  }
]
const data = [
  {
    key: '1',
    pieces: '2-5pc',
    discount: '20% Off'
  },
  {
    key: '2',
    pieces: '6-24pc',
    discount: '35% Off'
  },
  {
    key: '3',
    pieces: '25-49pc',
    discount: '40% Off'
  },
  {
    key: '4',
    pieces: '50-99pc',
    discount: '50% Off'
  },
  {
    key: '5',
    pieces: '100-249pc',
    discount: '55% Off'
  }
]

export class DropPricingModal extends React.Component<Props, {}> {
  render() {
    const { formatMessage, toggleModal, pricingModalOpen } = this.props
    return (
      <Modal
        visible={pricingModalOpen}
        footer={null}
        closable={false}
        maskClosable={true}
        destroyOnClose={true}
        onCancel={toggleModal}
      >
        <Container>
          <ModalTitle>{formatMessage(messages.aboutTeamPricing)}</ModalTitle>
          <ModalMessage>{formatMessage(messages.teamPricing)}</ModalMessage>
          <Title>{formatMessage(messages.title)}</Title>
          <Table
            pagination={{ hideOnSinglePage: true }}
            columns={columns}
            dataSource={data}
            showHeader={false}
            bordered={true}
          />
        </Container>
      </Modal>
    )
  }
}

export default DropPricingModal
