import { EpsilonHandler } from "../src/epsilonHandler";
describe.only("EpsilonHandler",() => {
  it("handler",() => {
    let configuration = {  
      "q1":{  
        "e":[  
          "q2",
          "q4"
        ] 
      },
      "q2":{  
        "0":[  
          "q3"
        ],
        "1":[  
          "q2"
        ]
      },
      "q3":{  
        "0":[  
          "q2"
        ],
        "1":[  
          "q3"
        ]
      },
      "q4":{ 
        "e":[  
          "q2",
        ], 
        "0":[  
          "q4"
        ],
        "1":[  
          "q5"
        ]
      },
      "q5":{  
        "0":[  
          "q5"
        ],
        "1":[  
          "q4"
        ]
      }
    };
    let handler = new EpsilonHandler(configuration);
    expect(handler.handle(["q1"])).toEqual(["q1","q2","q4"]);
  })
})