/**
 * Styled Components - Created by cazarez on 25/05/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding: 60px 35px;
  display: flex;
  justify-content: space-between;

  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
    padding: ;
  }
`

export const Text = styled.div`
  margin-top: 15px;
  height: 22px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`
export const StyledImg = styled.img`
  height: 319px;
  object-fit: contain;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
    width: 100%;
    margin-top: 15px;
  }
`
