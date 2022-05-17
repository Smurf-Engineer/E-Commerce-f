import Checkbox from 'antd/lib/checkbox'
import Icon from 'antd/lib/icon'
import styled from 'styled-components'
import { WHITE, BLUE, GRAY_DARK, GRAY_SKELETON } from '../../theme/colors'

interface DivProps {
  disabled?: boolean
}

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: column;
`

export const BodyContent = styled.div`
  padding: 0 30px 30px 30px;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

export const InputContainer = styled.div`
  flex: 1;
  padding: 20px 0;
`

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  padding: 30px;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`

export const Description = styled.div`
  font-size: 16px;
  margin: 10px 0;
  padding: 0 30px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`

export const Footer = styled(Description)`
  margin-bottom: 25px;

  a {
    color: ${BLUE};
  }
`

export const Strong = styled.div`
  font-weight: 600;
  font-size: 15px;
  text-align: center;
`

export const PhoneColumn = styled.div`
  display: block;
  margin-left: 10px;
`

export const InputTitleContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
  @media (max-width: 412px) {
    justify-content: center;
  }
`

export const Label = styled.div`
  height: 19px;
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-top: 0px;
  }
`

export const ConfirmButton = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  padding: 8px 12px;
  border: 1px solid #cecece;
  border-radius: 3px;
  box-shadow: 1px 2px 5px -2px #a4a4a4;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const BannerImage = styled.img`
  max-width: 336px;
  object-fit: contain;
  @media (max-width: 480px) {
    width: 100%;
  }
`

export const StyledCheckbox = styled(Checkbox)`
  color: ${GRAY_DARK};
  text-indent: -24px;
  margin: 20px 0px 0 24px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`

export const OptOutMessage = styled.div`
  margin-top: 14px;
  font-size: 12px;
`

export const TelInput = styled.div`
  display: inline-flex;
  align-items: flex-start;
  @media (max-width: 412px) {
    flex-flow: column;
    align-items: center;
    width: 100%;
  }
`

export const StyledSignUp = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: -2px;
  padding: 9px 12px;
  background: ${({ disabled }: DivProps) => disabled ? GRAY_SKELETON : BLUE};
  color: ${WHITE};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 2;
  transition: all .25s;
  &:hover {
    cursor: ${({ disabled }: DivProps) => disabled ? 'not-allowed' : 'pointer'};
    opacity: 0.7;
  }
  @media (max-width: 412px) {
    margin: 0;
    margin-top: 12px;
    width: 100%;
    border-radius: 3px;
    justify-content: center;
    max-width: 192px;
  }
`

export const SignUpIcon = styled(Icon)`
  margin-right: 10px;
`

export const SavedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SavedPhone = styled.img`
  width: 100%;
  max-width: 378px;
  filter: brightness(1.1);
  margin: 28px 32px;
  object-fit: contain;
  animation: fade-in-fwd 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  @keyframes fade-in-fwd {
    0% {
      transform: translateZ(-80px);
      opacity: 0;
    }
    100% {
      transform: translateZ(0);
      opacity: 1;
    }
  }
`
