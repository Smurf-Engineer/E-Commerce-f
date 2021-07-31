/**
 * Styled Components - Created by miguelcanobbio on 25/07/18.
 */
import styled from 'styled-components'
import { GRAY_SKELETON } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: ${GRAY_SKELETON};
  margin-left: 20px;
  flex: 1;
  border-radius: 3px;
  margin-right: 36px;
  padding: 10px;
  @media (min-width: 388px) and (max-width: 467px) {
    width: 180px;
  }

  @media (min-width: 320px) and (max-width: 387px) {
    width: 145px;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    width: 98%;
    margin: 14px 0;
    flex-direction: column;
  }
`

export const Tile = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 16px;
  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 16px;
  }
  &:last-child {
    margin-right: 0px;
    margin-bottom: 0px;
  }
`

export const TileImage = styled.img`
  height: 30px;
  object-fit: contain;
  margin-right: 10px;
`

export const TileText = styled.div``

export const TileTitle = styled.div`
  font-weight: bold;
  font-size: 13px;
`

export const TileSubTitle = styled.div`
  font-size: 11px;
`
