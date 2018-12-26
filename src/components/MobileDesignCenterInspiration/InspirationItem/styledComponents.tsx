/**
 * Styled Components - Created by eduardo on 24/12/18.
 */
import styled from 'styled-components'

interface ContainerProps {
  image: string
}

export const Container = styled.div`
  width: 100%;
  padding: 4px 4px 0 4px;
  height: 100px;
  &:last-child {
    padding-bottom: 4px;
  }
`

export const Image = styled.div`
  background-color: #f1f4f5;
  background-image: url(${({ image }: ContainerProps) => image || ''});
  background-size: 130px;
  background-position: center;
  width: 100%;
  height: 100%;
`
