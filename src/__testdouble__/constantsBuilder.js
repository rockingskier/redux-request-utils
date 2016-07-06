import { expect } from 'chai';


describe('constantsBuilder', () => {
  let ConstantCreator;
  let constantsBuilder;
  let constantCreator;

  before(() => {
    ConstantCreator = require('constant-creator').default;
    constantsBuilder = require('../constantsBuilder.js').constantsBuilder;
  });

  beforeEach(() => {
    constantCreator = new ConstantCreator('@@test');
  });

  it('should create a REQUEST constant', () => {
    const constants = constantsBuilder(constantCreator);

    expect(constants.REQUEST).to.equal('@@test/REQUEST');
  });

  it('should create a PENDING constant', () => {
    const constants = constantsBuilder(constantCreator);

    expect(constants.PENDING).to.equal('@@test/PENDING');
  });

  it('should create a SUCCESS constant', () => {
    const constants = constantsBuilder(constantCreator);

    expect(constants.SUCCESS).to.equal('@@test/SUCCESS');
  });

  it('should create a FAILURE constant', () => {
    const constants = constantsBuilder(constantCreator);

    expect(constants.FAILURE).to.equal('@@test/FAILURE');
  });

  it('should namespace the constants if a namespace is provided', () => {
    const constants = constantsBuilder(constantCreator, 'MODULE');

    expect(constants.REQUEST).to.equal('@@test/MODULE/REQUEST');
    expect(constants.PENDING).to.equal('@@test/MODULE/PENDING');
    expect(constants.SUCCESS).to.equal('@@test/MODULE/SUCCESS');
    expect(constants.FAILURE).to.equal('@@test/MODULE/FAILURE');
  });
});
