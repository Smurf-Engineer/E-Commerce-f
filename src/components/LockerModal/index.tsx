/**
 * LockerModal Component - Created by david on 10/04/18.
 */
import React from 'react'
import { graphql, compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import omitBy from 'lodash/omitBy'

import ProductThumbnail from '../../components/ProductThumbnailStore'
import { desginsQuery } from './data'
import {
  QueryProps,
  DesignResultType,
  DesignType,
  SelectedItem
} from '../../types/common'
import { Title, List, modalStyle } from './styledComponents'

interface Data extends QueryProps {
  pagination: DesignResultType
}

interface Props {
  data: Data
  visible: boolean
  selectedItems: SelectedItem
  tableItems: SelectedItem
  onSelectItem: (id: number, checked: boolean) => void
  onUnselectItem: (index: number) => void
  onRequestClose: () => void
  onAddItems: (items: any) => void
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
      data: {
        pagination: { designs }
      }
    } = this.props
    const filteredItems = omitBy(selectedItems, checked => !checked)
    const itemsIndex = Object.keys(filteredItems)
    const items = itemsIndex.map(index => {
      const item = designs[index]
      const returnItem = Object.assign({}, { visible: true }, { design: item })

      console.log('add item ', returnItem)
      return returnItem
    })
    onAddItems(items)
  }

  render() {
    const {
      visible,
      onRequestClose,
      data: { loading, error, pagination },
      selectedItems,
      tableItems
    } = this.props

    const designs = loading || error ? [] : pagination.designs

    const list = designs.map(
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
          checked={selectedItems[index] || tableItems[id]}
          disabled={tableItems[id]}
          id={index}
          onSelectItem={this.handleOnItemSelect}
          {...{ name, image, productId, description, type }}
          date={createdAt}
        />
      )
    )

    return (
      <Modal
        {...{ visible }}
        closable={false}
        onOk={this.handleOnAddItems}
        onCancel={onRequestClose}
        style={modalStyle}
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
