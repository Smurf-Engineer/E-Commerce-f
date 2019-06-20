/**
 * Styled Components - Created by eduardoquintero on 07/05/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
interface RowProps {
  margin?: string
  borderBottom?: string
  paddingBottom?: string
}
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
  padding-bottom: 40px;
  margin-top: 24px;
  margin-bottom: 20px;
  display: flex;
  border-bottom: 1px solid #dcdcdc;
  justify-content: space-between;
  align-items: flex-start;
`
export const Row = styled.div`
  margin: ${({ margin }: RowProps) => (margin ? margin : '16px 0')};
  border-bottom: ${({ borderBottom }: RowProps) =>
    borderBottom ? borderBottom : 'unset'};
  padding-bottom: ${({ paddingBottom }: RowProps) =>
    paddingBottom ? paddingBottom : 'unset'};
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
