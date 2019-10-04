/**
 * Styled Components - Created by Jesús Apodaca on 04/10/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import InputComponent from 'antd/lib/input'
import { GRAY_STRONG, BLUE, WHITE } from '../../../theme/colors'

interface DivProps {
  fullSize?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 1024px;
`

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Avenir Next';
  font-size: 16px;
  justify-content: space-around;
  width: 203px;
  cursor: pointer;
`

export const RowInput = styled.div`
  margin-top: 26px;
  display: flex;
`

export const InputDiv = styled.div`
  width: ${({ fullSize }: DivProps) => (fullSize ? '467px' : '220px')};
  margin-right: 26px;
`

export const Input = styled(InputComponent)`
  border-radius: 0;
  margin-top: 6px;
`

export const Label = styled.div`
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-top: 22px;
  display: flex;
  align-items: center;
  flex: 1;
`

export const SubLabel = styled.div`
  font-family: 'Avenir Next';
  font-size: 12px;
  font-family: 'Avenir Next';
  font-size: 12px;
  margin-left: 8px;
  color: ${GRAY_STRONG};
  font-weight: normal;
`

export const AddItem = styled(Button)`
  width: 221px;
  margin: 16px 0px;
`

export const UploadSection = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;
`

export const ButtonDelete = styled.div`
  color: #e61737;
  font-size: 14px;
  line-height: 19px;
  margin-left: 8px;
  cursor: pointer;
  display: inline-block;
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

export const BuildButton = styled.div`
  color: ${WHITE};
  font-family: 'Avenir Next';
  font-size: 16px;
  width: 220.37px;
  border-radius: 2px;
  background-color: ${BLUE};
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  cursor: pointer;
`
