/**
 * Styled Components - Created by Jesús Apodaca on 20/02/20.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { BLUE, DARKER_GRAY, WHITE } from '../../theme/colors'

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

export const CloseIcon = styled.img`
  position: absolute;
  top: 24px;
  width: 24px;
  right: 24px;
  &:hover {
    cursor: pointer;
  }
`

export const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 22px;
  text-align: left;
`

export const SubTitle = styled.div`
  font-size: 14px;
  margin: 12px 0 15px;
  text-align: left;
`

export const ButtonContainer = styled.div`
  margin-top: 34px;
  text-align: right;
`

export const SaveButton = styled(Button)`
  border-radius: 2px;
  height: 40px;
  padding: 0 27px;
  background: ${BLUE};
  color: ${WHITE};
`

export const NoteContainer = styled.div`
  text-align: left;
  margin-bottom: 12px;
`

export const NoteTitle = styled.div`
  font-style: italic;
  font-size: 13px;
  color: ${DARKER_GRAY};
`

export const NoteText = styled.div``
