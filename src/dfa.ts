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

  protected  execute (alphabet : string){ 
    this.currentState = this.tuple.delta[this.currentState][alphabet];
  }

  private isFinalState (state) {    
    return this.tuple.finalStates.indexOf(state) > -1 ;
  }

  public doesAccept (language: string) {
    this.currentState = this.tuple.startState;
    let allCharsInString = language.split('');
    allCharsInString.forEach((char : string) => {
      this.execute(char);      
    });
    return this.isFinalState(this.currentState);
  }
  
}
