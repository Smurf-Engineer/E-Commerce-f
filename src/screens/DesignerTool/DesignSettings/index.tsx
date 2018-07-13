/**
 * DesignSettings Component - Created by david on 12/07/18.
 */
import * as React from 'react'
import {
  Container,
  Form,
  Title,
  Subtitle,
  Input,
  Button
} from './styledComponents'
import DesignForm from '../../../components/DesignForm'

interface Props {}

class DesignSettings extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Container>
        <Form>
          <Title>SEARCH PRODUCT</Title>
          <Subtitle>Product Code</Subtitle>
          <Input />
          <Button>Search</Button>
          <DesignForm
            title="SELECT THEME"
            subtitle="Themes"
            buttonLabel="ADD NEW THEME"
          />
          <Button type="primary">Save</Button>
        </Form>
      </Container>
    )
  }
}

export default DesignSettings
