/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  color: #ffffff;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
  font-weight: 200;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 24px;
  }
`

export const Title = styled.div`
  height: 14px;
  width: 119.29px;
  color: #bebebe;
  font-family: 'Avenir Next';
  font-size: 10px;
  font-weight: bold;
  line-height: 14px;
  margin-bottom: 15px;
`

export const Text = styled.div`
  margin-bottom: 13px;
`

export const Link = styled.a`
  color: #fff;
  &:hover {
    border-bottom: 1px solid red;
    cursor: pointer;
    color: #fff;
  }
`
