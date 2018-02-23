/**
 * Styled Components - Created by cazarez on 21/02/18.
 */
import styled from 'styled-components'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
export const Container = styled.div`
  width: 100%;
  margin-bottom: 30px;
`

export const Text = styled.div`
  color: #fff;
`

export const FacebookButton = styled(FacebookLogin)`
  width: 100%;
  text-align: right;
  &:hover {
    cursor: pointer;
  }
`

export const GoogleButton = styled(GoogleLogin)`
  font-family: 'Avenir next';
  width: 100%;
  height: 50px;
  background-color: #f0372d;
  color: #fff;
  margin-bottom: 10px;
`
