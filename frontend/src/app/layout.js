import { Provider } from 'react-redux';
import { wrapper } from '../store';
export default function RootLayout({ children }) {
    const store = wrapper.useWrappedStore().store;
  return (
    <html lang="en">
      <body >
           <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
