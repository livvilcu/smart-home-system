import React from 'react';
import {theme} from "./src/core/theme";
import { Provider } from 'react-native-paper';
import Navigation from "./src/navigation";

const Main = () => (
    // Default theme provided to components by using a Provider component
      <Provider theme={theme}>
          <Navigation />
      </Provider>

);

export default Main;
