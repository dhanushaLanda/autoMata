import { DFA, Tuple } from "./dfa";

export class NFA extends DFA {
  currentStates : string[];

  constructor(tuple : Tuple) {
    super(tuple);
    this.currentStates = [tuple.startState];
  }

  private isSystemInFinalState() {       
     
    return this.currentStates.some((state) => this.tuple.finalStates.indexOf(state) > -1);
  }

  public doesAccept (language : string) {
    let languageChars = language.split('');
    let nextStates : any[] = [];
    languageChars.forEach(char => {       
      this.currentStates.forEach(state => {
        let nextState = this.execute(char,state);        
        nextStates = nextState ? nextStates.concat(nextState) : nextStates;
      });                  
      this.currentStates = nextStates;      
      nextStates = [];
    });
    return this.isSystemInFinalState();

  }
}