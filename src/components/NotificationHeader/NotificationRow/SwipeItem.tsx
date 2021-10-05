import * as React from 'react'
import {
  SwipeItemLi,
  SwipeItemContent
} from './styledComponents'

interface Props {
  actionButtonOffset: number
  actionButton: React.ReactElement<any>
  onClick: () => void
}

interface State {
  left: number,
  originalOffset: number,
  velocity: number,
  timeOfLastDragEvent: number,
  touchStartX: number,
  prevTouchX: number,
  beingTouched: boolean,
  height: number,
  intervalId?: any,
  actionButtonOffset: number
}

export class SwipeItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      left: 0,
      originalOffset: 0,
      velocity: 0,
      timeOfLastDragEvent: 0,
      touchStartX: 0,
      prevTouchX: 0,
      beingTouched: false,
      height: 0,
      intervalId: null,
      actionButtonOffset: props.actionButtonOffset || 0
    }
  }

  componentDidMount() {
    window.setTimeout(() => this.setState({ height: 91 }), 50)
  }

  animateSlidingToZero() {
    let { left, velocity, beingTouched, actionButtonOffset } = this.state
    if (!beingTouched && left < -0.01) {
      velocity += 10 * 0.033
      left += velocity
      if (left < -350) {
        window.clearInterval(this.state.intervalId)
        if (actionButtonOffset) {
          left = -actionButtonOffset
        } else {
          this.handleRemoveSelf()
        }
      }
      if ((-actionButtonOffset - velocity) <= left && left <= -actionButtonOffset) {
        window.clearInterval(this.state.intervalId)
        this.setState({ left: -actionButtonOffset, velocity })
      } else {
        this.setState({ left, velocity })
      }
    } else if (!beingTouched) {
      window.clearInterval(this.state.intervalId)
      if ((-actionButtonOffset - velocity) <= left && left <= -actionButtonOffset) {
        left = -actionButtonOffset
      } else {
        left = 0
      }
      velocity = 0
      this.setState({ left, velocity, intervalId: null, originalOffset: 0 })
    }
  }

  handleRemoveSelf() {
    // this.setState({ height: 0 })
    // window.setTimeout(() => this.props.onRemoval(), 250)
  }

  handleStart(clientX: number) {
    if (this.state.intervalId !== null) {
      window.clearInterval(this.state.intervalId)
    }
    this.setState({
      originalOffset: this.state.left,
      velocity: 0,
      timeOfLastDragEvent: Date.now(),
      touchStartX: clientX,
      beingTouched: true,
      intervalId: null
    })
  }

  handleMove(clientX: number) {
    if (this.state.beingTouched) {
      const touchX = clientX
      const currTime = Date.now()
      const elapsed = currTime - this.state.timeOfLastDragEvent
      const velocity = 20 * (touchX - this.state.prevTouchX) / elapsed
      let deltaX = touchX - this.state.touchStartX + this.state.originalOffset
      if (deltaX < -350) {
        this.handleRemoveSelf()
      } else if (deltaX > 0) {
        deltaX = 0
      }
      this.setState({
        left: deltaX,
        velocity,
        timeOfLastDragEvent: currTime,
        prevTouchX: touchX
      })
    }
  }

  handleEnd() {
    this.setState({
      velocity: this.state.velocity,
      touchStartX: 0,
      beingTouched: false,
      intervalId: window.setInterval(this.animateSlidingToZero.bind(this), 33)
    })
  }

  handleTouchStart(touchStartEvent: React.TouchEvent) {
    // touchStartEvent.preventDefault()
    this.handleStart(touchStartEvent.targetTouches[0].clientX)
  }

  handleTouchMove(touchMoveEvent: React.TouchEvent) {
    this.handleMove(touchMoveEvent.targetTouches[0].clientX)
  }

  handleTouchEnd() {
    this.handleEnd()
  }

  handleMouseDown(mouseDownEvent: React.MouseEvent) {
    // mouseDownEvent.preventDefault()
    this.handleStart(mouseDownEvent.clientX)
  }

  handleMouseMove(mouseMoveEvent: React.MouseEvent) {
    this.handleMove(mouseMoveEvent.clientX)
  }

  handleMouseUp() {
    this.handleEnd()
  }

  handleMouseLeave() {
    this.handleMouseUp()
  }

  handleOnClick() {
    const { onClick } = this.props
    const { left } = this.state
    if (left === 0) {
      onClick()
    }
  }

  render() {
    const { actionButton } = this.props
    return (
      <SwipeItemLi
        className="swipeItem"
        style={{ height: this.state.height + 'px', transition: 'height 250ms ease-in-out' }}
        onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
        onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
        onTouchEnd={() => this.handleTouchEnd()}
        // The following event handlers are for mouse compatibility:
        onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
        onMouseMove={mouseMoveEvent => this.handleMouseMove(mouseMoveEvent)}
        onMouseUp={() => this.handleMouseUp()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <SwipeItemContent
          className="swipeItem-content"
          style={{ left: this.state.left + 'px' }}
          onClick={() => this.handleOnClick()}
        >
          {this.props.children}
        </SwipeItemContent>
        {actionButton}
      </SwipeItemLi>
    )
  }
}