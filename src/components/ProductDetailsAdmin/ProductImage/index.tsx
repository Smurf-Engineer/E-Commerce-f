/**
 * ThirdStep Component - Created by Apodaca on 16/05/19.
 */
import * as React from 'react'
import RowField from '../RowField'
import { ProductImage, BlockProduct } from '../../../types/common'
import { Row, RowImage } from './styledComponents'

interface Props {
  picture: ProductImage
}
const ProductImage = ({ picture }: Props) => (
  <div>
    {picture.genderBlockImages.map(
      (imageBlock: BlockProduct, blockIndex: number) => (
        <Row key={blockIndex}>
          {imageBlock.map((image: string, subindex: number) => (
            <RowField
              key={subindex}
              paddingTop={blockIndex === 0 && subindex > 0 ? '23px' : '0'}
              label={
                blockIndex === 0 && subindex === 0 ? picture.genderName : ''
              }
            >
              <RowImage src={image} />
            </RowField>
          ))}
        </Row>
      )
    )}
  </div>
)

export default ProductImage
