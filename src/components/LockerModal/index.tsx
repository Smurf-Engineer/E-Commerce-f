/**
 * LockerModal Component - Created by david on 10/04/18.
 */
import React from 'react'
import { graphql, compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import omitBy from 'lodash/omitBy'
import moment from 'moment'
import ProductThumbnail from '../../components/ProductThumbnailStore'
import { desginsQuery } from './data'
import {
  QueryProps,
  DesignResultType,
  DesignType,
  SelectedItem
} from '../../types/common'
import { Title, List } from './styledComponents'

interface Data extends QueryProps {
  pagination: DesignResultType
}

interface Props {
  data: Data
  visible: boolean
  selectedItems: SelectedItem
  onSelectItem: (id: number, checked: boolean) => void
  onUnselectItem: (index: number) => void
  onRequestClose: () => void
  onAddItems: (items: DesignType[]) => void
}

export class LockerModal extends React.PureComponent<Props, {}> {
  handleOnItemSelect = (id: number, checked: boolean) => {
    const { onSelectItem } = this.props
    onSelectItem(id, checked)
  }

  handleOnAddItems = () => {
    const {
      onAddItems,
      selectedItems,
      data: { pagination: { designs } }
    } = this.props
    const filteredItems = omitBy(selectedItems, checked => !checked)
    const itemsIndex = Object.keys(filteredItems)
    const items = itemsIndex.map(index => designs[index])
    onAddItems(items)
  }

  render() {
    const {
      visible,
      onRequestClose,
      data: { loading, error, pagination },
      selectedItems
    } = this.props

    if (loading) {
      return <div>Loading...</div>
    }

    if (error) {
      return error
    }

    const list = pagination.designs.map(
      (
        {
          id,
          name,
          image,
          createdAt,
          product: { id: productId, description, type }
        }: DesignType,
        index
      ) => (
        <ProductThumbnail
          key={id}
          checked={selectedItems[index]}
          id={index}
          onSelectItem={this.handleOnItemSelect}
          {...{ name, image, productId, description, type }}
          date={moment(createdAt).format('DD/MM/YYYY')}
        />
      )
    )

    return (
      <Modal
        {...{ visible }}
        closable={false}
        onOk={this.handleOnAddItems}
        onCancel={onRequestClose}
        style={{ top: 20 }}
        maskStyle={{ backgroundColor: 'rgba(241,244,245,0.5)' }}
        destroyOnClose={true}
        okText="ADD"
        cancelText="Cancel"
      >
        <Title>My Locker</Title>
        <List>{list}</List>
      </Modal>
    )
  }
}

const LockerModalDesgins = compose(graphql<Data>(desginsQuery))(LockerModal)

export default LockerModalDesgins
