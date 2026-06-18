import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../../theme/tokens';

export type BottomTab = 'home' | 'bookings' | 'profile';

type NavIconProps = {
  tab: BottomTab;
  focused: boolean;
  size?: number;
};

const strokeForState = (focused: boolean) =>
  focused ? colors.primary : colors.textSecondary;

export function NavIcon({ tab, focused, size = 22 }: NavIconProps) {
  const stroke = strokeForState(focused);

  switch (tab) {
    case 'home':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M4 10.5L12 4L20 10.5V19C20 19.6 19.6 20 19 20H5C4.4 20 4 19.6 4 19V10.5Z"
            stroke={stroke}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M9 20V14.8C9 14.36 9.36 14 9.8 14H14.2C14.64 14 15 14.36 15 14.8V20"
            stroke={stroke}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case 'bookings':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect
            x={4}
            y={5}
            width={16}
            height={15}
            rx={3}
            stroke={stroke}
            strokeWidth={1.8}
          />
          <Path
            d="M8 3.8V7"
            stroke={stroke}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <Path
            d="M16 3.8V7"
            stroke={stroke}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <Path
            d="M4 9.5H20"
            stroke={stroke}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </Svg>
      );

    case 'profile':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx={12} cy={8.3} r={3.3} stroke={stroke} strokeWidth={1.8} />
          <Path
            d="M5 19C5.7 16.2 7.8 14.6 12 14.6C16.2 14.6 18.3 16.2 19 19"
            stroke={stroke}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </Svg>
      );

    default:
      return null;
  }
}
