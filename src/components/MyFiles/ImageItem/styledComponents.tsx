/**
 * Styled Components - Created by miguelcanobbio on 25/07/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  position: relative;
  @media (min-width: 388px) and (max-width: 467px) {
    width: 180px;
  }

  @media (min-width: 320px) and (max-width: 387px) {
    width: 145px;
  }
`

export const Image = styled.img`
  width: 220px;
  height: 220px;
  object-fit: contain;
  background-color: #f1f4f5;

  @media (min-width: 388px) and (max-width: 467px) {
    width: 180px;
    height: 180px;
  }
  @media (min-width: 320px) and (max-width: 387px) {
    width: 145px;
    height: 145px;
  }
`

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`

export const Name = styled.div`
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  margin-right: 4px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (min-width: 320px) and (max-width: 467px) {
    font-size: 14px;
  }
`

export const Delete = styled.div`
  color: #e61737;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
  cursor: pointer;
`

export const LowQualityIcon = styled.img`
  position: absolute;
  width: 50px;
  right: 5px;
  top: 5px;
`
