import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch  } from 'react-redux';
import { scrollHeader } from "./store/store-page";
import FooterComponent from './Components/Component/Footer-Component/Footer-Component';

function App() {
  const dispatch = useDispatch();

  const scrollHandler = (event) => {
    if(window.scrollY > 150) {
      dispatch(scrollHeader({scroll: true}));

    } else {
      dispatch(scrollHeader({scroll: false}));

    }

  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }, [])

  return (
      <div>
        <Outlet />
        <FooterComponent />
      </div>
  );
}

export default App;
