// All Validations are here
export function validateName(str){
     const regex = /^[a-zA-Z ]{2,30}$/;
     return regex.test(str)?"":"Invalid TaskName";
}
//export default validateName;
function validateDesc(str){

}