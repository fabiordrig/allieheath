export type EHRUser = {
  ehr_id: number;
  name: string;
  date_of_birth: string;
  contact_info: {
    email_address: string;
    phone: string;
  };
};

export type EHR = {
  source: string;
  people: EHRUser[];
};

export type PayrollUser = {
  payroll_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
};

export type Payroll = {
  source: string;
  users: PayrollUser[];
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string | null;
  phoneNumber: string | null;
  providerId: string | null;
};
