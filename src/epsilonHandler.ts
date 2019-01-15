import { includes } from "../utils";
export class EpsilonHandler {

  configuration : object;

  constructor(configuration) {
    this.configuration = configuration;
  }

  private doesHaveEpsilon ( state ) {
    if (state) {
      return this.configuration[state].e != undefined;
    }
  }

  private getAllStatesRecuresivly(state,allStates) {
    if (this.doesHaveEpsilon(state) && !includes(state,allStates)) {
      let epsilonAppliedStates = this.configuration[state].e;
      epsilonAppliedStates.forEach(epsilonedState => {
        allStates.push(epsilonedState);
        this.getAllStatesRecuresivly(epsilonedState,allStates);
      });
    }    
    return allStates; 
  }

  public handle (currentStates : string[]) {
    let activeStates :string[] =   [];
    currentStates.forEach(state => {
      this.getAllStatesRecuresivly(state,activeStates);
      activeStates.push(state);
    });
    return activeStates;
  }
}