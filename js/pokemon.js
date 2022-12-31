let nombreBuscar = ""

const input = document.getElementById("nombreBuscar");
input.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		document.getElementById("apiButton").click();
	}
});

const buscar = () => {
	nombreBuscar = document.getElementById('nombreBuscar').value
	if (nombreBuscar=="") 
		alertDanger("Escriba algo en la barra","")
	else
		callApi(nombreBuscar.toLowerCase())
}

const callApi = (nombrePokemon) => {
	document.getElementById('esperar').style.display = 'block'
	fetch('https://pokeapi.co/api/v2/pokemon/'+nombrePokemon)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			llenarApiData(data)
		})
		.catch(e => { 
			alertDanger(`${e.name}: ${e.message}`, `${e.name}`)
			console.log(new Error(e))
			})
}

const alertDanger = (msj, name) => {
	let mostrar = document.getElementById('alertDanger')
	mostrar.innerHTML = 
		'<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="closeAlert('+"'alertDanger'"+')">'
				+'<span aria-hidden="true">&times;</span>'
		+'</button>'
	mostrar.innerHTML += msj 
	mostrar.style.display = 'block'
	if (name == "SyntaxError") 
		mostrar.innerHTML += "<br>No se encontro \"" + nombreBuscar
		+"\"<br>Posiblemente escribio mal el nombre del pokémon"
	document.getElementById('esperar').style.display = 'none'
}

const closeAlert = (toClose) => {
	let close = document.getElementById(toClose)
	close.style.display = 'none'
	close.innerHTML = 
		'<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="closeAlert('+"'alertDanger'"+')">'
				+'<span aria-hidden="true">&times;</span>'
		+'</button>'
}

const llenarApiData = (data) => {
	document.getElementById('alertDanger').style.display = 'none'
	const nombrePokemon = document.getElementById('nombrePokemon')
	const posicion = document.getElementById('posicion')
	const frontDefault = document.getElementById('frontDefault')
	const frontShiny = document.getElementById('frontShiny')
	const type1 = document.getElementById('type1')
	const type2 = document.getElementById('type2')
	const skill = document.getElementById('skill')
	const skillHidden = document.getElementById('skillHidden')
	const peso = document.getElementById('peso')
	const altura = document.getElementById('altura')

	document.getElementById('apiData').style.display = 'block'

	nombrePokemon.innerHTML = JSON.stringify(data.name).toUpperCase()
	posicion.innerHTML = JSON.stringify(data.id)
	frontDefault.src = JSON.stringify(data.sprites.front_default).replaceAll('\"', "");
	frontShiny.src = JSON.stringify(data.sprites.front_shiny).replaceAll('\"', "");
	type1.innerHTML = JSON.stringify(data.types[0].type.name)
	if (data.types.length > 1)
		type2.innerHTML = JSON.stringify(data.types[1].type.name)
	else 
		type2.innerHTML = "-"
	
	skill.innerHTML = JSON.stringify(data.abilities[0].ability.name)
	if (data.abilities.length > 1)
		skillHidden.innerHTML = JSON.stringify(data.abilities[1].ability.name)
	else 
		skillHidden.innerHTML = "-"	
	peso.innerHTML = JSON.stringify(data.weight)
	altura.innerHTML = JSON.stringify(data.height)

	setStats(data)
}

const setStats = (data) => {
	const hp = document.getElementById('hp')
	const atkSp = document.getElementById('atkSp')
	const atk = document.getElementById('atk')
	const defSp = document.getElementById('defSp')
	const def = document.getElementById('def')
	const spd = document.getElementById('spd')

	hp.innerHTML = JSON.stringify(data.stats[0].base_stat)	
	atkSp.innerHTML = JSON.stringify(data.stats[1].base_stat)	
	atk.innerHTML = JSON.stringify(data.stats[2].base_stat)	
	defSp.innerHTML = JSON.stringify(data.stats[3].base_stat)	
	def.innerHTML = JSON.stringify(data.stats[4].base_stat)	
	spd.innerHTML = JSON.stringify(data.stats[5].base_stat)	

	document.getElementById('esperar').style.display = 'none'
}


