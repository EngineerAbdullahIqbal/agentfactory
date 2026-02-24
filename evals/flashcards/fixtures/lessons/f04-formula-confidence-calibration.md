# Confidence Calibration for Agent Answers

A useful confidence signal combines model confidence and retrieval evidence.

Define:

- `p_model`: model-estimated probability of correctness
- `e_retrieval`: evidence score from retrieval quality (0 to 1)

A simple calibrated confidence score is:

`C = 0.7 * p_model + 0.3 * e_retrieval`

If retrieval evidence is weak, confidence should drop even if the model sounds certain.

Error rate and confidence should move together. One common metric is Expected Calibration Error (ECE):

`ECE = sum_k (|acc(k) - conf(k)| * n(k) / N)`

Where:

- `acc(k)` is empirical accuracy in bin `k`
- `conf(k)` is mean confidence in bin `k`
- `n(k)` is bin count
- `N` is total samples

A lower ECE is better. Teams often set a release threshold such as `ECE <= 0.05`.

Calibration is not only math; it changes product behavior. If `C < 0.4`, an agent should abstain or ask for clarification instead of answering directly. If `0.4 <= C < 0.7`, it should answer with caveats. If `C >= 0.7`, it can answer directly and cite evidence.
