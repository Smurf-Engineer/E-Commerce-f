/**
 * Styled Components - Created by david on 09/04/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import {
  BLUE,
  FACEBOOKBLUE,
  WHITE,
  GRAY_SKELETON,
  BLUE_BRIGHT,
  GRAY_HEADER,
  GRAY_DARK
} from '../../theme/colors'
import { AVENIR_NEXT } from '../../theme/fonts'

interface DivProps {
  width?: string
  left?: boolean
  value?: string
}
const TextArea = Input.TextArea

export const Container = styled.div`
  background-color: #fff;
  padding: 40px 32px 90px 32px;
  max-width: 1452px;
  margin: 0 auto;
  width: 100%;
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

export const RowColumn = styled.div`
  display: flex;
  flex-flow: column;
  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 36px;
  }
`

export const AddItem = styled(Button)`
  width: 221px;
  margin: 16px 0px;
`

export const ButtonOptionsWrapper = styled.div`
  width: 100%;
  max-width: 316px;
  margin: 16px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
  }
`

export const ButtonOptionStyle = styled(Button)`
  width: 45%;
  margin: 16px 0px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`
export const SaveButton = styled(Button)`
  width: ${({ width }: DivProps) => (width ? width : '45%')};
  margin: 16px 0px;
  color: white;
  background: ${BLUE};
  border: none;
  &:hover {
    color: white;
    background: ${FACEBOOKBLUE};
    border: none;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    margin-top: 0;
  }
`

export const draggerStyle = { padding: '30px 0px', marginBottom: 16 }

export const BannerTitleContainer = styled.div`
  display: flex;
  align-items: center;
`

export const BulletinLabel = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  @media (max-width: 480px) {
    flex-flow: column;
    margin-bottom: 18px;
    margin-top: 14px;
    align-items: flex-start;
  }
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

export const Bulletin = styled.div`
  display: inline-flex;
  max-width: 570px;
  width: 100%;
  background: ${GRAY_HEADER};
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  font-family: 'Avenir-Medium';
  @media (max-width: 480px) {
    width: auto;
    margin: 12px;
    padding: 8px;
  }
`

export const Pin = styled.img`
  transform: ${({ left }: DivProps) => (left ? 'scaleX(-1)' : 'none')};
`

export const PinDiv = styled.div`
  position: absolute;
  top: -7px;
  width: 102%;
  justify-content: space-between;
  display: flex;
`

export const Corner = styled.div`
  width: 0;
  height: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-bottom: 16px solid ${WHITE};
  border-left: 16px solid ${GRAY_SKELETON};
`

export const BulletinInput = styled(TextArea)`
  background: transparent;
  border: none;
  max-width: 570px;
  transition: all 0.25s;
  min-height: 57px !important;
  width: 100%;
  font-style: italic;
  font-size: 18px;
  text-align: center;
  resize: none;
  box-shadow: none;
  padding: 14px 12px;
  color: ${BLUE_BRIGHT};
  &:focus {
    box-shadow: none;
  }
`

export const DynamicDropLogo = styled.img`
  width: 150px;
  margin: 15px 0;
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const InfoBody = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: -38px;
`

export const buttonStyle = {
  background: BLUE,
  border: 'none'
}
