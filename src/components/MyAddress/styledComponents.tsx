/**
 * Styled Components - Created by cazarez on 10/05/18.
 */
import styled from 'styled-components'
import Checkbox from 'antd/lib/checkbox'
import { BLUE, GRAY_DARK, RED, WHITE } from '../../theme/colors'
import Icon from 'antd/lib/icon'

interface DivProps {
  small?: boolean
  shipping?: boolean
  simple?: boolean
  isSelected?: boolean
  highlightCards?: boolean
}

export const Container = styled.div`
  ${({ small }: DivProps) => small ? `
    div {
      font-size: 12px !important; 
    }
  ` : ''}
  ${({ simple }: DivProps) => simple ? `
    margin-right: 60px;
    @media (max-width: 765px) {
      margin-right: 16px;
    }
  ` : ''}
`

export const Text = styled.div`
  color: #5f6062;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin: 6px 0;
`

export const ItalicText = styled.div`
  width: 100%;
  color: #5f6062;
  font-size: 12px;
  letter-spacing: 0.11px;
  line-height: 23px;
  font-style: italic;
  margin: 10px 0;
  text-align: center;
`

export const StyledCheckbox = styled(Checkbox)`
  height: 22px;
  color: #5f6062;
  font-size: ${({ small }: DivProps) => small ? '14px' : '16px'};
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;
  position: absolute;
  top: -8px;
  right: -4px;
  margin-top: 0;
  .ant-checkbox-inner {
    height: 20px;
    width: 20px;
    border-color: 1px solid #7bb6d9;
  }
  .ant-checkbox-wrapper:hover,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${BLUE};
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: #4a90e2;
    border-color: ${BLUE};
  }
  .ant-checkbox-inner:after {
    left: 6.571429px;
    top: 3.142857px;
  }
`

export const StyledCheckboxMulti = styled(Checkbox)`
  color: #5f6062;
  letter-spacing: 0.2px;
  font-size: 14px;
  text-align: right;
  position: absolute;
  top: -8px;
  right: -4px;
  margin-top: 0;
  .ant-checkbox-inner {
    height: 20px;
    width: 20px;
    border-color: 1px solid #7bb6d9;
  }
  .ant-checkbox-wrapper:hover,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${BLUE};
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: #4a90e2;
    border-color: ${BLUE};
  }
  
  .ant-checkbox-inner:after {
    left: 6.571429px;
    top: 3.142857px;
  }
`

export const StyledButton = styled.div`
  color: #f97272;
  font-size: 13px;
  border: none;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const EditButton = styled.div`
  color: #3191b5;
  font-size: 13px;
  border: none;
  margin-left: 12px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const StyledButtonMulti = styled.div`
  color: #f97272;
  font-size: 13px;
  border: none;
  transition: all .25s;
  margin-top: 12px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const EditButtonMulti = styled.div`
  color: #3191b5;
  font-size: 13px;
  border: none;
  margin-top: 16px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const EditButtonWrapper = styled.div`
  width: 100%;
  justify-content: flex-end;
  display: flex;
  align-items: flex-end;
  margin-top: 8px;
  flex: 1;
`

export const SecondaryButtons = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1;
`

export const MultiButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const SecondaryButtonsMulti = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`

export const ButtonIcon = styled(Icon)`
  margin-right: 8px;
`

export const CardContainer = styled.div`
  width: 100%;
  border-radius: 3px;
  box-shadow: 0px 2px 6px -1px ${GRAY_DARK};
  max-width: 288px;
  height: ${({ shipping }: DivProps) => shipping ? '100%' : 'auto'};
  margin-right: ${({ shipping }: DivProps) => shipping ? '3%' : '3.75%'};
  margin-bottom: 48px;
  display: flex;
  flex-flow: column;
  @media (max-width: 1024px) {
    margin-right: unset;
  }
  ${({ shipping }: DivProps) => shipping ? `
    @media (min-width: 750px) and (max-width: 1024px) {
      max-width: 220px;
      margin-right: 20px;
    }
  ` : ''}
  ${({ isSelected }: DivProps) => isSelected ? `
    border: 1.5px solid #00b1ff;
  ` : ''}
  ${({ highlightCards }: DivProps) => highlightCards ? `
    animation: blink-1 1.5s 2 ease-in-out;
    @keyframes blink-1 {
      0% {
        box-shadow: 0 0 0 0 #ff6a6a;
      }
      100% {
        box-shadow: 0 0 0 16px #ffebebb8;
      }
    }
  ` : `
    animation: fade-in-fwd 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
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
  `}
`

export const CardText = styled.div`
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.11px;
  line-height: 23px;
  margin: 2px 0;
  display: flex;
  justify-content: space-between;
`

export const MapsDiv = styled.div``

export const DataDiv = styled.div`
  margin-top: -16px;
  margin-top: ${({ shipping }: DivProps) => shipping ? '-16px' : '20px'};
  background: ${WHITE};
  width: 100%;
  padding: 0px 18px;
  padding-bottom: 16px;
  height: 100%;
  display: flex;
  flex-flow: column;
`

export const CircleIcon = styled(Icon)`
  background: #00aff1;
  border-radius: 25px;
  padding: 9px;
  margin-top: -15px;
  position: relative;
  top: -2px;
  left: -4px;
  font-size: 16px;
  color: ${WHITE};
  max-width: 34px;
  width: 100%;
`

export const TitleDiv = styled.div`
  color: #b5b5b5;
  font-size: 12px;
`

export const ValueDiv = styled.div`
  font-size: 12px;
  margin-left: 10px;
  max-width: 123px;
  text-align: right;
`

export const PinIcon = styled(Icon)`
  font-size: 14px;
  margin-right: 3px;
  color: ${RED};
`