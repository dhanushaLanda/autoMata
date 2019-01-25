
import { NFA } from "../src/nfa";
import * as cases from "./testCases/dfaTestCases.json";
import { assertTrue, assertFalse} from "./assert";

const runAllNfaTests = () => {
  return cases.default.map((testCase) => {
    let nfa = new NFA(testCase.tuple);
    assertTrue(nfa,testCase["pass-cases"]);
    assertFalse(nfa,testCase["fail-cases"])
  })
};

runAllNfaTests();
