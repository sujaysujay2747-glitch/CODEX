export const PRACTICE_PROBLEMS = {
  'py-prac-1': {
    id: 'py-prac-1',
    courseId: 'python',
    levelId: 1,
    title: 'Beginner Python: Sum & Welcome',
    difficulty: 'Easy',
    xpReward: 10,
    description: 'Write a Python program that accepts two numbers `a` and `b`, calculates their sum, and prints a formatted welcome message with the total.',
    inputDescription: 'Two integer numbers a = 15, b = 25',
    outputDescription: 'Printed message: "Welcome Sujay! Total: 40"',
    exampleInput: 'a = 15, b = 25',
    exampleOutput: 'Welcome Sujay! Total: 40',
    starterCode: `# Level 1 Practice — Python Basics
name = "Sujay"
a = 15
b = 25

# Calculate total sum and print output
total = a + b
print(f"Welcome {name}! Total: {total}")
`,
    testCases: [
      { id: 1, name: 'Basic addition test', input: 'a=15, b=25', expected: 'Welcome Sujay! Total: 40', status: 'Passed' },
      { id: 2, name: 'Negative numbers test', input: 'a=-5, b=10', expected: 'Welcome Sujay! Total: 5', status: 'Passed' },
      { id: 3, name: 'Zero value test', input: 'a=0, b=100', expected: 'Welcome Sujay! Total: 100', status: 'Passed' }
    ]
  },
  'py-prac-2': {
    id: 'py-prac-2',
    courseId: 'python',
    levelId: 2,
    title: 'Conditions: Grade Qualifier',
    difficulty: 'Easy',
    xpReward: 10,
    description: 'Write Python logic to evaluate a quiz score. If the score is 60 or above, print "PASSED", otherwise print "RETRY".',
    inputDescription: 'An integer `score = 85`',
    outputDescription: '"PASSED"',
    exampleInput: 'score = 85',
    exampleOutput: 'PASSED',
    starterCode: `# Level 2 Practice — Python Conditions
score = 85

if score >= 60:
    print("PASSED")
else:
    print("RETRY")
`,
    testCases: [
      { id: 1, name: 'Score >= 60 check', input: 'score = 85', expected: 'PASSED', status: 'Passed' },
      { id: 2, name: 'Exact threshold check', input: 'score = 60', expected: 'PASSED', status: 'Passed' },
      { id: 3, name: 'Failing score check', input: 'score = 45', expected: 'RETRY', status: 'Passed' }
    ]
  },
  'py-prac-3': {
    id: 'py-prac-3',
    courseId: 'python',
    levelId: 3,
    title: 'Loops: Print Even Numbers',
    difficulty: 'Medium',
    xpReward: 10,
    description: 'Use a `for` loop and `range()` to print all even numbers between 2 and 10 (inclusive).',
    inputDescription: 'None (range from 2 to 10)',
    outputDescription: '2 4 6 8 10',
    exampleInput: 'range(2, 11, 2)',
    exampleOutput: '2\n4\n6\n8\n10',
    starterCode: `# Level 3 Practice — Python Loops
for num in range(2, 11, 2):
    print(num)
`,
    testCases: [
      { id: 1, name: 'Evens sequence range test', input: 'range(2, 11, 2)', expected: '2, 4, 6, 8, 10', status: 'Passed' },
      { id: 2, name: 'Boundary inclusive check', input: 'upper limit = 10', expected: '10 included', status: 'Passed' }
    ]
  },
  'py-prac-4': {
    id: 'py-prac-4',
    courseId: 'python',
    levelId: 4,
    title: 'Functions: Calculate Square',
    difficulty: 'Medium',
    xpReward: 10,
    description: 'Define a Python function `square(n)` that accepts an integer `n` and returns its square value.',
    inputDescription: 'n = 7',
    outputDescription: '49',
    exampleInput: 'square(7)',
    exampleOutput: '49',
    starterCode: `# Level 4 Practice — Python Functions
def square(n):
    return n * n

result = square(7)
print(result)
`,
    testCases: [
      { id: 1, name: 'Square of 7 test', input: 'n = 7', expected: '49', status: 'Passed' },
      { id: 2, name: 'Square of 0 test', input: 'n = 0', expected: '0', status: 'Passed' },
      { id: 3, name: 'Square of negative number test', input: 'n = -4', expected: '16', status: 'Passed' }
    ]
  },

  // --- C PRACTICE ---
  'c-prac-1': {
    id: 'c-prac-1',
    courseId: 'c',
    levelId: 1,
    title: 'Beginner C: Sum of Two Numbers',
    difficulty: 'Easy',
    xpReward: 10,
    description: 'Write a C program that declares two integer variables `num1 = 12` and `num2 = 18`, calculates their sum, and prints the result using `printf()`.',
    inputDescription: 'num1 = 12, num2 = 18',
    outputDescription: 'Sum: 30',
    exampleInput: 'num1 = 12, num2 = 18',
    exampleOutput: 'Sum: 30',
    starterCode: `#include <stdio.h>

int main() {
    int num1 = 12;
    int num2 = 18;
    int sum = num1 + num2;
    printf("Sum: %d\\n", sum);
    return 0;
}
`,
    testCases: [
      { id: 1, name: 'Positive integers sum', input: 'num1=12, num2=18', expected: 'Sum: 30', status: 'Passed' },
      { id: 2, name: 'Format specifier verification', input: '%d used properly', expected: 'Output parsed correctly', status: 'Passed' }
    ]
  },
  'c-prac-2': {
    id: 'c-prac-2',
    courseId: 'c',
    levelId: 2,
    title: 'Conditions: Find Maximum of Two Numbers',
    difficulty: 'Easy',
    xpReward: 10,
    description: 'Write C logic using `if-else` to compare two integers `a = 45` and `b = 72` and print which one is maximum.',
    inputDescription: 'a = 45, b = 72',
    outputDescription: 'Maximum: 72',
    exampleInput: 'a = 45, b = 72',
    exampleOutput: 'Maximum: 72',
    starterCode: `#include <stdio.h>

int main() {
    int a = 45;
    int b = 72;
    
    if (a > b) {
        printf("Maximum: %d\\n", a);
    } else {
        printf("Maximum: %d\\n", b);
    }
    return 0;
}
`,
    testCases: [
      { id: 1, name: 'b greater than a test', input: 'a=45, b=72', expected: 'Maximum: 72', status: 'Passed' },
      { id: 2, name: 'a greater than b test', input: 'a=100, b=20', expected: 'Maximum: 100', status: 'Passed' }
    ]
  },
  'c-prac-3': {
    id: 'c-prac-3',
    courseId: 'c',
    levelId: 3,
    title: 'Loops: Sum of First N Natural Numbers',
    difficulty: 'Medium',
    xpReward: 10,
    description: 'Use a `for` loop in C to compute the sum of numbers from 1 to N (where N = 5).',
    inputDescription: 'N = 5',
    outputDescription: 'Sum = 15',
    exampleInput: 'N = 5',
    exampleOutput: 'Sum = 15',
    starterCode: `#include <stdio.h>

int main() {
    int N = 5;
    int total = 0;
    for (int i = 1; i <= N; i++) {
        total += i;
    }
    printf("Sum = %d\\n", total);
    return 0;
}
`,
    testCases: [
      { id: 1, name: 'Sum from 1 to 5', input: 'N = 5', expected: 'Sum = 15', status: 'Passed' },
      { id: 2, name: 'Sum from 1 to 10', input: 'N = 10', expected: 'Sum = 55', status: 'Passed' }
    ]
  },
  'c-prac-4': {
    id: 'c-prac-4',
    courseId: 'c',
    levelId: 4,
    title: 'Functions: Check Even or Odd',
    difficulty: 'Medium',
    xpReward: 10,
    description: 'Write a C function `isEven(int num)` that returns 1 if `num` is even and 0 if `num` is odd.',
    inputDescription: 'num = 8',
    outputDescription: '1',
    exampleInput: 'isEven(8)',
    exampleOutput: '1 (Even)',
    starterCode: `#include <stdio.h>

int isEven(int num) {
    return num % 2 == 0;
}

int main() {
    int result = isEven(8);
    printf("Is Even: %d\\n", result);
    return 0;
}
`,
    testCases: [
      { id: 1, name: 'Even number check', input: 'num = 8', expected: '1', status: 'Passed' },
      { id: 2, name: 'Odd number check', input: 'num = 7', expected: '0', status: 'Passed' }
    ]
  }
};
