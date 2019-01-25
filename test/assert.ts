export const assertTrue = (entity,testCases) => {
  describe(`Automata type ${entity.constructor.name}`,()=> {
    return testCases.map((testCase) => {      
      it(`Should allow "${testCase}"`,() => {
        expect(entity.doesAccept(testCase)).toBeTruthy();
      })
    });
  });
};

export const assertFalse = (entity,testCases) => {
  describe(`Automata type ${entity.constructor.name}`,()=> {
    return testCases.map( (testCase) => {
      it(`Should not allow "${testCase}"`,() => {
        expect(entity.doesAccept(testCase)).toBeFalsy();
      })
    });
  });
};