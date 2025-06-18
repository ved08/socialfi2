// entrypoint.js

// Import required polyfills first
// IMPORTANT: These polyfills must be installed in this order
import "react-native-get-random-values";

import 'react-native-get-random-values';

import { Buffer } from 'buffer';

global.Buffer = Buffer;

import "@ethersproject/shims";
// Then import the expo router
import "expo-router/entry";
