import { Ubigeo } from "./ubigeo";

export interface Student {

    id: string;
    documentType: string;
    documentNumber: string;
    lastNamePaternal: string;
    lastNameMaternal: string;
    names: string;
    sex: string;
    birthDate: string;
    birthCountry: string;
    ubigeoBirth: Ubigeo;
    ubigeoResidence: Ubigeo;
    email: string;
    phoneNumber: string;
    maritalStatus: string;
    educationLevel: string;
    disability: string;
    disabilityType: string;
    internetAccess: string;
    employed: string;
    occupation: string;
    nativeLanguage: string;
    status: string;
}