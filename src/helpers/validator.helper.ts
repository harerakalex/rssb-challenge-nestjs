import { createUserDto } from 'src/users/dto/create-user.dto';

export const fieldsValidator = (data: any) => {
  const validData: createUserDto[] = data.map((d: any) => {
    return {
      names: validateName(d.names),
      nid: validateNID(d.nid),
      phone: validatePhone(d.phone),
      gender: validateGender(d.gender),
      email: validateEmail(d.email),
    };
  });

  return validData;
};

const validateName = (name: string) => {
  if (name == null || name == '') {
    return 'Name is invalid';
  }

  return name;
};

const validateNID = (nid: any) => {
  nid = nid.toString();
  if (nid.length != 16 || /\D/.test(nid) || nid == null || nid == '') {
    return 'NID is invalid';
  }

  return nid;
};

const validatePhone = (phone: any) => {
  phone = phone.toString();
  if (phone.length != 12 || /\D/.test(phone) || phone == null || phone == '') {
    return 'Phone is incorrect';
  }

  return phone;
};

const validateGender = (gender: string) => {
  const g = ['M', 'F', 'Male', 'Female'];
  if (gender == null || gender == '' || !g.includes(gender)) {
    return 'Gender is invalid';
  }

  return gender;
};

const validateEmail = (email: any) => {
  email = email.toString();
  if (
    email == null ||
    email == '' ||
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  ) {
    return 'Email is invalid';
  }

  return email;
};
