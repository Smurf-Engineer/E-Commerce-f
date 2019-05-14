/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { Container, Cell, ImageCell } from './styledComponents'
import { Switch } from 'antd'
interface Props {
  image: string
  id: number
  name: string
  mpn?: string
  code: string
  shortId?: string
  productType?: string
  active: boolean
  onCheck: (id: number) => void
  onOrderClick: (shortId: string) => void
}

interface State {
  loading: boolean
}
class ItemOrder extends React.PureComponent<Props, State> {
  state = {
    loading: false
  }
  componentDidUpdate(prevProps: Props) {
    const { active: newActive } = this.props
    const { active: oldActive } = prevProps
    if (oldActive !== newActive) {
      this.setState({ loading: false })
    }
  }
  handleOnClick = () => {
    const { onOrderClick, shortId } = this.props
    onOrderClick(shortId || '')
  }
  onChange = () => {
    const { onCheck, id } = this.props
    this.setState({ loading: true })
    onCheck(id)
  }
  render() {
    const { loading } = this.state
    const { image, name, mpn, code, productType, active } = this.props
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
        <Cell textAlign="center">
          <Switch checked={active} loading={loading} onChange={this.onChange} />
        </Cell>
      </Container>
    )
  }
}

export default ItemOrder
