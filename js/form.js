
const regularExpresions = {
  texto: /^.+[^ \t\r\n]+.*$/,
  nombre: /^[A-Za-zñÑáéíóúÁÉÍÓÚ]{1,15}$/i,
  apellido: /^[A-Za-zñÑáéíóúÁÉÍÓÚ]{1,15}$/i,
  correo: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  cantidad: /^[1-9]\d*$/
}

const formulario = document.querySelector('form')
const campos = Array.from(document.querySelectorAll("input, textarea"))
const registroValidaciones = {};
campos.forEach( item => registroValidaciones[item.getAttribute("name")] = false )

const resetear = (ticket = false) => {
  campos.forEach((item) => {
    if (item.matches(".invalid"))
      document.querySelector(`[data-field='${item.getAttribute("name")}']`).classList.remove("error--show")
    item.classList.remove("invalid")
    item.classList.remove("valid")
  })
  formulario.reset()
  if (ticket) {
    selectCat.value = "senior"
    selectCategory()
  }
}

const validarCampo = (campo, regexp) => {
  let elementoMensaje = document.querySelector(`[data-field='${campo.getAttribute("name")}']`);
  if (!regexp.test(campo.value)) {
    campo.classList.remove("valid")
    campo.classList.add("invalid")
    elementoMensaje.classList.add("error--show")
    registroValidaciones[campo.getAttribute("name")] = false;
  } else {
    campo.classList.remove("invalid")
    campo.classList.add("valid")
    elementoMensaje.classList.remove("error--show")
    registroValidaciones[campo.getAttribute("name")] = true;
  }
}

const validacion = (campo) => validarCampo(campo, regularExpresions[campo.getAttribute("name")])

const validarFormulario = (ticket=false) => {
  campos.forEach(campo => validacion(campo))
  let esValido = Object.values(registroValidaciones).every(element => element === true);
  if (esValido) {
    console.log("Se envió al servidor")
    if (ticket) {
      let precio = calculatePrice()
      resetear(ticket)
      showPrice(precio)
    }
    else resetear(ticket)
  }
  else console.log("Aun no se puede enviar al servidor")
}

const validarCalculo = () => {
  if (regularExpresions.cantidad.test(amount.value)) {
    amount.classList.remove("invalid")
    amount.classList.add("valid")
    let precio = calculatePrice()
    showPrice(precio)
  } else {
    amount.classList.remove("valid")
    amount.classList.add("invalid")
  }
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  e.stopPropagation()
  if(e.submitter.id === "resume")
    validarFormulario(true)
  else if (e.submitter.id === "calcular")
    validarCalculo()
  else
    validarFormulario(false)
})

document.addEventListener('input', e => {
  if(e.target.getAttribute("type")==="submit")
    validacion(e.target)
  if (e.target.id === "selectCategory") {
    selectCat.value = e.target.value
    selectCategory()
  }
  if (e.target.matches("input") || e.target.matches("textarea"))
    validacion(e.target)
})