/**
 * Styled Components - Created by miguelcanobbio on 18/07/18.
 */
import styled from 'styled-components'
import Icon from 'antd/lib/icon'

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
  border: 0.5px solid #bebebe;
  border-radius: 2px;
  height: 138px;
  width: 120px;
  margin-right: 16px;
  padding-bottom: 16px;
  padding-top: 8px;
`
export const MaterialButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`
export const MaterialImage = styled.img`
  object-fit: contain;
  display: inline-block;
  max-width: 90px;
  max-height: 90px;
  cursor: pointer;
`
export const MaterialButton = styled(Icon)`
  cursor: pointer;
`
