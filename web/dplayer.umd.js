import React from 'react';
import ReactDOM from 'react-dom';
import { DPlayer } from '../src/index';

export function createPlayer(target) {
  return {
    render(props) {
      ReactDOM.render(<DPlayer {...props} />, target);
    },
    dispose() {
      ReactDOM.unmountComponentAtNode(target);
    },
  };
}
