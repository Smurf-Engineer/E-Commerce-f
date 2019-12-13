/**
 * Styled Components - Created by Jesús Apodaca on 04/12/19.
 */
import styled from 'styled-components'
import AntdTabs from 'antd/lib/tabs'

export const Container = styled.div`
  background-color: #fff;
  width: 400px;
  height: calc(100vh - 109px);
  overflow: auto;
  z-index: 1;
`

export const NavTabs = styled(AntdTabs)`
  .ant-tabs-nav-scroll {
    text-align: center;
  }
`
