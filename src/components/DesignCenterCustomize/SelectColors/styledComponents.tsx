/**
 * Styled Components - Created by miguelcanobbio on 01/08/18.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'
import { GRAY_DARK, GRAY_LIGHT } from '../../../theme/colors'
import Button from 'antd/lib/button'

export const Container = styled.div``

export const ColorLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const BaseColors = styled.div`
  cursor: pointer;
`

export const BaseTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 32px;
`

export const Arrow = styled(Icon)`
  color: ${GRAY_DARK};
  font-size: 16px;
`

export const Divider = styled.div`
  background-color: ${GRAY_LIGHT};
  height: 1px;
  margin: 0 32px 4px 32px;
`

export const ColorsIcon = styled.img`
  width: 20px;
  margin-right: 10px;
`

export const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

export const Title = styled.div`
text-align: center;
    font-size: 16px;
    margin-top: 4px;
    margin-bottom: 28px;
`

export const PredyedImages = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`

export const HelpImage = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-style: italic;
`

export const ExampleImage = styled.img`
  max-width: 202px;
  width: 100%;
  border-radius: 3px;
  margin-bottom: 6px;
`

export const Description = styled.div`
  margin-top: 32px;
  padding: 0 22px;
  margin-bottom: 8px;
`
