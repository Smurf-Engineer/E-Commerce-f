/**
 * Styled Components - Created by Apodaca on 17/05/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { WHITE } from '../../theme/colors'

export const Container = styled.div`
  padding-bottom: 36px;
  padding-right: 48px;
  width: 100%;
  max-width: 1024px;
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
export const ModalMessage = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 5px;
  background-color: #4a90e2;
  border-color: #4a90e2;
  color: ${WHITE};

  &:hover {
    background-color: #6ea6e7;
    border-color: #6ea6e7;
  }
`

export const StyledGhostButton = styled(Button)`
  height: 40px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  margin-right: 8px;

  &:hover {
    border-color: #4a90e2;
    color: #4a90e2;
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
export const FullLoader = styled.div`
  text-align: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  flex-flow: column;
  background: #ffffffb5;
  z-index: 999;
`
export const Loader = styled.div`
  margin-top: 128px;
  text-align: center;
`
export const LoadingMessage = styled.div`
  margin-top: 28px;
  text-align: center;
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
