import { EHRUser, PayrollUser, User } from "./types";

const parseJson = (data: string): User[] => {
  try {
    const parsedJson = JSON.parse(data);

    if (parsedJson.source === "ehr-100") {
      const parsedData = parsedJson.people.map((person: EHRUser) => ({
        providerId: person.ehr_id.toString(),
        firstName: person.name.split(" ")[0],
        lastName: person.name.split(" ").slice(1).join(" "),
        email: person.contact_info.email_address,
        dateOfBirth: person.date_of_birth,
        phoneNumber: person.contact_info.phone,
      }));

      return parsedData;
    } else if (parsedJson.source === "payroll-123") {
      const parsedData = parsedJson.users.map((user: PayrollUser) => ({
        providerId: user.payroll_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        dateOfBirth: user.date_of_birth,
        phoneNumber: user.phone_number,
      }));

      return parsedData;
    } else {
      throw new Error("Unknown file format.");
    }
  } catch (e) {
    throw new Error("Error parsing JSON file.");
  }
};
export default parseJson;
