/**
 * Styled Components - Created by cazarez on 21/02/18.
 */
import styled from 'styled-components'
import GoogleLogin from 'react-google-login'
import { FACEBOOKBLUE, WHITE, GOOGLERED } from '../../theme/colors'
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
export const SocialIcon = styled.i`
  font-size: 20px !important;
  position: absolute;
  left: 10px;
  top: 10px;
  & img {
    width: 17px;
  }
`
export const GoogleLabel = styled.span`
  margin-left: 10px;
`
