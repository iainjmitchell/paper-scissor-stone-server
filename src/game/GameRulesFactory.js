var GameRulesFactory = function(){
	this.create = function(move){
		if (!move){
			return new InvalidMoveRule();
		}
		return new ValidMoveRule(move);
	};	
};

var InvalidMoveRule = function(){
	this.beats = function(){ return false; };
};

var ValidMoveRule = function(move){
	var rules = {
		"paper" : { beats : [undefined, "stone"] },
		"stone" : { beats : [undefined, "scissors"]},
		"scissors": { beats : []}
	};

	this.beats = function(opponentsMove){
		return rules[move].beats.indexOf(opponentsMove) !== -1;
	};
};

module.exports = GameRulesFactory;