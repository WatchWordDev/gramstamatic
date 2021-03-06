import { useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';
import useUser from '../utils/hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import PropTypes from 'prop-types';

export default function Dashboard( { user: activeUser }) {
  const user = useUser(activeUser.uid);

  useEffect(() => {
    document.title = 'Gramstamatic';
  }, []);

  return(
    <LoggedInUserContext.Provider value={{ user }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-4 lg:px-0">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
}
