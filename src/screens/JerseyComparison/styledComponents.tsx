/**
 * Styled Components - Created by miguelcanobbio on 14/06/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 48px;
`

export const Title = styled.div`
  width: 100%;
  height: 33px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  margin: 24px 0;
  text-align: center;
`

export const Subtitle = styled.div`
  width: 100%;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  padding: 0 32px;
  margin: 30px 0 4px;
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
  margin-bottom: 30px;
`

export const HeaderText = styled.div`
  width: 40%;
  margin-bottom: 10px;
  text-align: center;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
  padding: 0 16px;
`

interface InfoTextProps {
  centered?: boolean
}

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const InfoText = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin-bottom: 10px;
  text-align: ${({ centered }: InfoTextProps) =>
    centered ? 'center' : 'left'};
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 32px;
  margin: 0 0 16px;
`

export const Column = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`

export const PriceColumn = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
`

export const StyledImage = styled.img`
  object-fit: contain;
`

export const PriceTitlesContainer = styled.div`
  margin-right: 24px;
`
