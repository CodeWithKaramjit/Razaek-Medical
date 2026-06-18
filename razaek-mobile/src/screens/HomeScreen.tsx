import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, radius, typography } from '../theme/tokens';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const specialties = [
  { id: '1', name: 'Cardiology', icon: '❤️', description: 'Heart treatments & surgeries' },
  { id: '2', name: 'Orthopedics', icon: '🦴', description: 'Joint & bone replacement' },
  { id: '3', name: 'Oncology', icon: '🎗️', description: 'Advanced cancer therapies' },
  { id: '4', name: 'IVF & Fertility', icon: '👶', description: 'Reproductive medicine' },
  { id: '5', name: 'Cosmetic Surgery', icon: '✨', description: 'Reconstructive procedures' },
];

const packages = [
  { id: 'p1', name: 'Knee Replacement', specialty: 'Orthopedics', duration: '12 Days', price: '$5,200', tier: 'Standard' },
  { id: 'p2', name: 'Heart Bypass (CABG)', specialty: 'Cardiology', duration: '15 Days', price: '$8,500', tier: 'Premium' },
  { id: 'p3', name: 'Chemotherapy Plan', specialty: 'Oncology', duration: '21 Days', price: '$4,100', tier: 'Basic' },
];

export function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Welcome to India,</Text>
            <Text style={styles.patientName}>Guest Patient</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>
        </View>

        {/* Brand Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Hassle-Free Medical Travel</Text>
          <Text style={styles.bannerSubtitle}>Consultations, Visas, Hotels & Recovery in One Click.</Text>
        </View>

        {/* Specialties Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Specialties</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.specialtiesList}>
            {specialties.map((item) => (
              <TouchableOpacity key={item.id} style={styles.specialtyCard}>
                <Text style={styles.specialtyIcon}>{item.icon}</Text>
                <Text style={styles.specialtyName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Packages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Treatment Packages</Text>
          {packages.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.packageCard}
              onPress={() => navigation.navigate('PackageDetail', { packageId: item.id, title: item.name })}
            >
              <View style={styles.packageHeader}>
                <Text style={styles.packageName}>{item.name}</Text>
                <View style={[styles.badge, item.tier === 'Premium' ? styles.badgePremium : styles.badgeStandard]}>
                  <Text style={styles.badgeText}>{item.tier}</Text>
                </View>
              </View>
              <Text style={styles.packageMeta}>{item.specialty} • {item.duration}</Text>
              <View style={styles.packageFooter}>
                <Text style={styles.packagePriceLabel}>All-Inclusive starts at</Text>
                <Text style={styles.packagePrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  welcome: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  patientName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '700',
  },
  banner: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginBottom: spacing.xl,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.surface,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: spacing.xxs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  specialtiesList: {
    paddingRight: spacing.md,
  },
  specialtyCard: {
    width: 100,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  specialtyIcon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  specialtyName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  packageCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packageName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
  },
  badgeStandard: {
    backgroundColor: colors.primaryMuted,
  },
  badgePremium: {
    backgroundColor: '#FFE8D6',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  packageMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  packagePriceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
});
