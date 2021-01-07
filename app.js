// Model
class Team {
	constructor(teamName) {
		this.teamName = teamName;
		this.score = 0;
	}

	winPoints(points) {
		this.score += points;
	}

	losePoints(points) {
		this.score += points;
	}
}

class Tile {
	constructor(pointValue, questionPrompt, answer){
		this._pointValue = pointValue;
		this.questionPrompt = questionPrompt;
		this.answer = answer;
		this.flipped = false;
		this.dailyDouble = false;
	}

	askQuestion() {
		flipped = true;
		return this.questionPrompt;
	}

	// Daily double here means question is secretly worth twice the number of points
	get pointValue() {
		if (dailyDouble) {
			return 2 * this._pointValue;
		}
		return this._pointValue;
	}
	// maybe add submitAnswer to handle daily double according to real jeopardy rules

}

class Column {
	constructor(category, tiles) {
		this.category = category;
		this.tiles = tiles
	}
}

// No support for final jeopardy
class Game {
	constructor(numTeams) {
		this._BASE_COLUMN_VALUES = [100,200,300,400,500]

		this.teams = [];
		this._createTeams(numTeams);

		this.board = [];
		this._newBoard(1); // list of columns
	}

	static offset = 0;

	_createTeams(numTeams) {
		for (let i = 0; i < numTeams; i++) {
			let team = new Team(`Team ${i+1}`);
			this.teams.push(team);
		}
	}

	_newBoard(mulitplier) {
		let columns = [];
		// only makes 6 column boards
		for (let col = 0; col < 6; col++) {
			this._addColumn();
		}
	}


	_addColumn() {
		let categoryToReturn ="test";

		let url = new URL('https://jservice.io/api/categories');
		let params = {count: 1, offset: Game.offset}

		url.search = new URLSearchParams(params).toString();

		// const response = await fetch(url);
		// const result = await response.json();
		// console.log(JSON.stringify(result));
		// return response.then((x) => x);
		return fetch(url)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				categoryToReturn = data[0];
			})
			.then(() => {
				Game.offset++;
				 return categoryToReturn;				
			})
			// .then(x=>x);
	}


	nextRound() {
		this._newBoard(2);
	}
}


// View