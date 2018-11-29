/**
 * Styled Components - Created by david on 13/07/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Name = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  padding-left: 16px;
`

export const DeleteButton = styled.div`
  cursor: pointer;
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`
export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`

export const EditButton = styled(Button)`
  margin-left: 8px;
`
