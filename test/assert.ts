import { DFA } from "../src/dfa";
import { NFA } from "../src/nfa";

export const assertTrue = (entity : DFA | NFA,testCases : string[]) => {
  describe(`Automata's type ${entity.constructor.name}`,()=> {
    return testCases.map((testCase) => {      
      it(`Should allow "${testCase}"`,() => {
        expect(entity.doesAccept(testCase)).toBeTruthy();
      })
    });
  });
};

export const assertFalse = (entity : DFA | NFA,testCases : string[]) => {
  describe(`Automata's type ${entity.constructor.name}`,()=> {
    return testCases.map( (testCase) => {
      it(`Should not allow "${testCase}"`,() => {
        expect(entity.doesAccept(testCase)).toBeFalsy();
      })
    });
  });
};