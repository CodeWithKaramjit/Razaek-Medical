import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radius, typography } from '../theme/tokens';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'PackageDetail'>;

export function PackageDetailScreen({ route, navigation }: Props) {
  const { packageId, title } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back to Home</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.specialty}>Specialized Orthopedic Care</Text>
        </View>

        {/* Package Features */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What is Included:</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🩺</Text>
            <View>
              <Text style={styles.featureTitle}>Doctor Consultations</Text>
              <Text style={styles.featureDesc}>Pre and post-op checkups with top surgeons</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🏥</Text>
            <View>
              <Text style={styles.featureTitle}>Hospital Stay</Text>
              <Text style={styles.featureDesc}>3 Days in private room (JCI accredited hospital)</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🏨</Text>
            <View>
              <Text style={styles.featureTitle}>Hotel Accommodation</Text>
              <Text style={styles.featureDesc}>9 Days of 4-Star recovery stay for patient + companion</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✈️</Text>
            <View>
              <Text style={styles.featureTitle}>Airport Transfers</Text>
              <Text style={styles.featureDesc}>Private taxi pickup and drop-off from local airport</Text>
            </View>
          </View>
        </View>

        {/* Pricing Info */}
        <View style={styles.pricingCard}>
          <Text style={styles.pricingLabel}>Total All-Inclusive Package Cost</Text>
          <Text style={styles.price}>$5,200 USD</Text>
          <Text style={styles.savings}>Save up to 70% compared to Western countries</Text>

          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Consultation Now</Text>
          </TouchableOpacity>
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
  backButton: {
    marginBottom: spacing.md,
  },
  backText: {
    color: colors.primary,
    fontWeight: '600',
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.screenTitle,
  },
  specialty: {
    ...typography.subtitle,
    marginTop: spacing.xxs,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  featureDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  pricingCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  pricingLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  price: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
    marginVertical: spacing.xs,
  },
  savings: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  bookButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
});
