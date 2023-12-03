// src/pages/index.tsx
import React from 'react';
import Search from '../components/Search';
import { useGeolocation } from '../hooks/useGeolocation';

const Home = () => {
  useGeolocation(); // This will trigger geolocation on the home page load

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Search />
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  return { hideFooter: true };
};

export default Home;
