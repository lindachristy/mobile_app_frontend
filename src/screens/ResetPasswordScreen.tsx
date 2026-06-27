import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";

type Props = {
  navigation: any;
};

export default function ResetPasswordScreen({ navigation }: Props) {
  const theme = useTheme();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isValid = newPassword.length > 0 && newPassword === confirmPassword;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.background },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backArrow, { color: theme.text }]}>{"←"}</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text style={[styles.heading, { color: theme.text }]}>
          Reset Your Password
        </Text>
        <Text style={[styles.description, { color: theme.subtext }]}>
          Enter a new password for your Codu.id account. Make it secure but easy
          for you to memorize.
        </Text>

        {/* New Password */}
        <Text style={[styles.label, { color: theme.text }]}>
          Enter New Password
        </Text>
        <View
          style={[
            styles.passwordRow,
            { borderColor: "#d0d0d0", backgroundColor: theme.background },
          ]}
        >
          <TextInput
            style={[styles.passwordInput, { color: theme.text }]}
            placeholder="New password"
            placeholderTextColor={theme.subtext}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNew}
          />
          <TouchableOpacity onPress={() => setShowNew((v) => !v)}>
            <Text style={[styles.toggleTxt, { color: theme.subtext }]}>
              {showNew ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={[styles.label, { color: theme.text }]}>
          Confirm Your Password
        </Text>
        <View
          style={[
            styles.passwordRow,
            { borderColor: "#d0d0d0", backgroundColor: theme.background },
          ]}
        >
          <TextInput
            style={[styles.passwordInput, { color: theme.text }]}
            placeholder="Confirm password"
            placeholderTextColor={theme.subtext}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirm}
          />
          <TouchableOpacity onPress={() => setShowConfirm((v) => !v)}>
            <Text style={[styles.toggleTxt, { color: theme.subtext }]}>
              {showConfirm ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Mismatch warning */}
        {confirmPassword.length > 0 && newPassword !== confirmPassword && (
          <Text style={styles.errorTxt}>Passwords do not match</Text>
        )}

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveBtn,
            { backgroundColor: isValid ? theme.btnPrimary : "#ccc" },
          ]}
          disabled={!isValid}
          onPress={() => navigation.navigate("ResetSuccess")}
        >
          <Text style={[styles.saveTxt, { color: theme.btnPrimaryText }]}>
            Save New Password
          </Text>
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
    alignSelf: "flex-start",
  },
  backArrow: {
    fontSize: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 36,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
  },
  toggleTxt: {
    fontSize: 13,
    fontWeight: "500",
  },
  errorTxt: {
    color: "#e53935",
    fontSize: 12,
    marginTop: -16,
    marginBottom: 16,
  },
  saveBtn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 8,
  },
  saveTxt: {
    fontSize: 15,
    fontWeight: "600",
  },
});
