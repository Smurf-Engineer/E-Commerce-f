import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'

interface Props {
  src: string
}

const LazyImage = ({ src }: Props) => {
  return (
    <LazyLoadImage
      {...{src}}
      style={{ width: '100%'}}
      effect="opacity"
    />
  )
}

export default LazyImage