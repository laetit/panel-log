const Functor = (isValid) => {
    const F = (initialValue) => ({
      _value: initialValue,
      of: function(value) {
        return F(value);
      },
      _isValid: isValid,
      map: function(fn) {
        if (this._isValid(this._value)) {
          return this.of(fn(this._value));
        }
        return this.of();
      },
      getOrElse: function(value) {
        return !this._isValid(this._value) ? value : this._value;
      },
      get: function() {
        return this._value;
      }
    })

    return F();
}

const Maybe = Functor((value) => value !== undefined && value !== null);

export default function deepProps(...params) {
    const lastKey = params.length - 1;
    const lastParam = params[lastKey];
    const nodes = params.slice(0, -1);

    if (typeof lastParam === 'object') {
      return Maybe.of(nodes.reduce((acc, current) => {
        if (acc) {
          return acc[current] || undefined;
        }

        return undefined;
      }, lastParam));
    }

    return deepProps.bind(this, ...params);
}

export const isString = (x) => {
  if (x == null)
    return false
  return Object.prototype.toString.call(x) === "[object String]"
}

export const getFormattedDate = (date, addDay = true) => {
    let formatted = new Date(date)
    if(addDay)
		formatted.setDate(formatted.getDate()+1)
    return formatted.toLocaleDateString()
}

export const getFormattedDateInput = (date) => {
    let formatted = new Date(date)
    return formatted.toISOString().slice(0, 10)
}

export const errorLog = (error) => {
  console.error(error)
}

export const errorStatusLog = (error, request = 'Não definida') => {
  console.error('Erro ' + error + ' na requisição ' + request)
}

export const zerateHour = (hour) =>{
	hour.setHours(0)
	hour.setMinutes(0)
	hour.setSeconds(0)
	hour.setMilliseconds(0)
	return hour
}

export const isNull = (value) => {
  if(undefined === value) return true
  return ['', null].includes(value.toString().trim())
}

export const isBetween = (value,min,max) =>{
  return (value >= min && value <= max)
}

export const isCPFValid = (cpf) => {
    let soma;
    let resto;

    soma = 0;

    if(isNull(cpf)) return false

    cpf = cpf.replace('.','').replace('.','').replace('-','')

    if(cpf.length !== 11) return false

    if (cpf === "00000000000") return false;

    for (let i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11))  resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10)) ) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11))  resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11) ) ) return false;
       return true;
}

export const formatVersion = (version) => {
	if (version !== undefined){
		let a = Array.from(version)
		if (a.length !== 6){
			a.unshift(0)
		}
		return `${a[0]}${a[1]}.${a[2]}${a[3]}.${a[4]}${a[5]}`
	}
}

export const formatFloat = (value) => {
  if(value.toString().indexOf(',') !== -1){
    value = value.replace(',','.')}

  let reg = /^[+-]?\d+(\.\d+)?$/
  value = value + ''
  if (value.match(reg))
    return parseFloat(value).toFixed(2)
  return value
}

export const hasSpecialCharacters = (value) => {
  return value.match('[^a-zA-Z0-9]+')
}

export const hasEmptyValues = (field) => {
  let validate 
  validate = (validate instanceof Array) ? field : Object.values(field)
  return validate.filter(value => (value === '' || value === null)).length > 0
}

export const randomNumber = (min, max) =>{
  return Math.floor(min + Math.random() * ((max+1) - min));
}


export const treatMessage = (error, result = () => {}) => {
  if (error instanceof Object) {
    if (!(error.json instanceof Function)) {
      let message = error.message
      let status = error.status
      if (message === undefined || status === 0)
        message = 'Tente novamente mais tarde'
      if (status === undefined) {
        status  = -1
        message = 'Tente novamente mais tarde'
      }
      result(message, status)
      return
    }
    let promise = error.json()
    if (promise instanceof Promise) {
      promise.then(e => {
        if (e === undefined)
          return
        let message = e.message
        let status = e.status
        if (message === undefined)
          message = 'Tente novamente mais tarde'
        if (status === undefined) {
          status  = -1
          message = 'Tente novamente mais tarde'
        }
        result(message, status)
      })
    }
  }else {
    result(error)
  }
}

