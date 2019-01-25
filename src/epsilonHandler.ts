import { includes } from "../utils";
export class EpsilonHandler {

  configuration : object;
  handledStates : string[];

  constructor(configuration) {
    this.configuration = configuration;
  }

  private doesHaveEpsilon ( state :string) {
    if (this.configuration[state]) {
      return this.configuration[state].e != undefined;
    }
  }

  public getNextEpsilonedStates(state,allStates) {
    if (this.doesHaveEpsilon(state)){
      let epsilonAppliedStates = this.configuration[state].e;
      epsilonAppliedStates.forEach(epsilonedState => {
        if(!includes(epsilonedState,allStates) ) {
          allStates.push(epsilonedState);
          this.getNextEpsilonedStates(epsilonedState,allStates);
        }
      });
    }    
    return allStates; 
  }

  public handle (currentStates : string[]) {
    let activeStates :string[] =   [];
    currentStates.forEach(state => {
      this.getNextEpsilonedStates(state,activeStates);
      activeStates.push(state);
    });
    return activeStates;
  }
}