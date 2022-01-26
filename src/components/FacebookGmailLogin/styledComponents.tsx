/**
 * Styled Components - Created by cazarez on 21/02/18.
 */
import styled from 'styled-components'
import GoogleLogin from 'react-google-login'
import { FACEBOOKBLUE, WHITE, GOOGLERED, WHITE_TRANSPARENT } from '../../theme/colors'
export const Container = styled.div`
  width: 100%;
  margin-bottom: 30px;
`

export const Text = styled.div`
  color: ${WHITE};
`

export const FacebookButtonWrapper = styled.div`
  position: relative;
  .login-facebook {
    background-color: ${FACEBOOKBLUE};
    color: ${WHITE};
    font-size: inherit;
    padding: 15px 0;
    text-transform: uppercase;
    width: 100%;
    cursor: pointer;
    border: none;
    box-shadow: none;
    transition: all .25s;
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
`

export const GoogleButton = styled(GoogleLogin)`
  position: relative;
  width: 100%;
  height: 50px;
  background-color: ${GOOGLERED};
  color: ${WHITE};
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
`

export const GoogleRenderButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: ${GOOGLERED};
  color: ${WHITE};
  margin-bottom: 10px;
  transition: all .25s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const SocialIcon = styled.i`
  font-size: 20px !important;
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
  & img {
    width: 17px;
  }
`
export const GoogleLabel = styled.span`
  margin-left: 10px;
`

export const LoadingContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10000;
  height: 100vh;
  background: ${WHITE_TRANSPARENT};
  display: flex;
  justify-content: center;
  align-items: center;
`