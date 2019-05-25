/**
 * Styled Components - Created by eduardoquintero on 07/05/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  padding-bottom: 36px;
  padding-right: 48px;
  width: 100%;
`
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 38px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`
export const ScreenSubTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  font-weight: normal;
`
export const BlueButton = styled(Button)`
  padding: 0 34px;
  color: white;
  background-color: #4a90e2;
  margin-right: 20px;
`

export const BackLabel = styled.div`
  height: 22px;
  width: 203px;
  cursor: pointer;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
`
export const BackText = styled.span`
  display: inline-block;
  margin-left: 6px;
`
export const MainBody = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
`
export const DetailsContainer = styled.div`
  display: inline-flex;
  width: 100%;
  flex-flow: column;
`
export const Loader = styled.div`
  margin-top: 128px;
`
export const FormBody = styled.div``

export const HeaderRow = styled.div`
  flex-flow: column;
  flex: 1;
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
export const Row = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
export const Separator = styled.div`
  border-bottom: 1px solid #dcdcdc;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  padding-bottom: 10px;
  margin-bottom: 30px;
  margin-top: 84px;
`
export const RowImage = styled.img`
  max-height: 200px;
  object-fit: cover;
`

export const RenderBackground = styled.div`
  background: ${({ openedModel }: any) => (openedModel ? '#f3f3f3' : 'white')};
  transition: all 0.25 ease;
  text-align: center;
`
export const Footer = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-top: 46px;
`

export const BackButton = styled.div`
  margin-right: 26px;
  width: 165.9px;
  border-radius: 4px;
  cursor: pointer;
  color: #4a90e2;
  border: 1px solid #4a90e2;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: white;
`

export const NextButton = styled.div`
  margin-right: 26px;
  width: 165.9px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4a90e2;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  box-shadow: 0px 2px 2px 0px #b7b7b7;
`
