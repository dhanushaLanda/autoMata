
import { DFA } from "../src/dfa";
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
const runAllDfaTests = () => {
  return cases.default.map((testCase) => {
    let dfa = new DFA(testCase.tuple);
    assertTrue(dfa,testCase["pass-cases"]);
    assertFalse(dfa,testCase["fail-cases"])
  })
};

runAllDfaTests();
