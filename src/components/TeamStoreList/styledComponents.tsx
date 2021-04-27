/**
 * Styled Components - Created by cazarez on 11/04/18.
 */
import styled from 'styled-components'
import { GRAY_DARK } from '../../theme/colors'
import { WHITE } from '../../screens/DesignerTool/constants'
import InfiniteScroll from 'react-infinite-scroller'

export const Container = styled.div`
  background-color: ${WHITE};
  display: flex;
  justify-content: center;
  margin-top: 42px;
  flex-flow: column;
  align-items: center;
  flex-wrap: wrap;
`

export const Text = styled.div`
  color: ${WHITE};
`

export const ListContainer = styled.div`
  width: 100%;
  max-width: 1340px;
  max-height: 600px;
  overflow-y: scroll;
  @media (max-width: 1648px) {
    max-width: 1220px;
  }
  @media (max-width: 1375px) {
    max-width: 1100px;
  }
  @media (max-width: 1224px) {
    max-width: 960px;
  }
  @media (max-width: 1224px) {
    max-width: 890px;
  }
  @media (max-width: 914px) {
    justify-content: center;
  }
`

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const LoadingContainer = styled.div`
  display: flex;
  height: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`

export const InitialLoadingContainer = styled.div`
  height: 256px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TeamStoreContainer = styled.div`
  width: auto;
  @media (max-width: 480px) {
    width: 100%;
  }
`

export const Notfound = styled.div`
  height: 45px;
  width: 100%;
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-align: center;
`
