/**
 * @format
 */

// IMPORTANT: Import polyfills first before anything else
import './hermes-polyfills';
import './polyfills';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
