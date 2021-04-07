import styled from 'styled-components'
import { LEAF, WHITE, BLACK } from '../../theme/colors'

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: column;
`

export const BodyContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`
export const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${LEAF};
  color: ${WHITE};
  padding: 10px;
  text-align: center;
`

export const Description = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`

export const Strong = styled.div`
  font-weight: 600;
  font-size: 15px;
  text-align: center;
`

export const EditButton = styled.div`
  align-self: center;
  padding: 13px;
  margin: 15px 0 20px 0;
  font-size: 14px;
  width: 100%;
  text-align: center;
  color: ${WHITE};
  background: ${BLACK};
  transition: all 0.25s ease;
  &:hover {
    cursor: pointer;
    background: ${WHITE};
    color: ${BLACK};
  }
`