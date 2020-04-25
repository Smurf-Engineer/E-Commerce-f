/**
 * Styled Components - Created by eduardoquintero on 10/03/20.
 */
import styled from 'styled-components'
import { WHITE, GRAY_DARK } from '../../theme/colors'
import { AVENIR_NEXT } from '../../theme/fonts'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${WHITE};
  max-width: 1452px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`

export const Title = styled.div`
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};

  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  -webkit-letter-spacing: 0.25px;
  -moz-letter-spacing: 0.25px;
  -ms-letter-spacing: 0.25px;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const ModalMessage = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  -webkit-letter-spacing: 0.2px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin-top: 12px;
  margin-bottom: 12px;
`
