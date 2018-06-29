/**
 * SymbolTab Component - Created by david on 28/06/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import withLoading from '../../WithLoading'
import WithError from '../../WithError'
import SwipeableViews from 'react-swipeable-views'
import { QueryProps, ClipArt } from '../../../types/common'
import { clipArtsQuery } from './data'
import messages from './messages'
import backIcon from '../../../assets/leftarrow.svg'
import {
  Container,
  Header,
  Title,
  Input,
  InputWrapper,
  Button,
  Row,
  ArrowIcon,
  RowList,
  Col,
  List,
  Icon
} from './styledComponents'

interface Data extends QueryProps {
  clipArts: ClipArt[]
}

interface Props {
  data: Data
  onApplyArt: (url: string) => void
}

class SymbolTab extends React.PureComponent<Props, {}> {
  state = {
    option: 0,
    page: 0
  }
  render() {
    const { page } = this.state
    const { data: { clipArts } } = this.props

    const artList = clipArts.map(({ id, url }) => (
      <Col key={id}>
        <Icon src={url} onClick={this.handleOnApplyArt(url)} />
      </Col>
    ))

    return (
      <Container>
        <Header>
          <Row onClick={this.changePage(0, 0)}>
            {!!page && <ArrowIcon src={backIcon} />}
            <Title>
              <FormattedMessage {...messages.headerTitle} />
            </Title>
          </Row>
        </Header>
        <SwipeableViews index={page}>
          <div>
            <InputWrapper>
              <Input
                // value={text}
                // onChange={this.handleOnUpdateText}
                placeholder="Search Symbol Library"
                addonAfter={<Button onClick={() => {}}>Search</Button>}
              />
            </InputWrapper>
            <List height={50}>
              <RowList>{artList}</RowList>
            </List>
          </div>
          <div>FILL</div>
        </SwipeableViews>
      </Container>
    )
  }

  changePage = (page: number, option: number) => () =>
    this.setState({ page, option })

  handleOnApplyArt = (url: string) => () => {
    const { onApplyArt } = this.props
    onApplyArt(url)
  }
}

const SymbolTabEnhance = compose(clipArtsQuery, WithError, withLoading)(
  SymbolTab
)

export default SymbolTabEnhance
