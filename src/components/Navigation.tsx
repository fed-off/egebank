import { NavLink } from 'react-router-dom';
import { MAX_TYPE } from '../config';

interface Props {
  onTestClick: () => void;
}

function Navigation({ onTestClick }: Props) {
  const navNavLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return (
      (isActive ? 'shadow-[0px_0px_10px_5px_rgba(0,0,0,0.3)]' : '') +
      ' min-w-11 text-center block text-inherit no-underline p-2 bg-white text-lg hover:bg-opacity-50 focus-visible:bg-opacity-50 active:bg-opacity-25'
    );
  };

  return (
    <nav className="flex gap-2 mx-auto w-fit">
      <NavLink to="/" className={navNavLinkClasses} onClick={onTestClick}>
        Тест
      </NavLink>
      <ul className="flex list-none m-0 p-0 gap-2">
        {Array.from({ length: MAX_TYPE }, (_, i) => i + 1).map((i) => (
          <li key={i}>
            <NavLink to={`/${i}`} className={navNavLinkClasses}>
              {i}
            </NavLink>
          </li>
        ))}
      </ul>
      <NavLink to="/search" className={navNavLinkClasses}>
        Поиск
      </NavLink>
    </nav>
  );
}

export default Navigation;
