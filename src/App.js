import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Uploader from './Uploader';

function App({ store, persistor }) {

  return (
  <Provider store={store, persistor}>
    <PersistGate persistor={persistor}>
      <Uploader />
      {/* <FileList /> */}
    </PersistGate>
  </Provider>
  );
}

export default App;
