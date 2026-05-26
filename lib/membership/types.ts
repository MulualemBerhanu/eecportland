export type MembershipFormState = {
  bornAgain: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  previousChurch: string;
  pastorFirstName: string;
  pastorLastName: string;
  married: string;
  spouseFirstName: string;
  spouseLastName: string;
  hasKids: string;
  kidsCount: string;
  acceptedBylaw: string;
  membershipDate: string;
  baptized: string;
  baptismDate: string;
  testimony: string;
  gifts: string;
  previousRole: string;
};

export const membershipFormKeys: (keyof MembershipFormState)[] = [
  "bornAgain",
  "firstName",
  "lastName",
  "gender",
  "dateOfBirth",
  "email",
  "phone",
  "street1",
  "street2",
  "city",
  "state",
  "zip",
  "previousChurch",
  "pastorFirstName",
  "pastorLastName",
  "married",
  "spouseFirstName",
  "spouseLastName",
  "hasKids",
  "kidsCount",
  "acceptedBylaw",
  "membershipDate",
  "baptized",
  "baptismDate",
  "testimony",
  "gifts",
  "previousRole",
];
