/**
 * Styled Components - Created by miguelcanobbio on 16/08/18.
 */
import styled from 'styled-components'
import { GRAY_DARK, GRAY_LIGHTEST } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  padding-top: 48px;
  margin-bottom: 10vh;
`

export const Image = styled.img`
  width: 320px;
  height: 320px;
  background-color: ${GRAY_LIGHTEST};
  object-fit: contain;
`

export const Code = styled.div`
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-bottom: 4px;
`

export const StatusContainer = styled.div`
  display: flex;
`

export const Label = styled.div`
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.11px;
`

export const Status = styled.div`
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.11px;
  margin-left: 8px;
`

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  min-height: 320px;
`

export const FinalSvg = styled.div`
  margin: 16px 0;
`

export const AssetsLabel = styled.div`
  color: ${GRAY_DARK};
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 22px;
`
