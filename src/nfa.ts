import { DFA, Tuple } from "./dfa"; 
import { EpsilonHandler } from "./epsilonHandler";

export class NFA {
  tuple : Tuple;
  currentStates : string[];
  epsilonHandler : EpsilonHandler;

  constructor(tuple : Tuple) {
    this.tuple = tuple;
    this.currentStates = [tuple.startState];
    this.epsilonHandler = new EpsilonHandler(tuple.delta);
  }

  private isSystemInFinalState() {       
    return this.currentStates.some((state) => this.tuple.finalStates.indexOf(state) > -1);
  }
 
  private execute (alphabet : string ,state : string) {
    let nextStates = this.tuple.delta[state] && this.tuple.delta[state][alphabet];
    return nextStates ? nextStates : 'DEAD' ;
  };

  private getNextStates (states,alphabet) {
    let epsilonedStates = this.epsilonHandler.handle(states);
    return epsilonedStates.reduce((nextStates : string [],state) => {
      nextStates = nextStates.concat(this.execute(alphabet,state));
      return nextStates;
    },[]);
  }

  public doesAccept (language : string) {
    let alphabets = language.split('');    
    this.currentStates = [this.tuple.startState];

    let nextStates = alphabets.reduce((states,alphabet) => {
      return this.getNextStates(states,alphabet); 
    },this.currentStates);

    this.currentStates = this.epsilonHandler.handle(nextStates);
    return this.isSystemInFinalState();
  }
}