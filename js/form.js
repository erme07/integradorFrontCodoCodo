
const regexNames = /^[A-Za-zñÑáéíóúÁÉÍÓÚ]{1,15}$/i;
const regexMail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regCant = /^[1-9]\d*$/;
const regText = /^.+[^ \t\r\n]+.*$/;

const formulario = document.querySelector('form')
const campos = Array.from(document.querySelectorAll("input, textarea"))

const registroValidaciones = {};
campos.forEach( item => registroValidaciones[item.getAttribute("name")] = false )

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

const validacion = (campo) => {
  if (campo.getAttribute("name") === "texto")
    validarCampo(campo, regText)
  else if (campo.getAttribute("name") === "nombre")
    validarCampo(campo, regexNames)
  else if (campo.getAttribute("name") === "apellido")
    validarCampo(campo, regexNames)
  else if (campo.getAttribute("name") === "correo")
    validarCampo(campo, regexMail)
  else if (campo.getAttribute("name") === "cantidad")
    validarCampo(campo, regCant)
}

const validarFormulario = () => {
  campos.forEach(campo => validacion(campo))
  let esValido = Object.values(registroValidaciones).every(element => element === true);
  if (esValido) {
    console.log("Se puede enviar al servidor")
    if (window.location.pathname === "/integradorFrontCodoCodo/tickets.html"){
      showPrice() // esta funcion solo se ejecuta si el formulario es el de la pagina "tickets"
    }
  }
  else
    console.log("Aun no se puede enviar al servidor")
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  e.stopPropagation()
  validarFormulario()
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

document.addEventListener("reset", () => {
  campos.forEach((item) => {
    if (item.matches(".invalid"))
      document.querySelector(`[data-field='${item.getAttribute("name")}']`).classList.remove("error--show")
    item.classList.remove("invalid")
    item.classList.remove("valid")
  })
  if (window.location.pathname === "/integradorFrontCodoCodo/tickets.html") {
    selectCat.value = "senior"
    selectCategory()
  }
})
