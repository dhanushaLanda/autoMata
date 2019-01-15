export interface Tuple {
  states : string[];
  alphabets : string[];
  delta : {};
  startState : string;
  finalStates : string[];
}
export class DFA {

  tuple : Tuple;
  currentState : string;

  constructor(tuple : Tuple){
    this.tuple = tuple;
    this.currentState = tuple.startState;
  }

  protected  execute (alphabet : string, state : string){ 
    let nextStates = this.tuple.delta[state][alphabet];
    return nextStates ? nextStates : [];
  }

  private isFinalState (state) {    
    return this.tuple.finalStates.indexOf(state) > -1 ;
  }

  public doesAccept (language: string) {
    let allCharsInString = language.split('');
    allCharsInString.forEach((char : string) => {
      this.currentState = this.execute(char,this.currentState);      
    });
    return this.isFinalState(this.currentState);
  }
  
}
