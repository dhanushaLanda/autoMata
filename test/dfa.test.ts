import {DFA} from '../src/dfa';

describe('DFA',() => {
  let tuple, dfa;

  beforeEach( () => {
    tuple = {
      states: ['q1', 'q2'],
      alphabets: ['1', '0'],
      delta: { 'q1': { '0': 'q2', '1': 'q1' }, 'q2': { '0': 'q1', '1': 'q2' } },
      startState: 'q1',
      finalStates: ['q2']
    };
      
    tuple = {"states":[  
      "q1",
      "q2"
    ],
    "alphabets":[  
      "1",
      "0"
    ],
    "delta":{  
      "q1":{  
        "0":"q2",
        "1":"q1"
      },
      "q2":{  
        "0":"q1",
        "1":"q2"
      }
    },
    "startState":"q1",
    "finalStates":[  
      "q2"
    ]};
    dfa = new DFA(tuple);
  });

  it("Should allow the string with odd number of 0's ",() => {  
    expect(dfa.doesAccept("000")).toBeTruthy();
  });

  it("should not allow the string with even number of 0's ",() => {  
    expect(dfa.doesAccept("00")).toBeFalsy();
  });
})