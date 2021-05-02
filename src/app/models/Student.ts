export class Student {
  id: number;
  name: string;
  idGroup: number;
  idFaculty: number;
  stipendium: number;
  gender: Gender;
  age: number;
  kids: number;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
