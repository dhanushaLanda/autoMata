import { includes } from "../utils";
export class EpsilonHandler {

  configuration : object;
  handledStates : string[];

  constructor(configuration) {
    this.handledStates = [];
    this.configuration = configuration;
  }

  private doesHaveEpsilon ( state :string) {
    if (this.configuration[state]) {
      return this.configuration[state].hasOwnProperty("e");
    }
  }
  
  private updateUniqEpsilonedStates (state) {
    if(!includes(state,this.handledStates) ) {
      this.handledStates.push(state);
      this.getNextEpsilonedStates(state);
    }
  }

  private getNextEpsilonedStates(state) {
    if (this.doesHaveEpsilon(state)){
      let epsilonAppliedStates = this.configuration[state].e;
      epsilonAppliedStates.forEach(epsilonedState => {
        this.updateUniqEpsilonedStates(epsilonedState);
      });
    };
  }

  public handle (currentStates : string[]) {
    return currentStates.reduce((nextStates : string[],state) => {
      nextStates.push(state);      
      this.getNextEpsilonedStates(state);
      return nextStates;
    },this.handledStates = []);
  }
}