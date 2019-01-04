/**
 * Styled Components - Created by eduardo on 24/12/18.
 */
import styled from 'styled-components'
import { GRAY_LIGHTEST } from '../../../theme/colors'

interface ContainerProps {
  image: string
}

export const Container = styled.div`
  width: 100%;
  padding: 4px 4px 0 4px;
  height: 100px;
`

export const Image = styled.div`
  background-color: ${GRAY_LIGHTEST};
  background-image: url(${({ image }: ContainerProps) => image || ''});
  background-size: 122px;
  background-position: center;
  width: 100%;
  height: 100%;
`
