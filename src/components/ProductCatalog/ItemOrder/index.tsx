/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { Container, Cell, ImageCell } from './styledComponents'
import Switch from 'antd/lib/switch'
import message from 'antd/lib/message'
import { Product } from '../../../types/common'
interface Props {
  image: string
  id: number
  name: string
  mpn?: string
  code: string
  productType?: string
  active: boolean
  disabled: boolean
  hasPredyed: boolean
  onlyProDesign?: boolean
  togglePredyed: (variables: {}) => Promise<Product>
  updateOnlyPro: (variables: {}) => Promise<Product>
  onCheck: (variables: {}) => Promise<Product>
  onProductClick: (id: number) => void
}

interface State {
  loading: boolean
}
class ItemOrder extends React.PureComponent<Props, State> {
  state = {
    loading: false
  }
  handleOnClick = () => {
    const { onProductClick, id } = this.props
    onProductClick(id)
  }
  stopPropagation = (event: any) => {
    if (event) {
      event.stopPropagation()
    }
  }
  onChangeActive = async () => {
    const { onCheck, id } = this.props
    try {
      this.setState({ loading: true })
      await onCheck({
        variables: { id }
      })
    } catch (e) {
      message.error(e.graphQLErrors.map((x: Error) => x.message).join(', '))
    } finally {
      this.setState({ loading: false })
    }
  }
  onChangePro = async () => {
    const { updateOnlyPro, id } = this.props
    try {
      this.setState({ loading: true })
      await updateOnlyPro({
        variables: { id }
      })
    } catch (e) {
      message.error(e.graphQLErrors.map((x: Error) => x.message).join(', '))
    } finally {
      this.setState({ loading: false })
    }
  }
  enablePredyed = async () => {
    const { togglePredyed, id } = this.props
    try {
      this.setState({ loading: true })
      await togglePredyed({
        variables: { id }
      })
    } catch (e) {
      message.error(e.graphQLErrors.map((x: Error) => x.message).join(', '))
    } finally {
      this.setState({ loading: false })
    }
  }
  render() {
    const { loading } = this.state
    const {
      image,
      name,
      mpn,
      hasPredyed,
      code,
      productType,
      active: checked,
      onlyProDesign,
      disabled
    } = this.props
    return (
      <Container onClick={this.handleOnClick}>
        <Cell>
          <ImageCell src={image} />
        </Cell>
        <Cell>
          <b>{name}</b>
        </Cell>
        <Cell>{mpn}</Cell>
        <Cell>{code}</Cell>
        <Cell>{productType}</Cell>
        <Cell onClick={this.stopPropagation} textAlign="center">
          <Switch
            {...{ disabled, checked, loading }}
            onChange={this.onChangeActive}
          />
        </Cell>
        <Cell onClick={this.stopPropagation} textAlign="center">
          <Switch
            {...{ loading }}
            checked={onlyProDesign}
            disabled={checked}
            onChange={this.onChangePro}
          />
        </Cell>
        <Cell onClick={this.stopPropagation} textAlign="center">
          <Switch
            {...{ disabled, loading }}
            checked={hasPredyed}
            onChange={this.enablePredyed}
          />
        </Cell>
      </Container>
    )
  }
}

export default ItemOrder
