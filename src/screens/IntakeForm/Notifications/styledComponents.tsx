import styled from 'styled-components'
import { GRAY_DARK, GRAY, RED, WHITE, BLUE, RED_TRANSPARENT } from '../../../theme/colors'
import { AVENIR_NEXT } from '../../../theme/fonts'

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
  flex: 2;

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

export const CheckTitle = styled.div`
  margin-right: 20px
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`

export const ProjectInfoContainer = styled.div`
  display: flex;
  margin: 10px 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const BoxContainer = styled.div`
  margin-right: 10px;
  flex: 1.2;
  @media (max-width: 768px) {
    flex: 4;
    margin-right: 0px;
    & .ant-checkbox-wrapper {
      margin: 0 8px 12px 0;
    }
  }
`

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 240px;
  height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
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

export const ValueContainer = styled.div`
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
  background-color: ${({ selected }: ButtonProps) =>
    selected ? RED : WHITE};
  border-radius: 2px;
  display: flex;
  height: 50px;
  padding: 14px;
  justify-content: center;
  border: 1px solid ${({ selected }: ButtonProps) =>
  selected ? RED : GRAY_DARK};
  transition: all .25s;
  color: ${({ selected }: ButtonProps) =>
  selected ? WHITE : GRAY_DARK};
  -webkit-transform: translate3d(0,0,0);
  &:hover {
    cursor: pointer;
    color: ${WHITE};
    border: 1px solid ${({ selected }: ButtonProps) =>
    selected ? RED : RED_TRANSPARENT};
    background-color: ${({ selected }: ButtonProps) =>
    selected ? RED : RED_TRANSPARENT};
  }
`

export const SectionButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 5px;
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

export const inputStyle = {
  width: '100%'
}

export const buttonStyle = {
  width: '100%'
}

export const cancelButtonStyle = {
  ...buttonStyle,
}

export const acceptButtonStyle = {
  ...buttonStyle,
  border: 'none',
  marginTop: '5px',
  marginLeft: '0',
  background: BLUE,
}

export const popupStyle = {
  left: '0 !important',
  top: '0 !important',
  width: '100%',
  height: '100vh',
  background: '#0000003d',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed'
}