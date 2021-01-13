import styled from 'styled-components'
import { GRAY_DARK, GRAY, RED, WHITE, GRAY_LIGHT, GRAY_LIGHTEST } from '../../../theme/colors'

interface ButtonProps {
  selected: boolean
  large?: boolean
  oneSize?: boolean
}

export const Container = styled.div`
  background-color: ${WHITE};
  display: inline-flex;
  flex-direction: column;
  margin-right: 20px;
  &:last-child {
    margin: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 25px;
`

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 240px;
`

export const Text = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
`

export const InfoText = styled.div`
  font-size: 15px;
  color: ${GRAY};
`

export const ItalicText = styled.div`
  font-size: 15px;
  font-style: italic;
  margin: 5px 0 15px 0;
`

export const Label = styled.div`
  display: flex;
  color: ${GRAY_DARK};
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 6px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 0;
  }
`

export const Required = styled.div`
  color: ${RED};
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 6px;
`

export const Field = styled.div`
  margin-bottom: 20px;
`

export const NotificationSettings = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
`

export const CheckboxLabel = styled.div`
  display: inline-block;
`

export const   ValueContainer = styled.div`
  width: 100%;
  flex: 7;
`

export const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 100%;
`

export const CheckBoxContainer = styled.div`
  margin-right: 10px;
  flex: 1.2;
  @media (max-width: 768px) {
    flex: 4;
  }
`

export const SectionButton = styled.div`
  align-content: center;
  background-color: ${WHITE};
  border: ${({ selected }: ButtonProps) =>
    selected ? `2px solid ${RED}` : `0.5px solid ${GRAY_LIGHT}`};
  border-radius: 2px;
  display: flex;
  height: 50px;
  padding: 14px;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`

export const SectionButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 5px;
`
export const InfoTitle = styled.div`
  display: flex;
  background-color: ${GRAY_LIGHTEST};
  padding: 10px;
  font-weight: 600;
`

export const ReviewContainer = styled.div`
  display: flex;
  border: 1px solid ${GRAY_LIGHTEST};
  width: 30%;
`

export const inputStyle = {
  width: '100%'
}
