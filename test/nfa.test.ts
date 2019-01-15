
import { NFA } from "../src/nfa";
// import * as cases  from "./testCases";
import { DFA } from "../src/dfa";
import * as cases from "./testCases.json";

describe("NFA", () => {
  let nfa 
  let tuple;
  beforeEach( () => {
    tuple = {  
      "states":[  
        "q1",
        "q2"
      ],
      "alphabets":[  
        "1",
        "0"
      ],
      "delta":{  
        "q1":{  
          "0":[  
            "q2"
          ],
          "1":[  
            "q1"
          ],
          "e":[  
            "q2"
          ]
        },
        "q2":{  
          "1":[  
            "q2"
          ]
        }
      },
      "startState":"q1",
      "finalStates":[  
        "q2"
      ]
    };
    nfa = new NFA(tuple);
  })
  it("Should allow even number of 1's in the language" , () => {
    expect(nfa.doesAccept("1111")).toBeTruthy();
  })
})