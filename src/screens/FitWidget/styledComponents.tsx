/**
 * Styled Components - Created by gustavomedina on 27/03/18.
 */
import styled from 'styled-components'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'

const { SubMenu } = Menu
const { Content, Sider } = Layout

export const Container = styled.div`
  background: #fff;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const Text = styled.div`
  box-sizing: border-box;
  height: 61.89px;
  width: 372.5px;
  border: 0.5px solid #dcdcdc;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  padding: 10px;
`

export const UserText = styled.div`
  box-sizing: border-box;
  height: 40px;
  width: 93px;
  border: 0.5px solid #dcdcdc;
  border-radius: 2px;
  background-color: #4a90e2;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  padding: 10px;
  float: right;
  color: #fff;
`
export const StyledSubMenu = styled(SubMenu)`
  position: absolute;
  bottom: 0;
`

export const StyledSubMenuInner = styled.span`
  height: 25px;
  width: 169px;
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
`
export const StyledContent = styled(Content)`
  margin: 2px;
  background: #fff;
  height: 100%;
  max-height: 100vh;
`

export const StyledContentInner = styled.div`
  background: #fff;
  height: 100%;
  max-height: 100vh;
`

export const StyledSider = styled(Sider)`
  background: #fff;
  margin-top: 2px;
`

export const StyledSiderInner = styled.div`
  height: 75px;
  width: 221px;
  color: #5f6062;
  margin: 8px;
  font-size: 18px;
  font-weight: 60;
  line-height: 25px;
`

export const StyledList = styled.ul`
  background: #fff;
  padding: 24px;
`

export const overStyle = {
  minHeight: '100vh'
}

export const menuStyle = {
  position: 'absolute',
  bottom: 0
} as React.CSSProperties
