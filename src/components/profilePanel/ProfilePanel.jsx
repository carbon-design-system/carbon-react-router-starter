/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './profile-panel.scss';
import { UserAvatar } from '@carbon/ibm-products';
import {
  ThemeSettings,
  ThemeMenuComplement,
  ThemeSwitcher,
} from '@carbon-labs/react-theme-settings';
import { useThemeContext } from '../../context/ThemeContext';

export const ProfilePanel = ({ className }) => {
  const {
    themeSetting,
    setThemeSetting,
    themeMenuCompliment,
    setThemeMenuCompliment,
  } = useThemeContext();

  const userProfile = {
    name: 'Anne Profile',
    email: 'anne.profile@ibm.com',
  };

  return (
    <div className={classNames(className, 'cs--profile-panel')}>
      <div className="cs--profile-user-info">
        <UserAvatar
          name={userProfile.name}
          renderIcon=""
          size="lg"
          tooltipAlignment="bottom"
        />
        <div className="cds--profile-user-info__text-wrapper">
          <div className="cds--profile-user-info__name">{userProfile.name}</div>
          <div className="cds--profile-user-info__email">
            {userProfile.email}
          </div>
        </div>
      </div>

      <div className="cs--profile-settings">
        <ThemeSettings>
          <ThemeSwitcher
            onChange={(value) => setThemeSetting(value)}
            value={themeSetting}
          ></ThemeSwitcher>
          <ThemeMenuComplement
            id="theme-menu-complement"
            labelText="Complement menu theme"
            checked={themeMenuCompliment}
            onChange={(value) => setThemeMenuCompliment(value)}
          />
        </ThemeSettings>
      </div>
    </div>
  );
};

ProfilePanel.propTypes = {
  className: PropTypes.string,
};

export default ProfilePanel;
