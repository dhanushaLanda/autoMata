import {  Tuple } from "./dfa";
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
    let nextStates = this.tuple.delta[state] && this.tuple.delta[state][alphabet];
    return nextStates ?  nextStates : 'DEAD' ;
  };

  private translate (states,alphabet) {
    let epsilonStates = this.epsilonHandler.handle(states);
    return epsilonStates.reduce((nextStates : string [],state) => {
      nextStates = nextStates.concat(this.getNextState(alphabet,state));
      return nextStates;
    },[]);
  }

  public doesAccept (language : string) {
    let alphabets = language.split('');    
    let nextStates = alphabets.reduce((states,alphabet) => this.translate(states,alphabet),[this.tuple.startState]); 
    return this.isSystemInFinalState(this.epsilonHandler.handle(nextStates));
  }
}