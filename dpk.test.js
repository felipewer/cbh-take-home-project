const { deterministicPartitionKey } = require('./dpk');


describe('deterministicPartitionKey', () => {

  it('Returns the string "0" when no input is given', () => {
    expect(deterministicPartitionKey()).toBe('0');
  });

  it('Returns the string "0" when input is empty string', () => {
    expect(deterministicPartitionKey('')).toBe('0');
  });

  it('Returns hash when input is short string', () => {
    const input = 'abc';
    const key = '47070e8f45799540c361c6d92c2df5b2a54f25ff2a19bc8d2da1ef70ddcff117137baf4e206e56528e9eca14aea6a3ea24e4dfa942447d4a92dce09078f93128'
    expect(deterministicPartitionKey(input)).toBe(key);
  });

  it('Returns hash when input is string over max length', () => {
    const input = 'A'.repeat(257);
    const key = 'b51cc1b39e7906e29a967c67baac9197a32f33c1b853f6e89299e9e25fc13eccfecb28e455e173bdd50ff1b18e9d4bf72eb5dc2366b1f0bd6344ce5b510c4570'
    expect(deterministicPartitionKey(input)).toBe(key);
  });
  
  it('Returns hash when input is empty object', () => {
    const input = {};
    const key = 'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862'
    expect(deterministicPartitionKey(input)).toBe(key);
  });
  
  it('Returns hash when input is object without partitionKey property', () => {
    const input = { test: 'test' };
    const key = 'e713e2c89bc829e783a43a53583c0f8db2e9ad5f392f88d3a3be9776a5d6307ddaa4fb1d427c2390be1834bcf73646ddbbab8979eaf923e01376b3031ef9189d'
    expect(deterministicPartitionKey(input)).toBe(key);
  });

  it('Returns hash when input is object without partitionKey property whose JSON stringified value is above max length', () => {
    const input = { test: 'A'.repeat(257) };
    const key = '0dd687f85787ae03d69f79f2d8c1f7c864cd119bcb87af12c07a3407edb059b6998b910da0dc45c595b9b52b30e1ba39304bb9beaedb443fd450587b82d09b42'
    expect(deterministicPartitionKey(input)).toBe(key);
  });

  it('Returns partitionKey value when input is object with string partitionKey property bellow max length', () => {
    const input = { partitionKey: 'test' };
    const key = 'test'
    expect(deterministicPartitionKey(input)).toBe(key);
  });

  it('Returns hash when input is object with string partitionKey property above max length', () => {
    const input = { partitionKey: 'A'.repeat(257) };
    const key = '437dbfb4791398dad50bf115034dd483a1a365a3b16d270d6c7703c78fb060581a2d2d3e75315d4abaf9e93a1e11ac587056a873238d24ed3053db1885619f4a'
    expect(deterministicPartitionKey(input)).toBe(key);
  });

  it('Returns JSON stringified partitionKey value when input is object with inner object partitionKey property', () => {
    const input = { partitionKey: { test: 'test' }};
    const key = '{"test":"test"}'
    expect(deterministicPartitionKey(input)).toBe(key);
  });

  it('Returns hash when input is object with inner object partitionKey property whose JSON stringified value is above max length', () => {
    const input = { partitionKey: { test: 'A'.repeat(257) } };
    const key = '0dd687f85787ae03d69f79f2d8c1f7c864cd119bcb87af12c07a3407edb059b6998b910da0dc45c595b9b52b30e1ba39304bb9beaedb443fd450587b82d09b42'
    expect(deterministicPartitionKey(input)).toBe(key);
  });

});