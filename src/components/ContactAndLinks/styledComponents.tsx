/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #231f20;

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    justify-content: wrap;
  }
`

export const Text = styled.div`
  color: #fff;
`

export const ComplianceLogos = styled.div`
  display: flex;
  align-self: flex-end;
  flex-direction: column;
  justify-content: flex-end;
`

export const StyledImg = styled.img`
  margin-bottom: 10px;
`
