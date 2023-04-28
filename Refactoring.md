# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

### Preparation

To create the unit tests I first looked into the original implementation to find out what types of inputs it expects. Then I used the "index.js" file to call the function with a sample of each type of input I identified from before to recover valid outputs. I then used those outputs to create the unit tests using hardcoded expected values for each situation. This way I could start to refactor with confidence. 

### Refactoring

My approach to readable code is to make it look like a linear story as much as possible to reduce the cognitive load of multiple branches. So I separated each possible situation into a distinct condition section with early returns. I kept simple conditions inline and extracted the more complex ones into separate functions with descriptive names. That way, for the most part, one does not need to keep the whole function in the head to understand what is happening at the specific portion. I also extracted the hashing into a separate function as it was used multiple times.