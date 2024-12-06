interface ICreatePatientRequest {
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  document: string;
  documentType: string;
  firm: string;
  sex: string;
  verificationType: string;
  phone: string;
  imgDocument: { uri: string; type: string; name: string };
  imgProfile: { uri: string; type: string; name: string };
  googleAvatar: string;
}

export type { ICreatePatientRequest };
