/**
 * Styled Components - Created by miguelcanobbio on 18/07/18.
 */
import styled from 'styled-components'
interface DivProps {
  clickable?: boolean
  maxWidth?: boolean
}

export const Container = styled.div`
  margin: 8px;
  padding: 8px;
  border: 1px dashed #cccccc;
`
export const ImageBox = styled.img`
  object-fit: contain;
  cursor: ${({ clickable }: DivProps) => (clickable ? 'pointer' : 'default')}
  height: 200px;
  width: ${({ maxWidth }: DivProps) => (maxWidth ? 'unset' : '200px')};
`
export const MediaFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`
export const FileName = styled.div`
  display: inline-block;
  font-weight: bold;
  max-width: 70px;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
`
export const FileExtension = styled.div`
  display: inline-block;
  font-weight: bold;
  vertical-align: top;
`
export const DeleteFile = styled.div`
  height: 17px;
  width: 50px;
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
  cursor: pointer;
`
