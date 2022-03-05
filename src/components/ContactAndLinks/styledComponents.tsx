/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #231f20;
`

export const ContainerMobile = styled.div``

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Column = styled.div`
  height: 144px;
`

export const Text = styled.div`
  color: #fff;
`

export const ComplianceLogos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media(max-width: 768px) {
    flex-flow: row;
    justify-content: space-between;
    margin-top: 0px;
  }
`

export const StyledImg = styled.img`
  margin-bottom: 10px;
  align-self: flex-end;
  width: 70px;
`

export const RewardLogo = styled.div`
  transform: scale(0.6);
  margin-top: -50px;
  margin-right: -41px;
  margin-left: -51px;
  @media (max-width: 1280px) {
    align-self: flex-end;
    transform: scale(0.5);
  }
`