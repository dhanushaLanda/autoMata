import { NFA } from "../src/nfa";

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
            "q1"
          ],
          "1":[
            "q1",
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
    }
    nfa = new NFA(tuple);
  })
  it.only("Should allow even number of 1's in the language" , () => {
    expect(nfa.doesAccept("01"))
  })
})