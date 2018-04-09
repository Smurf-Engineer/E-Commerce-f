/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid grey;
  padding-top: 10px;

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    align-items: center;
    flex-direction: column;
  }
`

export const Text = styled.div`
  height: 19px;
  width: 187.18px;
  color: #bebebe;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 19px;
  text-align: right;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 12px;
    text-align: center;
  }
`

export const SocialLogosContainer = styled.div`
  @media (min-width: 320px) and (max-width: 480px) {
    align-self: center;
  }
`

export const StyledImg = styled.img`
  margin-right: 26.76px;
  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0px 16px;
  }
`
