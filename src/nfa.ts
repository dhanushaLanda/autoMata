import { DFA, Tuple } from "./dfa"; 
import { EpsilonHandler } from "./epsilonHandler";

export class NFA extends DFA {
  currentStates : string[];
  handler : EpsilonHandler;

  constructor(tuple : Tuple) {
    super(tuple);
    this.currentStates = [tuple.startState];
    this.handler = new EpsilonHandler(tuple.delta);
  }

  private isSystemInFinalState() {       
    return this.currentStates.some((state) => this.tuple.finalStates.indexOf(state) > -1);
  }
 

  private handleAllStates (alphabet) {
    let nextStates = [];
    this.currentStates = this.handler.handle(this.currentStates);
    this.currentStates.forEach(state => {
      let nextState = this.execute(alphabet,state);
      nextStates = nextStates.concat(nextState);
    });
    this.currentStates = nextStates;
  }

  public doesAccept (language : string) {
    let alphabets = language.split('');
    alphabets.forEach(alphabet => {
      this.handleAllStates(alphabet); 
    });
    return this.isSystemInFinalState();
  }
}