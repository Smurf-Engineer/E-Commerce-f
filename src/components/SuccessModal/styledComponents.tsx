import styled from 'styled-components'
import { LEAF, WHITE, BLACK } from '../../theme/colors'

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: column;
`

export const BodyContent = styled.div`
  padding: 20px 32px;
  padding-bottom: 2px;
  display: flex;
  flex-direction: column;
`
export const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${LEAF};
  color: ${WHITE};
  padding: 12px;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

export const Description = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`

export const Strong = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-top: 20px;
`

export const EditButton = styled.div`
  align-self: center;
  padding: 13px;
  margin: 15px 0 20px 0;
  font-size: 16px;
  font-weight: normal;
  font-family: Avenir-Medium;
  width: 100%;
  text-align: center;
  color: ${WHITE};
  background: ${BLACK};
  border-radius: 3px;
  transition: all 0.25s ease;
  border: 1px solid ${BLACK};
  &:hover {
    cursor: pointer;
    background: ${WHITE};
    color: ${BLACK};
  }
`

export const PanelIcon = styled.img`
  max-width: 30px;
  width: 100%;
  margin-right: 14px;
  object-fit: contain;
  filter: grayscale(1) brightness(2.5) saturate(0) contrast(1);
`
