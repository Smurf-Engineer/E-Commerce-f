/**
 * Global types
 */

export interface Action {
  type: any
}

export interface AnyAction extends Action {
  [extraProps: string]: any
}

export type Reducer<S> = (state: S, action: AnyAction) => S
