const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) =>{

	// const {cityDets, weather} = data; //destructuring properties

	// console.log(data);
	const cityDets = data.cityDets;
	const weather = data.weather;

	//update details template
	details.innerHTML = `
				<h5 class="my-3">${cityDets.EnglishName}</h5>
				<h6 class="my-3">(${weather.LocalObservationDateTime})</h6>
				<div class="my-3">${weather.WeatherText}</div>
				<div class="display-4 my-4">
					<span>${weather.Temperature.Metric.Value}</span>
					<span>&deg;C</span>
				</div>`;

	//update the night/day icon image

	let timeSrc = weather.IsDayTime ? "weath_images/day.svg" : "weath_images/night.svg";

	// let timeSrc = null;
	// if (weather.IsDayTime) {
	// 	timeSrc = "weath_images/day.svg";
	// }
	// else{
	// 	timeSrc = "weath_images/night.svg";
	// }

	time.setAttribute('src', timeSrc);

	let iconSrc = `weath_images/icons/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src',iconSrc);


	// remove the d-none class if present
		if (card.classList.contains('d-none')) {
			card.classList.remove('d-none');
		} 
};


const updateCity = async (city) => {
	const cityDets = await getCity(city);
	const weather = await getWeather(cityDets.Key);

	// return{cityDets, weather}; This is object shorthand notation

	return {
		cityDets: cityDets,
		weather: weather
	};
};


cityForm.addEventListener('submit', (e) => {
	//prevent default
	e.preventDefault();

	// get city value
	const city = cityForm.city.value.trim();
	cityForm.reset();

	// update the ui with the new city 
	updateCity(city).then((data)=>{
		console.log(data);
		updateUI(data);
	}).catch((err) => {
		console.log(err);
	});

});

//Ternary Operator
// const result = false ? 'value 1' : 'value 2';
// console.log(result);