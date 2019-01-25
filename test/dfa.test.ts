
import { DFA } from "../src/dfa";
import * as cases from "./testCases/dfaTestCases.json";
import { assertTrue, assertFalse } from "./assert";

const runAllDfaTests = () => {
  return cases.default.map((testCase) => {
    let dfa = new DFA(testCase.tuple);
    assertTrue(dfa,testCase["pass-cases"]);
    assertFalse(dfa,testCase["fail-cases"])
  })
};

runAllDfaTests();
