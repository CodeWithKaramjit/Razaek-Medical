import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavIcon, BottomTab } from '../icons/NavIcons';
import { colors, radius, spacing, typography } from '../../theme/tokens';

type BottomNavBarProps = {
  activeTab: BottomTab;
  onTabPress: (tab: BottomTab) => void;
};

type TabConfig = {
  tab: BottomTab;
  label: string;
};

const tabs: TabConfig[] = [
  { tab: 'home', label: 'Home' },
  { tab: 'bookings', label: 'Bookings' },
  { tab: 'profile', label: 'Profile' },
];

export function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map(item => {
          const focused = item.tab === activeTab;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
              key={item.tab}
              onPress={() => onTabPress(item.tab)}
              style={({ pressed }) => [
                styles.tab,
                focused && styles.focusedTab,
                pressed && styles.pressed,
              ]}
              testID={`nav-tab-${item.tab}`}
            >
              <NavIcon tab={item.tab} focused={focused} />
              <Text style={[styles.tabLabel, focused && styles.focusedLabel]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
  },
  tabLabel: {
    ...typography.label,
    marginTop: spacing.xxs,
  },
  focusedLabel: {
    color: colors.primary,
  },
  focusedTab: {
    backgroundColor: '#EDF4FF',
  },
  pressed: {
    opacity: 0.8,
  },
});
