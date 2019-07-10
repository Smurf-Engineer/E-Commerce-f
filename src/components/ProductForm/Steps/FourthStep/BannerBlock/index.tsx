/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import {
  Container,
  MaterialButton,
  MaterialButtons,
  MaterialImage
} from './styledComponents'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox'

interface Props {
  id: number
  url: string
  selected: boolean
  index: number
  handleRemoveMaterial: (index: number) => void
  handleCheckMaterial: (event: CheckboxChangeEvent) => void
}
class BannerBlock extends React.PureComponent<Props> {
  render() {
    const { id, url, selected, handleCheckMaterial } = this.props
    return (
      <Container>
        <MaterialButtons>
          <MaterialButton onClick={this.handleOnRemove} type="close" />
          <Checkbox
            name={id}
            onChange={handleCheckMaterial}
            checked={selected}
          />
        </MaterialButtons>
        <MaterialImage src={url} alt="avatar" />
      </Container>
    )
  }
  handleOnRemove = () => {
    const { index, handleRemoveMaterial } = this.props
    handleRemoveMaterial(index)
  }
}

export default BannerBlock
