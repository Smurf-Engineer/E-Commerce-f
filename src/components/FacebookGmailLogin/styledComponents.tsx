/**
 * Styled Components - Created by cazarez on 21/02/18.
 */
import styled from 'styled-components'
import GoogleLogin from 'react-google-login'
export const Container = styled.div`
  width: 100%;
  margin-bottom: 30px;
`

export const Text = styled.div`
  color: #fff;
`

export const FacebookButtonWrapper = styled.div`
  .kep-login-facebook {
    width: 100%;
    background-color: #395ca9;
    color: #fff;
    padding: 15px 0;
    text-transform: uppercase;
    font-size: inherit;
  }
`

export const GoogleButton = styled(GoogleLogin)`
  width: 100%;
  height: 50px;
  background-color: #f0372d;
  color: #fff;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
`
export const GoogleIcon = styled.i`
  font-size: 20px !important;
`
export const GoogleLabel = styled.span`
  margin-left: 10px;
`
