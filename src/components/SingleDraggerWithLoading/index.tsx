/**
 * SingleDraggerWithLoading Component - Created by eduardoquintero on 25/09/19.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Spin from 'antd/lib/spin'
import messages from './messages'
import { DragTypes, Container, StyledDragger } from './styledComponents'

interface Props {
  loading: boolean
  extensions?: string[]
  onSelectImage: (file: any) => boolean
  className?: string
  formatMessage: (messageDescriptor: any, extensions: any) => string
}

class SingleDraggerWithLoading extends React.PureComponent<Props, {}> {
  static defaultProps = {
    extensions: ['.png']
  }
  render() {
    const { onSelectImage, loading, className } = this.props
    return (
      <StyledDragger
        beforeUpload={onSelectImage}
        multiple={false}
        disabled={loading}
        showUploadList={false}
        supportServerRender={true}
        className={className}
      >
        {loading ? (
          <Container>
            <Spin />
          </Container>
        ) : (
          <div>
            <DragTypes>
              <FormattedMessage {...messages.title} />
            </DragTypes>
          </div>
        )}
      </StyledDragger>
    )
  }
}

export default SingleDraggerWithLoading
