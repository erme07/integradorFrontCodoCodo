const amount = document.getElementById("cantidad");
const selectCat = document.getElementById("selectCategory");
const categoryStudent = document.querySelector(".category--student");
const categoryTrainee = document.querySelector(".category--trainee");
const categoryJunior = document.querySelector(".category--junior");
const categorySenior = document.querySelector(".category--senior");
const price = document.getElementById("total");

const COSTO_BOLETO = 200;

const descuentos = {
  estudiante: 80,
  trainee: 50,
  junior: 15,
  senior: 0
}
Object.freeze(descuentos);

const discountPercent = () => {
  if (Object.hasOwn(descuentos, selectCat.value))
    return descuentos[selectCat.value]
  else
    return 0;
}

const calculatePrice = () => {
  let subtotal = amount.value * COSTO_BOLETO;
  let total = subtotal - (subtotal * discountPercent() / 100)
  return total;
}

const showPrice = (precio) => {
    price.innerHTML = '$' + precio;
}

const removeSelected = () => {
  categoryStudent.classList.remove("selected");
  categoryTrainee.classList.remove("selected");
  categoryJunior.classList.remove("selected");
  categorySenior.classList.remove("selected")
}

const selectCategory = () => {
  removeSelected()
  if (selectCat.value === 'estudiante')
    categoryStudent.classList.add("selected")
  else if (selectCat.value === 'trainee')
    categoryTrainee.classList.add("selected")
  else if (selectCat.value === 'junior')
    categoryJunior.classList.add("selected")
  else if (selectCat.value === 'senior')
    categorySenior.classList.add("selected")
}

document.addEventListener('click', (e) => {
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
  if (e.target.matches('.category--senior') || e.target.matches('.category--senior *')) {
    selectCat.value = 'senior'
    selectCategory()
  }
  if (e.target.id === "clear") {
    resetear()
    price.innerHTML = "$0"
  }
})