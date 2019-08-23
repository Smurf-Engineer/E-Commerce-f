/**
 * Styled Components - Created by david on 09/04/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  background-color: #fff;
  padding: 40px 32px 90px 32px;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 40px 10px 90px 10px;
  }
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
`

export const Subtitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  padding: 16px 0;
`

export const Message = styled.div`
  color: #5f6062;
  font-size: 14px;
  line-height: 23px;
`

export const PriceMessage = styled.div`
  color: #5f6062;
  font-size: 16px;
  line-height: 23px;
`

export const LockerMessage = styled.div`
  color: #8c8c8c;
  font-size: 14px;
  line-height: 21px;
`

export const DragMessage = styled.p`
  color: #5f6062;
  padding: 4px 0px;
  font-size: 16px;
  line-height: 22px;
`
export const TextBlock = styled.div`
  margin: 18px 0;
`

export const DragTypes = styled.p`
  color: #bebebe;
  font-size: 13px;
  line-height: 18px;
`

export const Icon = styled.img`
  margin-bottom: 8px;
`

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 1452px;
  max-height: 300px;
  object-fit: cover;
  margin: 0 auto;
  display: block;
  margin-bottom: 16px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`

export const RowButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0;
  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 16px;
  }
`

export const RowSwitch = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
`

export const ButtonDelete = styled.div`
  color: #e61737;
  font-size: 14px;
  line-height: 19px;
  margin-left: 8px;
  cursor: pointer;
`

export const Column = styled.div``

export const AddItem = styled(Button)`
  width: 221px;
  margin: 16px 0px;
`

export const ButtonBuildStyle = styled(Button)`
  width: 25%;
  margin: 16px 0px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const ButtonOptionsWrapper = styled.div`
  width: 25%;
  margin: 16px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const ButtonOptionStyle = styled(Button)`
  width: 45%;
  margin: 16px 0px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const draggerStyle = { padding: '30px 0px', marginBottom: 16 }

export const BannerTitleContainer = styled.div`
  display: flex;
  align-items: center;
`

export const OptionalLabel = styled.span`
  margin-left: 10px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`
