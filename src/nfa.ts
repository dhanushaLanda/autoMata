import { DFA, Tuple } from "./dfa"; 
import { EpsilonHandler } from "./epsilonHandler";
import { includes } from "../utils";

export class NFA {
  tuple : Tuple;
  epsilonHandler : EpsilonHandler;

  constructor(tuple : Tuple) {
    this.tuple = tuple;
    this.epsilonHandler = new EpsilonHandler(tuple.delta);
  }

  private isSystemInFinalState(states) {       
    return states.some((state) => includes(state,this.tuple.finalStates));
  }
 
  private getNextState (alphabet : string ,state : string) {
    let nextStates = this.tuple.delta[state];
    return (nextStates && nextStates[alphabet]) ?  nextStates[alphabet] : 'DEAD' ;
  };

  private getNextStates (states,alphabet) {
    let epsilonedStates = this.epsilonHandler.handle(states);
    return epsilonedStates.reduce((nextStates : string [],state) => {
      nextStates = nextStates.concat(this.getNextState(alphabet,state));
      return nextStates;
    },[]);
  }

  public doesAccept (language : string) {
    let alphabets = language.split('');    
    let nextStates = alphabets.reduce((states,alphabet) => {
      return this.getNextStates(states,alphabet); 
    },[this.tuple.startState]);
    return this.isSystemInFinalState(this.epsilonHandler.handle(nextStates));
  }
}