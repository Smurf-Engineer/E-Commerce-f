/**
 * Styled Components - Created by miguelcanobbio on 18/07/18.
 */
import styled from 'styled-components'
interface DivProps {
  capitalize?: boolean
  upperCase?: boolean
  inline?: boolean
  marginTop?: string
  big?: boolean
  maxWidth?: boolean
  marginBottom?: string
}
export const Text = styled.div`
  color: #fff;
`
export const Container = styled.div`
  margin-bottom: 30px;
`
export const Label = styled.div`
  margin-top: ${({ marginTop }: DivProps) => (marginTop ? marginTop : 'unset')};
  margin-bottom: ${({ marginBottom }: DivProps) =>
    marginBottom ? marginBottom : '10px'};
  text-transform: ${({ upperCase }: DivProps) =>
    upperCase ? 'uppercase' : 'unset'};
`

export const ImageBlock = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 8px;
`
export const ImageBox = styled.img`
  object-fit: contain;
  height: 200px;
  width: ${({ maxWidth }: DivProps) => (maxWidth ? 'unset' : '200px')};
`
export const EmptyBox = styled.div`
  height: 200px;
  width: ${({ big }: DivProps) => (big ? '600px' : '200px')}
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  flex-flow: column;
  font-size: 18px;
  padding-top: 38px;
  color: #bebebe;`

export const Loader = styled.div`
  width: 200px;
  height: 200px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`
