/**
 * Styled Components - Created by cazarez on 10/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

type StyledProps = {
  paginationAlignment?: string
  listForMyAccount?: boolean
}
export const Container = styled.div`
  width: 100%;
`
export const Content = styled.div`
  padding-bottom: 30px;
`
export const Title = styled.div`
  height: 22px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 20px;
`
export const AddAddressBtn = styled(Button)`
  height: 40px;
  width: 221px;
  border: 2px solid #4a90e2;
  border-radius: 2px;
  background-color: #ffffff;
  color: #4a90e2;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
  margin: 0 0 20px;

  &:hover {
    color: #4a90e2;
    border-color: #4a90e2;
  }
`

export const AddressesList = styled.div`
  display: grid;
  grid-template-columns: ${({ listForMyAccount }: StyledProps) =>
    listForMyAccount
      ? 'repeat(4, minmax(170px, max-content))'
      : 'repeat(auto-fit, minmax(150px, min-content))'};
  grid-gap: 60px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(140px, min-content));
    grid-gap: 20px;
  }
`

export const ViewAllAddresses = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
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
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const DeleteConfirmMessage = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
