/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import { useState, FC } from 'react';

import './profile-panel.scss';
import { UserAvatar } from '@carbon/ibm-products';
import {
  ThemeSettings,
  ThemeMenuComplement,
  ThemeSwitcher,
} from '@carbon-labs/react-theme-settings';
import {
  getThemeSettings,
  setThemeSetting as updateThemeSetting,
  setHeaderInverse as updateHeaderInverse,
} from '../../utils/theme';
import type { ThemeSetting } from '../../types/theme';

interface ProfilePanelProps {
  className?: string;
}

export const ProfilePanel: FC<ProfilePanelProps> = ({ className }) => {
  // Get initial values from cookies (single call to avoid redundant parsing)
  const initialSettings = getThemeSettings();

  const [themeSetting, setThemeSettingState] = useState<ThemeSetting>(
    initialSettings.themeSetting,
  );

  const [themeMenuComplement, setThemeMenuComplementState] = useState<boolean>(
    initialSettings.headerInverse,
  );

  // Update theme setting
  const handleThemeSettingChange = (value: ThemeSetting): void => {
    setThemeSettingState(value);
    updateThemeSetting(value);
  };

  // Update header inverse
  const handleThemeMenuComplementChange = (value: boolean): void => {
    setThemeMenuComplementState(value);
    updateHeaderInverse(value);
  };

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
            onChange={handleThemeSettingChange}
            value={themeSetting}
          ></ThemeSwitcher>
          <ThemeMenuComplement
            id="theme-menu-complement"
            labelText="Complement menu theme"
            checked={themeMenuComplement}
            onChange={handleThemeMenuComplementChange}
          />
        </ThemeSettings>
      </div>
    </div>
  );
};

export default ProfilePanel;

// Made with Bob
