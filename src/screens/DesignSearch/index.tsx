/**
 * DesignSearch Screen - Created by miguelcanobbio on 15/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Search from 'antd/lib/input/Search'
import * as designSearchActions from './actions'
import messages from './messages'
import {
  Container,
  Header,
  LogoIcon,
  DesignerLink,
  Content,
  Title,
  ContentHeader,
  Subtitle
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'

interface Props {
  history: any
}

export class DesignSearch extends React.Component<Props, {}> {
  render() {
    console.log(this.props)
    return (
      <Container>
        <Header>
          <ContentHeader>
            <LogoIcon src={logo} />
            <DesignerLink onClick={this.goToDesignerTool}>
              <FormattedMessage {...messages.designerTool} />
            </DesignerLink>
          </ContentHeader>
        </Header>
        <Content>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Subtitle>
            <FormattedMessage {...messages.addCode} />
          </Subtitle>
          <Search
            placeholder="Product Code"
            onSearch={value => console.log(value)}
            enterButton={true}
            size="large"
          />
        </Content>
      </Container>
    )
  }

  goToDesignerTool = () => {
    const { history } = this.props
    history.push('designer-tool')
  }
}

const mapStateToProps = (state: any) => state.get('designSearch').toJS()

const DesignSearchEnhance = compose(
  connect(
    mapStateToProps,
    { ...designSearchActions }
  )
)(DesignSearch)

export default DesignSearchEnhance
