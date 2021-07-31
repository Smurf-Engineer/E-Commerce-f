/**
 * Styled Components - Created by miguelcanobbio on 25/07/18.
 */
import styled from 'styled-components'
import { GRAY_LIGHT } from '../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: ${GRAY_LIGHT};
  margin-bottom: 20px;
  margin-left: 30px;
  padding: 0px 3px;
  border-radius: 5px;

  @media (min-width: 388px) and (max-width: 467px) {
    width: 180px;
  }

  @media (min-width: 320px) and (max-width: 387px) {
    width: 145px;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    width: 98%;
    margin: 1%;
    flex-direction: column;
    padding: 5px 3px;
  }
`

export const Tile = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 10px;
`

export const TileImage = styled.img`
  height: 35px;
  object-fit: contain;
  margin-right: 10px;
`

export const TileText = styled.div`
  padding-top: 4px;
`

export const TileTitle = styled.div`
  font-weight: bold;
`

export const TileSubTitle = styled.div`
  font-size: 11px;
`
