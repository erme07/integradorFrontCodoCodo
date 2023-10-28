const ticketForm = document.getElementById("ticketForm");
const amount = document.getElementById("cantidad");
const selectCat = document.getElementById("selectCategory");
const categoryStudent = document.querySelector(".category--student");
const categoryTrainee = document.querySelector(".category--trainee");
const categoryJunior = document.querySelector(".category--junior");
const price = document.getElementById("total");

const descuentos = {
  estudiante: 80,
  trainee: 50,
  junior: 15
}



const discountPercent = () => {
  if (Object.hasOwn(descuentos, selectCat.value))
    return descuentos[selectCat.value]
  else
    return 0;
}

const validateAmount = () => {
  const amountValue = Number(amount.value);
  if (Number.isInteger(amountValue) && amountValue >= 0) {
    amount.classList.remove("invalid")
    return true
  } else {
    amount.classList.add("invalid")
    return false
  }
}

const calculatePrice = () => {
  let subtotal = amount.value * 200;
  let total = subtotal - (subtotal * discountPercent() / 100)
  return total;
}

const showPrice = () => {
  if (validateAmount())
    price.innerHTML = '$' + calculatePrice();
  else
    price.innerHTML = '$0';
}

const removeSelected = () => {
  categoryStudent.classList.remove("selected");
  categoryTrainee.classList.remove("selected");
  categoryJunior.classList.remove("selected");
}

const selectCategory = () => {
  removeSelected()
  if (selectCat.value === 'estudiante')
    categoryStudent.classList.add("selected")
  else if (selectCat.value === 'trainee')
    categoryTrainee.classList.add("selected")
  else if (selectCat.value === 'junior')
    categoryJunior.classList.add("selected")
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'clear') {
    ticketForm.reset();
    amount.classList.remove("invalid")
    price.innerHTML = '$0';
    selectCat.value = 'estudiante'
    selectCategory()
  }
  if (e.target.id === 'resume') {
    showPrice();
  }
  if (e.target.matches('.category--student') || e.target.matches('.category--student *')) {
    selectCat.value = 'estudiante'
    selectCategory()
  }
  if (e.target.matches('.category--trainee') || e.target.matches('.category--trainee *')) {
    selectCat.value = 'trainee'
    selectCategory()
  }
  if (e.target.matches('.category--junior') || e.target.matches('.category--junior *')) {
    selectCat.value = 'junior'
    selectCategory()
  }
})

selectCat.addEventListener('change', () => selectCategory())