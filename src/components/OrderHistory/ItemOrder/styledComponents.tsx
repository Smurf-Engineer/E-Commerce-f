/**
 * Styled Components - Created by miguelcanobbio on 13/07/18.
 */
import Icon from 'antd/lib/icon'
import styled from 'styled-components'
import { GRAY_SOFT, GRAY_STRONG, WHITE } from '../../../theme/colors'

export const Container = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #e6e6e5;
  }
`

interface CellProps {
  color?: string
  textAlign?: string
}

export const Cell = styled.td`
  border-bottom: 1px solid #d7d7d7;
  text-align: left;
  padding: 8px 0;
  color: ${({ color }: CellProps) => (color ? color : '#5f6062')};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 35px;
  text-align: ${({ textAlign }: CellProps) =>
    textAlign ? textAlign : 'start'};

  @media (min-width: 331px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
  }

  @media (max-width: 330px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
  }
`

export const CellMobile = styled.td`
  border-bottom: 1px solid #d7d7d7;
  text-align: left;
  padding: 8px 0;
  color: ${({ color }: CellProps) => (color ? color : '#5f6062')};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 35px;
  text-align: ${({ textAlign }: CellProps) =>
    textAlign ? textAlign : 'start'};

  @media (max-width: 768px) {
    display: none;
  }
`

export const CellTight = styled.td`
  border-bottom: 1px solid #d7d7d7;
  text-align: left;
  padding: 8px 0;
  color: ${({ color }: CellProps) => (color ? color : '#5f6062')};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 35px;
  text-align: ${({ textAlign }: CellProps) =>
    textAlign ? textAlign : 'start'};

  @media (min-width: 331px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
  }

  @media (max-width: 330px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
  }
  @media (max-width: 640px) {
    line-height: 1.5;
  }
`

export const EditButton = styled.div`
  border: 1px solid ${GRAY_SOFT};
  color: ${GRAY_STRONG};
  font-size: 12px;
  transition: all .25s;
  border-radius: 3px;
  margin: 0 16px;
  text-align: center;
  transition: all .25s;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background: ${GRAY_SOFT};
    color: ${WHITE};
  }
`

export const EditIcon = styled(Icon)`
  background: #ffd277;
  margin-left: 18px;
  font-size: 14px;
  padding: 5px;
  border-radius: 3px;
  color: ${WHITE};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`

export const DeleteButton = styled.div`
  color: ${GRAY_SOFT};
  font-size: 13px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const CellSecondary = styled.td`
  border-bottom: 1px solid #d7d7d7;
  text-align: left;
  padding: 8px 0;
  color: ${({ color }: CellProps) => (color ? color : '#5f6062')};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 35px;
  text-align: ${({ textAlign }: CellProps) =>
    textAlign ? textAlign : 'start'};

  @media (min-width: 331px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 12px;
  }

  @media (max-width: 330px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
  }
  @media (max-width: 640px) {
    position: relative;
  }
`

export const DuePayment = styled.div`
  text-align: center;
  font-size: 10px;
  background: #6fc17b;
  width: fit-content;
  margin: 0 auto;
  padding: 0 8px;
  border-radius: 3px;
  height: 24px;
  display: flex;
  align-items: center;
  color: white;
  @media (max-width: 1252px) {
    width: max-content;
  }
  @media (max-width: 640px) {
    text-align: center;
    font-size: 10px;
    background: #6fc17b;
    margin: 0 auto;
    padding: 0 8px;
    height: 24px;
    display: flex;
    align-items: center;
    color: white;
    position: absolute;
    right: 0;
    bottom: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 14px;
    border-top-right-radius: 0px;
  }
`

export const TruckIcon = styled.img`
  max-width: 34px;
  margin-right: 34px;
  @media (max-width: 640px) {
    margin-right: 20px;
  }
`