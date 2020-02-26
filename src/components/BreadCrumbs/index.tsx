/**
 * BreadCrumbs Component - Created by Jesús Apodaca on 31/10/19.
 */
import * as React from 'react'
import { Container, BreadItem, BreadIcon, BreadLabel } from './styledComponents'
import { BreadRoute } from '../../types/common'

interface Props {
  routes: BreadRoute[]
}
const BreadCrumbs = ({ routes }: Props) => {
  return (
    <Container>
      {routes.map(({ url, label, icon, selected }: BreadRoute) => (
        <BreadItem href={url}>
          {icon && <BreadIcon type={icon} />}
          {label && <BreadLabel {...{ selected }}>{label}</BreadLabel>}
        </BreadItem>
      ))}
    </Container>
  )
}

export default BreadCrumbs
