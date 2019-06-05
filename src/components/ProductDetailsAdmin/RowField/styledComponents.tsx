/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import styled from 'styled-components'
interface TextProps {
  capitalize: boolean
}
interface ContainerProps {
  flex?: string
  textAlign?: string
  paddingTop?: string
}
export const Container = styled.div`
  flex: ${({ flex }: ContainerProps) => (flex ? flex : '1')};
  text-align: ${({ textAlign }: ContainerProps) =>
    textAlign ? textAlign : 'left'};
  padding-top: ${({ paddingTop }: ContainerProps) =>
    paddingTop ? paddingTop : 'unset'};

  @media (min-width: 320px) and (max-width: 480px) {
    height: 132px;
  }
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 15px;
  font-weight: 600;
  text-transform: ${({ capitalize }: TextProps) =>
    capitalize ? 'capitalize' : 'none'}
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const Span = styled.a`
  color: #fff;
  &:hover {
    border-bottom: 1px solid red;
    cursor: pointer;
    color: #fff;
  }
`
