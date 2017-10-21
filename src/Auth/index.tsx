import * as React from 'react';
import { observer } from 'mobx-react';
import authStore from './Store';
import { login } from './Utils';

@observer
export default class Auth extends React.Component<{children?: any}, {}> {

  componentWillMount() {
    if (!authStore.isAuthenticated) login();
  }

  render(): JSX.Element {
    return authStore.isAuthenticated ? this.props.children : null;
  }
}
