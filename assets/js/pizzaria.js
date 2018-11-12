
window.onload = function() {
	openJSON("GET","assets/js/pizzas.json",showPizzas,["priceG"]);
	hideElement("loader","hide");

	var fi = document.getElementsByClassName('loja')[0].childNodes;
	fi[0].addEventListener("click",goBack);
	fi[1].addEventListener("click",goFoward);
				
	var page = document.getElementsByClassName('tab-sup');
	page[0].onclick = ()=>{
		handleList("myNavbar","btn-mob");
		// showElement("rq1","hide-element");
		// showElement("rq2","hide-element");
	}
	page[1].onclick = ()=>{
		handleList("myNavbar","btn-mob");
		// showElement("rq1","hide-element");
		// showElement("rq2","hide-element");
	}
	page[2].onclick = ()=>{
		closeList("myNavbar","btn-pz");
		// hideElement("rq1","hide-element");
		// hideElement("rq2","hide-element");
	}
	
	// document.getElementById('priceP').onclick = ()=>{
	// 	updatePizzas(pizzasObj,["priceP"]);
	// }
	// document.getElementById('priceM').onclick = ()=>{
	// 	updatePizzas(pizzasObj,["priceM"]);
	// }
	document.getElementById('priceG').onclick = ()=>{
		updatePizzas(pizzasObj,["priceG"]);
	}
	document.getElementById('priceF').onclick = ()=>{
		updatePizzas(pizzasObj,["priceF"]);
	}

	var promoLabel = document.getElementsByClassName('promo');
	
	promoLabel[1].onclick = ()=>{
		showElement("modal-promo","hide");
	}
	promoLabel[3].onclick = ()=>{
		showElement("modal-promo","hide");
	}

	document.getElementsByClassName('modal-promo')[0].onclick = ()=>{
		hideElement("modal-promo","hide");
	}
}

function handleList(list,btn) {
	btnC = document.getElementById(btn);
	listC = document.getElementById(list);
	if (listC.classList.contains('in')) {
		listC.classList.remove('in');
		btnC.classList.add('collapsed');
	} 
	else {
		listC.classList.add('in');
		btnC.classList.remove('collapsed');	
	}
}

// function closeList(list,btn) {
// 	document.getElementById(list).classList.remove('in');
// 	document.getElementsByClassName(btn)[0].classList.add('collapsed');
// }

// function openList(list,btn) {
// 	document.getElementById(list).classList.add('in');
// 	document.getElementsByClassName(btn)[0].classList.remove('collapsed');
// }

var pizzasObj;

function updatePizzas(pizzas,pizzaSize) {
	var itsG = true;
	var pizzaHtml = "";

	if (!(pizzaSize[0] == "priceG")) {
		itsG = false;
	}

	for (let pizza in pizzas) {
		pizzaHtml = `<h4>${(itsG?(pizzas[pizza].promo?"15,00":pizzas[pizza].priceG):pizzas[pizza][pizzaSize])}</h4>`;
		var promotion = document.getElementsByClassName('list-group-item pizza')[pizza];
		promotion.classList.remove('promot');
		promotion.classList.add(itsG?(pizzas[pizza].promo?"promot":"promoFalse"):"promoFalse");
		promotion.classList.remove('promoFalse');
		document.getElementsByClassName('col-xs-3 pizza')[pizza].innerHTML = pizzaHtml;	
	}
	// document.getElementById('priceP').classList.remove('selected');
	// document.getElementById('priceM').classList.remove('selected');
	document.getElementById('priceG').classList.remove('selected');
	document.getElementById('priceF').classList.remove('selected');
	document.getElementById(pizzaSize).classList.add('selected');
}

function showPizzas(pizzas,pizzaSize) {
	pizzasObj = pizzas;
	var itsG = true;
	var pizzaHtml = "";

	if (!(pizzaSize[0] == "priceG")) {
		itsG = false;
	}
						
	for (let pizza in pizzas) {
		pizzaHtml += `<div class="col-xs-12 col-md-6 col-sm-6 col-lg-6 list-group-item pizza ${(itsG?(pizzas[pizza].promo?"promot":""):"")}">`;
		pizzaHtml += `<div class="col-md-9 col-sm-9 col-lg-9 col-xs-9 pizza">`;
		pizzaHtml += `<h4 class="list-group-item-heading text-uppercase">${pizzas[pizza].name}</h4>`;
		pizzaHtml += `<p class="list-group-item-text">${pizzas[pizza].descript}</p>`;
		pizzaHtml += `</div>`;
		pizzaHtml += `<div class="col-md-3 col-sm-3 col-lg-3 col-xs-3 pizza">`;
		pizzaHtml += `<h4>${(itsG?(pizzas[pizza].promo?"15,00":pizzas[pizza].priceG):pizzas[pizza][pizzaSize])}</h4>`;
		pizzaHtml += `</div></div>`;
	}
				
	document.getElementById('pizza-list').innerHTML = pizzaHtml;						
}

function openJSON(method, nameFile, functionCall, params) {
	var xmlhttp = new XMLHttpRequest();
	var myObj;
	xmlhttp.onloadend = function() {
   		if (this.readyState == 4 && this.status == 200) {
       		myObj = JSON.parse(this.response);
       		functionCall(myObj, params);
   		}
	};
	xmlhttp.open(method, nameFile, true);
	xmlhttp.send();	
}

var imgs = ['lojaimg','lojaimg2', 'lojaimg3', 'lojaimg4'];
var img = 0;

function goBack() {
	document.getElementsByClassName('loja')[0].classList.remove(imgs[img]);
	((img - 1) < 0)?(img=imgs.length):(img--); 
	document.getElementsByClassName('loja')[0].classList.add(imgs[img]);
}
	
function goFoward() {
	console.log('asas');
	document.getElementsByClassName('loja')[0].classList.remove(imgs[img]);
	((img + 1) >= imgs.length)?(img=0):(img++);
	document.getElementsByClassName('loja')[0].classList.add(imgs[img]);
}

function showElement(elementName,classM) {
	document.getElementById(elementName).classList.remove(classM);
}

function hideElement(elementName,classM) {
	document.getElementById(elementName).classList.add(classM);
}

