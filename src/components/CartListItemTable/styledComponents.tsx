/**
 * Styled Components - Created by gustavomedina on 04/05/18.
 */
import styled from 'styled-components'
import Select from 'antd/lib/select'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import { GRAY_LIGHT, RED, GRAY, GRAY_SOFT, GRAY_DARK } from '../../theme/colors'

type SelectType = {
  selectWidth?: string
}

export const Table = styled.div`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 15px;
  padding-left: 16px;
  padding-right: 16px;

  @media (max-width: 640px) {
    margin-bottom: 0;
    padding: 0;
  }
`

export const Body = styled.tbody``

type RowProps = {
  withColor?: boolean
  onlyRead?: boolean
}

export const Row = styled.div`
  display: grid;
  grid-template-columns: ${({ withColor, onlyRead }: RowProps) => {
    if (withColor) {
      return onlyRead ? '1fr 48px 1fr 1fr 1fr' : '1fr 38px 1fr 1fr 1fr'
    }
    return 'repeat(4, 1fr)'
  }};
  grid-gap: ${({ withColor }: RowProps) => (withColor ? '10px' : '3px')};

  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${GRAY_LIGHT};
  padding-bottom: 8px;
  padding-top: 8px;

  @media (min-width: 426px) and (max-width: 640px) {
    padding: 0 5px;
    height: 50px;
    grid-gap: 5px;
  }

  @media (max-width: 425px) {
    padding: 0 5px;
    height: 50px;
    grid-gap: 3px;
  }
`

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: ${({ withColor, onlyRead }: RowProps) => {
    if (withColor) {
      return onlyRead ? '1fr 48px 1fr 1fr 1fr' : '1fr 38px 1fr 1fr 1fr'
    }
    return 'repeat(4, 1fr)'
  }};
  grid-gap: ${({ withColor }: RowProps) => (withColor ? '10px' : '5px')};
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${GRAY_SOFT};
  padding-bottom: 4px;

  @media (max-width: 640px) {
    padding: ${({ withColor }: RowProps) => (withColor ? '0 5px' : '0 7px')};
    grid-gap: ${({ withColor }: RowProps) => (withColor ? '3px' : '5px')};
  }

  @media (min-width: 426px) and (max-width: 640px) {
    padding: ${({ withColor }: RowProps) => (withColor ? '0 5px' : '0 7px')};
    grid-gap: 5px;
  }

  @media (max-width: 425px) {
    padding: ${({ withColor }: RowProps) => (withColor ? '0 5px' : '0 7px')};
    grid-gap: ${({ withColor }: RowProps) => (withColor ? '3px' : '5px')};
  }
`

export const Column = styled.td`
  outline: 1px solid red;
  padding: 0;
`
interface CellProps {
  width?: number
  align?: string
}
export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  width: ${({ width }: CellProps) => (width ? width : 100)}%;
`

export const InfoCell = styled.div`
  width: 100%;
  text-align: ${({ align }: CellProps) => (align ? align : 'left')};
  color: ${GRAY_DARK};
  font-size: 14px;
`

export const HeaderCell = styled.div`
  text-align: left;
  width: ${({ width }: CellProps) => (width ? width : 100)}%;
`

interface TitleProps {
  align: string
  titleWidth?: string
}

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  text-align: ${({ align }: TitleProps) => align};
  width: ${({ titleWidth }: TitleProps) => (titleWidth ? titleWidth : 'auto')};
`

export const Price = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 43px;
  width: 58px;
  text-align: ${({ align }: TitleProps) => (align ? align : 'center')};
`

export const MobileEmtpytable = styled.div`
  padding: 50px 40px 50px;
  border-bottom: 1px solid ${GRAY_LIGHT};
  color: ${GRAY};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 21px;
  text-align: center;
`

export const DeleteItem = styled.div`
  color: ${RED};
  cursor: pointer;
  padding-left: 10px;
`

export const StyledSelect = styled(Select)`
  width: ${({ selectWidth }: SelectType) =>
    selectWidth ? selectWidth : '100%'};
`

export const StyledInput = styled(Input)`
  width: '100%';
`

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`

export const ProductColor = styled.img`
  border-radius: 50%;
  border: 1px solid ${GRAY};
  width: 30px;
`