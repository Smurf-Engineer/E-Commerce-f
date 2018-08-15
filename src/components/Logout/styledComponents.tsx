/**
 * Styled Components - Created by cazarez on 27/02/18.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'

export const Container = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Avenir Next';
`

export const Text = styled.div`
  color: #5f6062;
  cursor: pointer;
  font-family: 'Avenir Next';
  font-size: 14px;

  @media (max-width: 991px) {
    align-items: center;
    color: #5f6062;
    display: flex;
    font-weight: 600;
    height: 40px;
    margin: 2px 0;
  }
`

export const Icon = styled(icon)`
  color: #5f6062;
  margin-right: 4px;
  font-size: 15px;
  font-weight: 600;
`

export const menuStyle = {
  borderRadius: 0,
  fontFamily: 'Avenir Next',
  marginTop: 15
}
