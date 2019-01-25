
import { NFA } from "../src/nfa";
import * as cases from "./testCases/dfaTestCases.json";

const assertTrue = (entity,testCases) => {
  describe(`Automata type ${entity.constructor.name}`,()=> {
    return testCases.map((testCase) => {      
      it(`Should allow "${testCase}"`,() => {
        expect(entity.doesAccept(testCase)).toBeTruthy();
      })
    });
  });
};

const assertFalse = (entity,testCases) => {
  describe(`Automata type ${entity.constructor.name}`,()=> {
    return testCases.map( (testCase) => {
      it(`Should not allow "${testCase}"`,() => {
        expect(entity.doesAccept(testCase)).toBeFalsy();
      })
    });
  });
};
const runAllNfaTests = () => {
  return cases.default.map((testCase) => {
    let nfa = new NFA(testCase.tuple);
    assertTrue(nfa,testCase["pass-cases"]);
    assertFalse(nfa,testCase["fail-cases"])
  })
};

runAllNfaTests();
