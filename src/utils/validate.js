export function validate_email(value) {
    let reg_email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg_email.test(value);
}
export function validate_password(value) {
    let reg_password = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return reg_password.test(value);
}
export function validate_code(value) {
    let reg_code = /^[a-z0-9]{6}$/;
    return reg_code.test(value);
}