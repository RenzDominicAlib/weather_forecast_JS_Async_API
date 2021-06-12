class Forecast {

	constructor(){
		this.key = 'FBmMjlSPl95ObR8mwOvMtkJEEUChWjYY';
		this.cityBaseURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
		this.weatherBaseURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
	}

	async updateCity(city){
		const cityDets = await this.getCity(city);
		const weather = await this.getWeather(cityDets.Key);
		return {cityDets: cityDets,
				weather: weather};
	}

	async getCity(city){
		const query = `?apikey=${this.key}&q=${city}`;
		const response = await fetch(this.cityBaseURI + query);
		const data = await response.json();
		return data[0];
	}

	async getWeather(id){
		const query = `${id}?apikey=${this.key}`;
		const response = await fetch(this.weatherBaseURI + query);
		const data = await response.json();
		return data[0];
	}

};



