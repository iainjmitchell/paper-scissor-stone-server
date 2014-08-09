var GameRulesFactory = function(rules){
	this.create = function(move){
		if (!move){
			return new InvalidMoveRule();
		}
		return new ValidMoveRule(move, rules);
	};	
};

var InvalidMoveRule = function(){
	this.beats = function(){ return false; };
};

var ValidMoveRule = function(move, rules){
	this.beats = function(opponentsMove){
		return rules[move].beats.indexOf(opponentsMove) !== -1 || !opponentsMove;
	};
};

module.exports = GameRulesFactory;