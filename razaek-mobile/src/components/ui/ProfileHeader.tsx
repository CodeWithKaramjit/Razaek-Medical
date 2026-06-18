import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, radius, spacing, typography } from '../../theme/tokens';

type ProfileHeaderProps = {
  name: string;
  role: string;
  onNotificationPress: () => void;
};

export function ProfileHeader({
  name,
  role,
  onNotificationPress,
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MM</Text>
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onNotificationPress}
        style={({ pressed }) => [styles.notificationButton, pressed && styles.pressed]}
        testID="notification-button"
      >
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <Path
            d="M15.6 17.2H8.4C7.4 17.2 6.78 16.14 7.26 15.26L8.2 13.56C8.42 13.16 8.54 12.7 8.54 12.24V10.56C8.54 8.62 10.08 7.04 12 7.04C13.92 7.04 15.46 8.62 15.46 10.56V12.24C15.46 12.7 15.58 13.16 15.8 13.56L16.74 15.26C17.22 16.14 16.6 17.2 15.6 17.2Z"
            stroke={colors.textPrimary}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M10.6 18.8C10.86 19.52 11.38 20 12 20C12.62 20 13.14 19.52 13.4 18.8"
            stroke={colors.textPrimary}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </Svg>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
  },
  name: {
    ...typography.title,
  },
  role: {
    ...typography.subtitle,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },
});
