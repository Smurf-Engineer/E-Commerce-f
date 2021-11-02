/**
 * Styled Components - Created by cazarez on 10/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { WHITE, GRAY_DARK, BLUE } from '../../theme/colors'

type StyledProps = {
  paginationAlignment?: string
  listForMyAccount?: boolean
  marginBottom?: string
  small?: boolean
  shipping?: boolean
  simple?: boolean
  grid?: boolean
}

export const Container = styled.div`
  width: 100%;
`
export const Content = styled.div`
  padding-bottom: 20px;
`
export const Title = styled.div`
  height: 22px;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  ${({ marginBottom }: StyledProps) => `margin-bottom: ${marginBottom};`}
`
export const ButtonWrapper = styled.div`
  .ant-btn {
    background-color: ${WHITE};
    border-color: ${BLUE};
    color: ${BLUE};
  }
  .ant-btn:hover {
    background-color: ${BLUE};
    color: ${WHITE};
  }
`

export const AddAddressBtn = styled(Button)`
  height: 50px;
  width: 221px;
  border: 2px solid ${BLUE};
  border-radius: 2px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 20px;
`

export const AddressesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 30px;
  @media (max-width: 1024px) {
    justify-content: ${({ shipping, simple }: StyledProps) => shipping || simple ? 'flex-start' : 'space-evenly'};
  }
  ${({ small }: StyledProps) => small ? `
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(142px, min-content));
    grid-gap: 22px;
    @media (max-width: 700px) {
      grid-template-columns: repeat(2, minmax(140px, min-content));
      grid-gap: 20px;
    }
  ` : ''}
  ${({ grid }: StyledProps) => grid ? `
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    max-height: 620px;
  ` : ''}
`

export const ViewAllAddresses = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: right;
  cursor: pointer;
`

export const PaginationRow = styled.div`
  display: flex;
  justify-content: ${({ paginationAlignment }: StyledProps) =>
    `flex-${paginationAlignment}` || 'center'};
`

export const Message = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const DeleteConfirmMessage = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
