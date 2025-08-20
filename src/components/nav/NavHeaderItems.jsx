import { Link as RouterLink } from 'react-router';

export const NavHeaderItems = ({ routesInHeader, currentPath }) => (
  <>
    {routesInHeader.map(({ path, carbon }) =>
      !carbon.inSubMenu && carbon?.label ? (
        carbon.subMenu ? (
          <HeaderMenu
            aria-label={carbon.label}
            key={path}
            menuLinkName={carbon.label}
          >
            {carbon.subMenu.map((subRoute) => (
              <HeaderMenuItem
                as={RouterLink}
                to={subRoute.path}
                key={subRoute.path}
                isActive={subRoute.path === currentPath}
              >
                {subRoute.carbon.label}
              </HeaderMenuItem>
            ))}
          </HeaderMenu>
        ) : (
          <HeaderMenuItem
            as={RouterLink}
            key={path}
            to={path}
            isActive={path === currentPath}
          >
            {carbon?.label}
          </HeaderMenuItem>
        )
      ) : null,
    )}
  </>
);
