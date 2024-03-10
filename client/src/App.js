import { ConfirmModal, LazyLoading, NavigationScroll, ScrollToTop, Toastify } from './components/base';
import Routes from './routes';

const App = () => {
  return (
    <>
      <ConfirmModal />
      <Toastify />
      <ScrollToTop />
      <LazyLoading />
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </>
  );
};

export default App;
