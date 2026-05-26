import type { MembershipFormState } from "@/lib/membership/types";
import { isDateNotInFuture, isValidUsPhone } from "@/lib/utils";

export type MembershipFormErrors = Partial<Record<keyof MembershipFormState, string>>;

function requireField(
  errors: MembershipFormErrors,
  data: MembershipFormState,
  key: keyof MembershipFormState,
  label: string,
  condition = true,
) {
  if (!condition) return;
  if (!String(data[key] ?? "").trim()) {
    errors[key] = `${label} is required.`;
  }
}

export function validateMembershipApplication(
  data: MembershipFormState,
  options: { finalBylawAccepted: boolean },
): MembershipFormErrors {
  const errors: MembershipFormErrors = {};

  if (data.bornAgain === "No") {
    errors.bornAgain = "This application cannot be submitted online.";
  }

  requireField(errors, data, "bornAgain", "Born again question");
  requireField(errors, data, "firstName", "First Name");
  requireField(errors, data, "lastName", "Last Name");
  requireField(errors, data, "gender", "Gender");
  requireField(errors, data, "dateOfBirth", "Date of Birth");
  if (data.dateOfBirth && !isDateNotInFuture(data.dateOfBirth)) {
    errors.dateOfBirth = "Date of birth cannot be in the future.";
  }

  requireField(errors, data, "email", "Email");
  requireField(errors, data, "phone", "Phone Number");
  requireField(errors, data, "street1", "Street Address");
  requireField(errors, data, "city", "City");
  requireField(errors, data, "state", "State / Province");
  requireField(errors, data, "zip", "Postal / Zip Code");
  requireField(errors, data, "previousChurch", "Previous Church");
  requireField(errors, data, "pastorFirstName", "Pastor First Name");
  requireField(errors, data, "pastorLastName", "Pastor Last Name");

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (data.phone && !isValidUsPhone(data.phone)) {
    errors.phone =
      "Please enter a valid US phone number (e.g. (503) 555-1234 or 503-555-1234).";
  }

  requireField(errors, data, "married", "Marriage question");
  requireField(errors, data, "spouseFirstName", "Spouse First Name", data.married === "Yes");
  requireField(errors, data, "spouseLastName", "Spouse Last Name", data.married === "Yes");
  requireField(errors, data, "hasKids", "Kids question");
  if (data.hasKids === "Yes") {
    requireField(errors, data, "kidsCount", "How many kids");
    const count = data.kidsCount.trim();
    if (count && !/^\d{1,2}$/.test(count)) {
      errors.kidsCount = "Please enter a number from 1 to 99.";
    } else if (count && Number(count) < 1) {
      errors.kidsCount = "Please enter at least 1.";
    }
  }

  requireField(errors, data, "acceptedBylaw", "Bylaw question");
  requireField(errors, data, "membershipDate", "Membership Date");
  if (data.membershipDate && !isDateNotInFuture(data.membershipDate)) {
    errors.membershipDate = "Membership date cannot be in the future.";
  }
  requireField(errors, data, "baptized", "Baptism question");
  requireField(errors, data, "baptismDate", "Baptism Date", data.baptized === "Yes");
  if (data.baptized === "Yes" && data.baptismDate && !isDateNotInFuture(data.baptismDate)) {
    errors.baptismDate = "Baptism date cannot be in the future.";
  }

  requireField(errors, data, "testimony", "Testimony");
  requireField(errors, data, "gifts", "Talents / giftings");
  requireField(errors, data, "previousRole", "Past church role");

  if (!options.finalBylawAccepted) {
    errors.acceptedBylaw = "Please accept the church bylaws before submitting.";
  }

  return errors;
}

export function hasMembershipErrors(errors: MembershipFormErrors) {
  return Object.keys(errors).length > 0;
}
