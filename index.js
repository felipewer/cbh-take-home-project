const {deterministicPartitionKey} = require('./dpk');

console.log(deterministicPartitionKey());
console.log(deterministicPartitionKey(''));
console.log(deterministicPartitionKey('abc'));
console.log(deterministicPartitionKey('A'.repeat(257)));
console.log(deterministicPartitionKey({}));
console.log(deterministicPartitionKey({ test: 'test' }));
console.log(deterministicPartitionKey({ test: 'A'.repeat(257) }));
console.log(deterministicPartitionKey({ partitionKey: 'test'}));
console.log(deterministicPartitionKey({ partitionKey: 'A'.repeat(257)}));
console.log(deterministicPartitionKey({ partitionKey: { test: 'test' }}));
console.log(deterministicPartitionKey({ partitionKey: { test: 'A'.repeat(257) }}));
