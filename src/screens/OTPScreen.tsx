import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

type Props = {
  navigation: any;
};

export default function OTPScreen({ navigation }: Props) {
  const theme = useTheme();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, []);

  const startTimer = () => {
    clearTimer();
    setSeconds(RESEND_SECONDS);
    timerRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearTimer();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (seconds > 0) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
    startTimer();
  };

  const isComplete = otp.every(d => d !== '');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={[styles.backArrow, { color: theme.text }]}>{'←'}</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text style={[styles.heading, { color: theme.text }]}>Enter Your Code</Text>
        <Text style={[styles.description, { color: theme.subtext }]}>
          Please check your inbox from Codu.id message with your unique code. Enter it below to proceed with us.
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                {
                  borderColor: digit ? theme.btnPrimary : '#d0d0d0',
                  color: theme.text,
                  backgroundColor: theme.background,
                },
              ]}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        {/* Countdown */}
        <Text style={[styles.countdownTxt, { color: theme.subtext }]}>
          {seconds > 0
            ? `You can resend the code in ${seconds} second${seconds !== 1 ? 's' : ''}`
            : 'You can now resend the code'}
        </Text>

        {/* Resend */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={seconds > 0}
          style={styles.resendBtn}>
          <Text style={[styles.resendTxt, { color: seconds > 0 ? '#aaa' : theme.btnPrimary }]}>
            Resend code
          </Text>
        </TouchableOpacity>

        {/* Proceed Button */}
        <TouchableOpacity
          style={[
            styles.proceedBtn,
            { backgroundColor: isComplete ? theme.btnPrimary : '#ccc' },
          ]}
          disabled={!isComplete}
          onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={[styles.proceedTxt, { color: theme.btnPrimaryText }]}>Proceed</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },
  backBtn: {
    marginBottom: 28,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 40,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '700',
  },
  countdownTxt: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
  resendBtn: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  resendTxt: {
    fontSize: 14,
    fontWeight: '600',
  },
  proceedBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
  },
  proceedTxt: {
    fontSize: 15,
    fontWeight: '600',
  },
});
