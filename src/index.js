import React, {Component} from 'react';
import '~/config/ReactotronConfig';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
// import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import {store, persistor} from '~/store';

import App from '~/App';

export default class Index extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('a35ae99b-ed62-4ff4-9ec2-960b94b91013');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (data) => {};

  onOpened = (data) => {};

  onIds = (data) => {};

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

// export default CodePush({
//   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
// })(Index);
