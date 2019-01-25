import { EpsilonHandler } from "../src/epsilonHandler";
describe.only("EpsilonHandler",() => {
  it("Should give expected list after appling the epsilon on given input ",() => {
    let configuration = {  
      "q1":{  
        "e":[  
          "q2",
          "q4"
        ]
      },
      "q3":{  
        "0":[  
          "q3"
        ]
      },
      "q9":{  
        "e":[  
          "q7"
        ]
      },
      "q7":{  
        "1":[  
          "q8"
        ],
        "e":[  
          "q9"
        ]
      },
      "q2":{  
        "0":[  
          "q3"
        ]
      },
      "q8":{  
        "0":[  
          "q9"
        ]
      },
      "q5":{  
        "1":[  
          "q6"
        ]
      },
      "q6":{  
        "e":[  
          "q7",
          "q4"
        ]
      },
      "q4":{  
        "0":[  
          "q5"
        ],
        "e":[  
          "q6"
        ]
      }
    };
    
    let handler = new EpsilonHandler(configuration);
    expect(handler.handle(["q1"])).toEqual(["q1", "q2", "q4", "q6", "q7", "q9"]);
    expect(handler.handle(["q4"])).toEqual(["q4","q6","q7","q9"]);
  })
})