/**
 * ImageCropper Styled Components - Created by Jesus Apodaca on 08/08/19.
 */
import styled from 'styled-components'
import { BLUE } from '../../theme/colors'

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

export const CropperContainer = styled.div`
  height: 50vh;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 40px;
  border: 2px dashed #efefef;
`

export const Loader = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: #ffffffb0;
`
