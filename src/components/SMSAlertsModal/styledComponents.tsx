import styled from 'styled-components'
import { LEAF, WHITE, GRAY_DARK } from '../../theme/colors'

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

export const PhoneColumn = styled.div`
  display: block;
  margin-left: 10px;
`

export const InputTitleContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`

export const Label = styled.div`
  height: 19px;
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`
