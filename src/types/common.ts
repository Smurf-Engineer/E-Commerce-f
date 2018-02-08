/**
 * Global types
 */

export interface QueryProps {
  error?: any
  networkStatus?: number
  loading?: boolean
  variables?: any
  fetchMore: any
  refetch?: any
  updateQuery?: any
}

export interface Action {
  type: string
}

export interface AnyAction extends Action {
  [extraProps: string]: any
}

export type Reducer<S> = (state: S, action: AnyAction) => S

// Mouse Click Events

export interface SyntheticMouseEventTarget extends EventTarget {
  id: string
}

export interface SyntethicEventMouse extends React.MouseEvent<HTMLElement> {
  target: SyntheticMouseEventTarget
}
