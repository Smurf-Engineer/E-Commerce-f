/**
 * Styled Components - Created by eduardoquintero on 24/05/19.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'

const Search = Input.Search

export const Container = styled.div`
  padding-bottom: 36px;
  width: 100%;
`
export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const SearchInput = styled(Search)`
  margin-bottom: 20px;
  margin-top: 0px;
  border-radius: 0;
  margin-left: 4px;
  width: 500px;
  & input {
    border-radius: 0;
    padding: 7px;
    height: 48px;
  }
`

export const AddDiscountButton = styled(Button)`
  height: 50px;
  border: 2px solid #e61737;
  border-radius: 2px;
  background-color: #ffffff;
  color: #e61737;
  margin-right: 22px;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`
