import * as React from 'react';

export class ToggleCore extends React.Component<ToggleCoreProps> {
  initialState: ToggleCoreState = {
    isOn: false
  };
  state: ToggleCoreState = this.initialState;

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState((state: ToggleCoreState) => ({ isOn: !state.isOn }));
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      handleToggle: this.handleToggle
    });
  }
}

export interface ToggleCoreProps {
  children: (props) => React.ReactChildren;
}

export interface ToggleCoreState {
  isOn: boolean;
}
