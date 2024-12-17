import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import { MAX_TYPE } from '../config';

interface Props {
  onTestClick: () => void;
}

function PageHeader(props: Props) {
  const location = useLocation();
  const pathsWithNavigation = [
    '/',
    '/search',
    ...Array.from({ length: MAX_TYPE }, (_, i) => `/${i + 1}`),
  ];

  return (
    <header>{pathsWithNavigation.includes(location.pathname) && <Navigation {...props} />}</header>
  );
}

export default PageHeader;
