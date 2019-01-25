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
    let nextStates = this.tuple.delta[state][alphabet];
    return nextStates ? nextStates : [] ;
  };

  private handleAllStates (alphabet) {
    let nextStates = [];
    this.currentStates = this.epsilonHandler.handle(this.currentStates);
    this.currentStates.forEach(state => {
      let nextState = this.execute(alphabet,state);
      nextStates = nextStates.concat(nextState);
    });
    this.currentStates = nextStates;
  }

  public doesAccept (language : string) {
    this.currentStates = [this.tuple.startState];
    let alphabets = language.split('');
    alphabets.forEach(alphabet => {
      this.handleAllStates(alphabet); 
    });
    return this.isSystemInFinalState();
  }
}