var array = ['n','2','&','a','l','9','$','q','47','i','a','j','b','z','%','8'] ;

let regexNumAndLet = /\w+/;
let regexSpecial = /\W/;
let indexSpecial = []

let newArray = []
let specialArray = []
for (let i = array.length - 1; i >= 0; i--){

  if(regexNumAndLet.test(array[i])){
    newArray.push(array[i])
  }else{
    indexSpecial.push(i);
    specialArray.push(array[i])
  }

}

let reversedIndexSpecial = indexSpecial.reverse()
let reversedSpecialArray = specialArray.reverse()

for(let i = 0; i < reversedIndexSpecial.length; i++){
    newArray.splice(reversedIndexSpecial[i], 0, reversedSpecialArray[i]);
}

console.log(newArray)