export const capitalizeFirstLetter = (string) => {
  let s = string.trim()
  let upper = true
  let resp = ''
  s.split('').map((letra)=>{
    if(letra === ' '){
      resp = resp + ' '
      upper = true
      return false
    }
    if(upper){
      resp = resp + letra.toLocaleUpperCase()
      upper = false
    }else{
      resp=resp + letra.toLocaleLowerCase()
    }
    return true
  })
  return resp
}

export const format = (value, mask, replace, fillValue = '0') => {
  if (value == null)
		return ''
  if (mask == null || replace == null)
		return value

	value = value.toString()
	
	value = fill(value, fillValue, mask.split(replace).length - 1)
  let result = ''
  let j = 0
  for (let i = 0; i < mask.length && j < value.length; i++) {
    let append = mask.charAt(i)
    if (append === replace)
      append = value.charAt(j++)
    result += append
	}
  return result
}

export const fill = (dado, c, length) => {
  while(dado.length < length)
    dado = c + dado
  return dado
}

export const formatarData = (data) =>{
  if(data === undefined)
    return
  data = data.replace(/\D/g,"")
  data = data.replace(/(\d{2})(\d)/,"$1/$2")
  data = data.replace(/(\d{2})(\d)/,"$1/$2")
  return data
}

export const getGenderLabel = (gender) =>{
  switch (gender) {
    case 'male':
      return 'Masculino'
    case 'female':
        return 'Feminino'
    case 'other':
      return 'Outros'
    default:
      return ''
  }
}

export const getInputedDateToJSON = (value)=>{
  return `${value.substring(4,8)}-${value.substring(2,4)}-${value.substring(0,2)}T00:00:00`
}
export const  isDateValid = (val) => {
  if(isNull(val)){return false}
  if(val.length !== 8){return false}

  let day = val.substring(0,2)
  let month = val.substring(2,4)
  let year = val.substring(4,8)
  return (isBetween(day,1,getDaysInMonth(month,new Date().getFullYear())) && isBetween(month,1,12) && isBetween(year,new Date().getFullYear() - 130,new Date().getFullYear()))
}

export const getDaysInMonth = function(month,year) {
 return new Date(year, month, 0).getDate();
};

export const isPhoneValid = (phone) =>{
  if(isNull(phone)){return false}

  return (phone.length === 10)
}

export const isCellPhoneValid = (phone) =>{
  if(isNull(phone)){return false}

  return (phone.length === 11)
}

export const isEmailValid = (email) => {
  if(isNull(email)) return false

  let usuario = email.substring(0, email.indexOf("@"));
  let dominio = email.substring(email.indexOf("@")+ 1, email.length);
  return ((usuario.length >=1) &&
      (dominio.length >=3) && 
      (usuario.search("@")===-1) && 
      (dominio.search("@")===-1) &&
      (usuario.search(" ")===-1) && 
      (dominio.search(" ")===-1) &&
      (dominio.search(".")!==-1) &&      
      (dominio.indexOf(".") >=1)&& 
      (dominio.lastIndexOf(".") < dominio.length - 1)) 
}

export const isEqual = comparativo => valor =>  (valor === comparativo);

export const isEmpty = isEqual('')


export const getCurrentLocationHash = () => { 
  return window.location.hash.replace('#','')
}

export const  goToLocationHash = (hash) => {
  document.location.href = `#${hash}`;
}

export const transformDate = (date) => {
	date = date.toLocaleDateString()
	return date
}

export const isEmptyObj = (item) => {
	for (let i in item){
		if (item.hasOwnProperty(i))
			return false
	}
	return true
}