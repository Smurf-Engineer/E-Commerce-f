/**
 * Styled Components - Created by cazarez on 20/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  .ant-modal-content {
    border-radius: 0;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: center;
`

export const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  &:hover {
    cursor: pointer;
  }
`

export const Logo = styled.img`
  margin-top: -25px;
  margin-bottom: 30px;
`
export const Title = styled.div`
  margin-bottom: 20px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
`
