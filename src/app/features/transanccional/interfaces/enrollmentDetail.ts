interface DidacticUnit {
  id: string;
  name: string;
  credit: number;
  status: string;
}

interface Student {
  id: string;
  documentType: string;
  documentNumber: string;
  lastNamePaternal: string;
  lastNameMaternal: string;
  names: string;
  status: string;
}

export interface EnrollmentDetail {
  id: string;
  didacticUnit: DidacticUnit[];
  status: string;
  student: Student;
}
