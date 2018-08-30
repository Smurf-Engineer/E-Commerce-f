/**
 * Styled Components - Created by cazarez on 25/05/18.
 */

interface ContainerProps {
  selected: boolean
}

import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  background-color: #fff;
`

export const Title = styled.div`
  margin-bottom: 10px;
  color: #5f6062;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const TeamstoresListContainer = styled.div`
  height: 127px;
  padding: 10px;
  overflow: scroll;
  border: 1px solid #f1f4f5;
  margin-bottom: 10px;
`

export const ListItem = styled.div`
  height: 23px;
  width: 121px;
  color: ${({ selected }: ContainerProps) =>
    selected ? '#e61737' : '#5f6062'};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;

  &:hover {
    cursor: pointer;
  }
`

export const ListTitle = styled.div`
  margin: 10px;
  height: 16px;
  color: #5f6062;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const AddTeamStoreButton = styled(Button)`
  height: 40px;
  border: 2px solid #e61737;
  border-radius: 2px;
  background-color: #ffffff;
  color: #e61737;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`

export const AddButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
`
export const AddDesignButton = styled(Button)`
  height: 40px;
  width: 93px;
  background-color: #4a90e2;
  color: #fff;
  border-radius: 0;

  &:hover {
    background-color: #4a90e2;
    color: #fff;
    border-color: #4a90e2;
  }
`

export const LoadingContainer = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
