/**
 * Styled Components - Created by cazarez on 27/02/18.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Text = styled.div`
  color: #5f6062;
  font-size: 14px;
  cursor: pointer;

  @media (max-width: 991px) {
    color: #5f6062;
    font-weight: 600;
    height: 40px;
    margin: 2px 0;
    display: flex;
    align-items: center;
  }
`

export const Icon = styled(icon)`
  color: #5f6062;
  margin-right: 4px;
  font-size: 15px;
  font-weight: 600;
`

export const menuStyle = {
  marginTop: 15,
  borderRadius: 0,
  paddingBottom: 20
}
