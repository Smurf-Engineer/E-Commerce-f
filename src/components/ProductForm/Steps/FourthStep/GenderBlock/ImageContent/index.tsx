/**
 * ImageContent for Blocks Component - Created by Jesús Apodaca on 12/09/19.
 */
import * as React from 'react'
import Spin from 'antd/lib/spin'
import { Label, ImageBox, Loader, EmptyBox, AddIcon } from './styledComponents'

interface Props {
  label: string
  src?: string
}

const ImageContent = ({ label, src }: Props) =>
  src ? (
    <React.Fragment>
      {src === 'loading' ? (
        <Loader>
          <Spin size="large" />
        </Loader>
      ) : (
        <ImageBox src={src} alt="avatar" />
      )}
    </React.Fragment>
  ) : (
    <EmptyBox>
      <AddIcon type="plus" />
      <Label>{label}</Label>
    </EmptyBox>
  )

export default ImageContent
