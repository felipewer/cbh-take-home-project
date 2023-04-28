const crypto = require('crypto');


const hash = data => crypto
  .createHash("sha3-512")
  .update(data)
  .digest("hex");


const hasShortStringPartitionKey = (event, maxLength) => 
  event?.partitionKey
  && typeof event.partitionKey === 'string'
  && event.partitionKey.length < maxLength;


const hasLongStringPartitionKey = (event, maxLength) => 
  event?.partitionKey
  && typeof event.partitionKey === 'string'
  && event.partitionKey.length > maxLength;


  
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;
  
  if (!event) return TRIVIAL_PARTITION_KEY;

  if (hasShortStringPartitionKey(event, MAX_PARTITION_KEY_LENGTH)) {
    return event.partitionKey;
  }

  if (hasLongStringPartitionKey(event, MAX_PARTITION_KEY_LENGTH)) {
    return hash(event.partitionKey);
  }

  if (!event.partitionKey) {
    return hash(JSON.stringify(event));
  }

  const stringifiedPartitionKey = JSON.stringify(event.partitionKey);
  
  return (stringifiedPartitionKey.length < MAX_PARTITION_KEY_LENGTH)
    ? stringifiedPartitionKey
    :  hash(stringifiedPartitionKey);
};