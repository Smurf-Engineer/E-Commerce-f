/**
 * SingleDraggerWithLoading Component - Created by eduardoquintero on 25/09/19.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import {
  DragTypes,
  Container,
  StyledDragger,
  StyledSpin
} from './styledComponents'

interface Props {
  loading: boolean
  extensions?: string[]
  className?: string
  fileName?: string
  onSelectImage: (file: any) => boolean
  formatMessage: (messageDescriptor: any, extensions: any) => string
}

class SingleDraggerWithLoading extends React.PureComponent<Props, {}> {
  static defaultProps = {
    extensions: ['.png']
  }
  render() {
    const { onSelectImage, loading, className, fileName } = this.props
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
            <StyledSpin />
          </Container>
        ) : (
          <div>
            <DragTypes>
              {fileName || <FormattedMessage {...messages.title} />}
            </DragTypes>
          </div>
        )}
      </StyledDragger>
    )
  }
}

export default SingleDraggerWithLoading
