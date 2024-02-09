export function ValidationSalReg(values) {
  console.log(values);
  let error = {};
  const email_pattern = /\S+@\S+\.\S+/;

  if (values.name === "") {
    error.name = "Name should not be empty";
  } else {
    error.name = "";
  }

  if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email format doesn't match";
  } else {
    error.email = "";
  }

  if (values.address === "") {
    error.address = "Address should not be empty";
  } else {
    error.address = "";
  }

  if (values.city === "") {
    error.city = "City should not be empty";
  } else {
    error.city = "";
  }

  if (values.openinghourstart === "") {
    error.openinghourstart = "Add opening hour of salon";
  } else {
    error.openinghourstart = "";
  }

  if (values.closeingHour === "") {
    error.closeingHour = "Add closing hour of salon";
  } else {
    error.closeingHour = "";
  }

  return error;
}
