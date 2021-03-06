const cityForm = document.querySelector('form');

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
	}).catch((err) => {
		console.log(err);
	});

});