import { includes } from "../utils";
export class EpsilonHandler {

  private configuration : object;
  private handledStates : string[];

  constructor(configuration) {
    this.handledStates = [];
    this.configuration = configuration;
  }

  private doesHaveEpsilon ( state :string) {
    return this.configuration[state] && this.configuration[state].hasOwnProperty("e");
  }
  
  private epsilonStates (state) {
    if(!includes(state,this.handledStates)) {
      this.handledStates.push(state);
      this.nextEpsilonStates(state);
    };
  }

  private nextEpsilonStates(state) {
    if (this.doesHaveEpsilon(state)){
      let epsilonAppliedStates = this.configuration[state].e;
      epsilonAppliedStates.forEach(epsilonState => this.epsilonStates(epsilonState));
    };
  }

  public handle (currentStates : string[]) {
    this.handledStates = [];
    currentStates.forEach((state) => this.epsilonStates(state));
    return this.handledStates;
  }
}