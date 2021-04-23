/**
 * Styled Components - Created by david on 26/02/18.
 */
import styled from 'styled-components'
import { WHITE } from '../../../theme/colors'

export const Container = styled.div`
  background-color: ${WHITE};
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.12), 0 0px 2px rgba(0, 0, 0, 0.24);
  height: 80vh;
  overflow-y: scroll;
  /* max-width: 400px; */
  padding-bottom: 32px;
  width: 25.4%;
  z-index: 1;

  & .ant-tabs-nav .ant-tabs-tab {
    margin: 0 8px;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    width: 35%;
  }

  @media only screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) {
    width: 28%;
  }

  @media (min-height: 800px) {
    height: 85vh;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    & .ant-tabs-tab-prev,
    & .ant-tabs-tab-next {
      display: none;
    }
    & .ant-tabs-nav-container {
      overflow: initial;
      padding: 25px 0px;
      white-space: initial;
    }
    & .ant-tabs-nav {
      display: flex;
      justify-content: space-between;
    }
    & .ant-tabs-nav .ant-tabs-tab {
      margin: 0px;
      padding: 0px;
    }
  }
`
