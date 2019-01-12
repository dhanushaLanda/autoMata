interface Tuple {
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
  private execute (alphabet : any){
    this.currentState = this.tuple.delta[this.currentState][alphabet];
  }

  private isFinalState (state) {
    return this.tuple.finalStates.indexOf(state) > -1 ;
  }

  public doesAccept (string: String) {
    let allCharsInString = string.split('');
    allCharsInString.map((char : String) => {
      this.execute(char);
    });
    return this.isFinalState(this.currentState);
  }
  
}
