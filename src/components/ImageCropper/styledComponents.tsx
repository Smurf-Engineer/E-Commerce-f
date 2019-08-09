/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import styled from 'styled-components'
import { BLUE } from '../../theme/colors'

interface DivProps {
  selected?: boolean
}
export const Text = styled.div`
  font-size: 11px;
  color: darkgray;
  width: 100%;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 18px;
`
export const SaveButton = styled.div`
  max-width: 64px;
  background: ${BLUE};
  color: white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 0px 2px 4px -1px #696969;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: ${BLUE};
    background: white;
  }
`

export const AspectSection = styled.div`
  position: relative;
  z-index: 1;
  display: inline-flex;
  flex-flow: row;
  font-size: 10px;
  width: 100%;
  justify-content: center;
`

export const AspectButton = styled.div`
  max-width: 50px;
  border: ${({ selected }: DivProps) =>
    selected ? '1px solid lightslategray' : '1px solid transparent'};
  margin-right: 8px;
  width: 100%;
  text-align: center;
  border-radius: 3px;
  padding: 1px 0;
  color: lightslategray;
  cursor: pointer;
`

export const CropperContainer = styled.div`
  height: 50vh;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 40px;
  border: 2px dashed #efefef;
`
