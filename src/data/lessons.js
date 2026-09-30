export const LESSONS = {
  // --- PYTHON LEVEL 1 ---
  'py-1-1': {
    id: 'py-1-1',
    courseId: 'python',
    levelId: 1,
    title: 'Introduction to Python',
    subtitle: 'Welcome to Python programming!',
    explanation: 'Python is a high-level, interpreted programming language known for its clear syntax and readability. It allows developers to write clean, concise logic for web apps, automation, data analysis, and AI.',
    keyConcepts: [
      'Indentation is used to define code blocks instead of curly braces.',
      'Interpreted execution: code runs line-by-line.',
      'Extremely clean and beginner-friendly syntax.'
    ],
    codeExample: `# Your very first Python script!
print("Hello, UpSkillX!")`,
    expectedOutput: `Hello, UpSkillX!`,
    tip: 'Python is case-sensitive! `print()` works, but `Print()` will raise a NameError.',
    prevLessonId: null,
    nextLessonId: 'py-1-2'
  },
  'py-1-2': {
    id: 'py-1-2',
    courseId: 'python',
    levelId: 1,
    title: 'Variables',
    subtitle: 'Storing data in memory',
    explanation: 'Variables are containers for storing data values. In Python, you do not need to explicitly declare data types; Python automatically determines the type when you assign a value using the `=` operator.',
    keyConcepts: [
      'Variables are created the moment you assign a value to them.',
      'Variable names must start with a letter or underscore `_`.',
      'Use snake_case for multi-word variable names (e.g. `user_name`).'
    ],
    codeExample: `name = "Sujay"
level = 1
xp = 850

print(name)
print("XP:", xp)`,
    expectedOutput: `Sujay
XP: 850`,
    tip: 'You can update variable values anytime simply by reassigning them.',
    prevLessonId: 'py-1-1',
    nextLessonId: 'py-1-3'
  },
  'py-1-3': {
    id: 'py-1-3',
    courseId: 'python',
    levelId: 1,
    title: 'Data Types',
    subtitle: 'Integers, floats, strings, and booleans',
    explanation: 'Python has built-in primitive data types: `int` for integers, `float` for decimals, `str` for text strings, and `bool` for True/False values. Use `type()` to check the data type of any object.',
    keyConcepts: [
      '`str`: Text wrapped in single or double quotes.',
      '`int`: Whole numbers without decimals.',
      '`float`: Real numbers with decimal points.',
      '`bool`: `True` or `False` (capitalized in Python).'
    ],
    codeExample: `user_name = "Sujay"    # str
streak_days = 7      # int
score_ratio = 4.5    # float
is_active = True     # bool

print(type(user_name))
print(type(streak_days))`,
    expectedOutput: `<class 'str'>
<class 'int'>`,
    tip: 'In Python, booleans `True` and `False` must start with an uppercase letter.',
    prevLessonId: 'py-1-2',
    nextLessonId: 'py-1-4'
  },
  'py-1-4': {
    id: 'py-1-4',
    courseId: 'python',
    levelId: 1,
    title: 'Input and Output',
    subtitle: 'Communicating with users',
    explanation: 'Output data using `print()`. Capture input from users using `input()`. Note that `input()` always returns a string, so cast it to `int()` or `float()` if you expect numbers.',
    keyConcepts: [
      '`print()` formats and displays messages to stdout.',
      '`input("Prompt: ")` pauses execution and waits for keyboard input.',
      'Type casting: `int(input())` converts string input to an integer.'
    ],
    codeExample: `# Simulating user interaction
student = "Sujay"
target_xp = 1000
current_xp = 850
needed = target_xp - current_xp

print(f"Student: {student}")
print(f"XP Needed for Next Rank: {needed}")`,
    expectedOutput: `Student: Sujay
XP Needed for Next Rank: 150`,
    tip: 'f-strings (`f"Hello {name}"`) are the cleanest way to insert variables into strings in Python 3.6+.',
    prevLessonId: 'py-1-3',
    nextLessonId: null
  },

  // --- PYTHON LEVEL 2 ---
  'py-2-1': {
    id: 'py-2-1',
    courseId: 'python',
    levelId: 2,
    title: 'if statement',
    subtitle: 'Making conditional decisions',
    explanation: 'The `if` statement evaluates a condition. If the condition is `True`, Python executes the indented block of code directly below it.',
    keyConcepts: [
      'Syntax: `if condition:` followed by an indented block.',
      'The block runs ONLY when condition evaluates to True.',
      'Standard indentation is 4 spaces.'
    ],
    codeExample: `xp = 850
if xp >= 500:
    print("Level 2 Unlocked!")`,
    expectedOutput: `Level 2 Unlocked!`,
    tip: 'Don’t forget the colon `:` at the end of the `if` statement line!',
    prevLessonId: null,
    nextLessonId: 'py-2-2'
  },
  'py-2-2': {
    id: 'py-2-2',
    courseId: 'python',
    levelId: 2,
    title: 'elif statement',
    subtitle: 'Handling multiple conditions',
    explanation: 'Use `elif` (short for else if) to test additional conditions if preceding conditions were `False`.',
    keyConcepts: [
      '`elif` runs only if all previous conditions in the chain were False.',
      'You can chain multiple `elif` blocks together.'
    ],
    codeExample: `score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")`,
    expectedOutput: `Grade: B`,
    tip: 'Conditions are checked from top to bottom; execution stops at the first True branch.',
    prevLessonId: 'py-2-1',
    nextLessonId: 'py-2-3'
  },
  'py-2-3': {
    id: 'py-2-3',
    courseId: 'python',
    levelId: 2,
    title: 'else statement',
    subtitle: 'The fallback condition',
    explanation: 'The `else` keyword catches anything not caught by preceding `if` or `elif` conditions.',
    keyConcepts: [
      'The `else` block takes no conditions.',
      'Acts as a default fallback action.'
    ],
    codeExample: `quiz_score = 55

if quiz_score >= 60:
    print("Quiz Passed! +50 XP")
else:
    print("Keep Practicing! Retry to pass.")`,
    expectedOutput: `Keep Practicing! Retry to pass.`,
    tip: 'Passing score in UpSkillX quizzes is 60%.',
    prevLessonId: 'py-2-2',
    nextLessonId: 'py-2-4'
  },
  'py-2-4': {
    id: 'py-2-4',
    courseId: 'python',
    levelId: 2,
    title: 'Comparison Operators',
    subtitle: 'Comparing values',
    explanation: 'Operators compare two values and evaluate to boolean `True` or `False`. Operators include `==` (equal), `!=` (not equal), `>`, `<`, `>=`, `<=`.',
    keyConcepts: [
      '`==` checks equality; `=` is for variable assignment.',
      '`!=` checks inequality.',
      'Combine conditions with `and`, `or`, and `not`.'
    ],
    codeExample: `streak = 7
badge_unlocked = streak >= 7 and streak < 30

print("Badge Earned:", badge_unlocked)`,
    expectedOutput: `Badge Earned: True`,
    tip: 'Careful not to confuse single `=` (assignment) with double `==` (equality check).',
    prevLessonId: 'py-2-3',
    nextLessonId: null
  },

  // --- PYTHON LEVEL 3 ---
  'py-3-1': {
    id: 'py-3-1',
    courseId: 'python',
    levelId: 3,
    title: 'for loop',
    subtitle: 'Iterating over sequences',
    explanation: 'A `for` loop is used to iterate over a sequence (such as a list, string, or range of numbers).',
    keyConcepts: [
      'Executes the body once for each item in the sequence.',
      'No manual loop counter management required.'
    ],
    codeExample: `badges = ["First Step", "Problem Solver", "7 Day Streak"]

for badge in badges:
    print(f"🏆 Unlocked: {badge}")`,
    expectedOutput: `🏆 Unlocked: First Step
🏆 Unlocked: Problem Solver
🏆 Unlocked: 7 Day Streak`,
    tip: 'You can loop through strings to inspect character by character as well.',
    prevLessonId: null,
    nextLessonId: 'py-3-2'
  },
  'py-3-2': {
    id: 'py-3-2',
    courseId: 'python',
    levelId: 3,
    title: 'while loop',
    subtitle: 'Condition-based iteration',
    explanation: 'A `while` loop repeatedly executes a target statement block as long as a given condition evaluates to `True`.',
    keyConcepts: [
      'Runs until condition becomes False.',
      'Be sure to update the condition variable to avoid infinite loops!'
    ],
    codeExample: `count = 1
while count <= 3:
    print(f"Lesson {count} completed!")
    count += 1`,
    expectedOutput: `Lesson 1 completed!
Lesson 2 completed!
Lesson 3 completed!`,
    tip: 'Use `break` to exit a loop early if a target condition is met.',
    prevLessonId: 'py-3-1',
    nextLessonId: 'py-3-3'
  },
  'py-3-3': {
    id: 'py-3-3',
    courseId: 'python',
    levelId: 3,
    title: 'range()',
    subtitle: 'Generating sequence numbers',
    explanation: 'The `range()` function returns a sequence of numbers, starting from 0 by default, incrementing by 1, and stopping before a specified number.',
    keyConcepts: [
      '`range(5)` -> 0, 1, 2, 3, 4',
      '`range(1, 6)` -> 1, 2, 3, 4, 5',
      '`range(0, 10, 2)` -> step count of 2 (0, 2, 4, 6, 8)'
    ],
    codeExample: `print("Counting level XP bonuses:")
for i in range(1, 4):
    print(f"Level {i}: +{i * 100} XP")`,
    expectedOutput: `Counting level XP bonuses:
Level 1: +100 XP
Level 2: +200 XP
Level 3: +300 XP`,
    tip: 'The upper bound in `range(start, stop)` is excluded!',
    prevLessonId: 'py-3-2',
    nextLessonId: 'py-3-4'
  },
  'py-3-4': {
    id: 'py-3-4',
    courseId: 'python',
    levelId: 3,
    title: 'Loop practice',
    subtitle: 'Nested loops and accumulators',
    explanation: 'Combining loops with accumulator variables allows you to calculate totals, compute averages, or iterate multi-dimensional datasets.',
    keyConcepts: [
      'Accumulator pattern: initialize `total = 0` before the loop.',
      'Nested loops: loop inside another loop.'
    ],
    codeExample: `quiz_scores = [80, 100, 60, 90]
total = 0
for score in quiz_scores:
    total += score

average = total / len(quiz_scores)
print(f"Average Score: {average}%")`,
    expectedOutput: `Average Score: 82.5%`,
    tip: '`len(list)` returns the total count of elements in a list.',
    prevLessonId: 'py-3-3',
    nextLessonId: null
  },

  // --- PYTHON LEVEL 4 ---
  'py-4-1': {
    id: 'py-4-1',
    courseId: 'python',
    levelId: 4,
    title: 'Function definition',
    subtitle: 'Creating reusable code blocks',
    explanation: 'Functions are reusable blocks of code that perform a specific task. Define a function using the `def` keyword followed by function name and parentheses `()`.',
    keyConcepts: [
      'Defines logic once and invokes it as many times as needed.',
      'Function body must be indented.'
    ],
    codeExample: `def greet_student():
    print("Welcome back to UpSkillX!")

greet_student()
greet_student()`,
    expectedOutput: `Welcome back to UpSkillX!
Welcome back to UpSkillX!`,
    tip: 'Functions improve readability and eliminate repeated code.',
    prevLessonId: null,
    nextLessonId: 'py-4-2'
  },
  'py-4-2': {
    id: 'py-4-2',
    courseId: 'python',
    levelId: 4,
    title: 'Parameters',
    subtitle: 'Passing information to functions',
    explanation: 'Parameters act as variables inside function definitions. Arguments are the actual values passed into the function when called.',
    keyConcepts: [
      'Specify parameters inside parentheses during `def`.',
      'Functions can accept multiple parameters separated by commas.'
    ],
    codeExample: `def reward_xp(student_name, xp_gained):
    print(f"{student_name} earned +{xp_gained} XP!")

reward_xp("Sujay", 20)
reward_xp("Aria", 50)`,
    expectedOutput: `Sujay earned +20 XP!
Aria earned +50 XP!`,
    tip: 'Default parameter values can be specified: `def reward(xp=10):`.',
    prevLessonId: 'py-4-1',
    nextLessonId: 'py-4-3'
  },
  'py-4-3': {
    id: 'py-4-3',
    courseId: 'python',
    levelId: 4,
    title: 'Return values',
    subtitle: 'Getting results back from functions',
    explanation: 'Use the `return` statement to send a calculated result back to the caller.',
    keyConcepts: [
      'The `return` keyword stops function execution immediately.',
      'Returned values can be saved into variables or used in expressions.'
    ],
    codeExample: `def calculate_total_xp(base_xp, bonus_xp):
    return base_xp + bonus_xp

final_score = calculate_total_xp(850, 100)
print(f"Total XP: {final_score}")`,
    expectedOutput: `Total XP: 950`,
    tip: 'Without an explicit `return` statement, a Python function returns `None`.',
    prevLessonId: 'py-4-2',
    nextLessonId: 'py-4-4'
  },
  'py-4-4': {
    id: 'py-4-4',
    courseId: 'python',
    levelId: 4,
    title: 'Function practice',
    subtitle: 'Building a mini helper module',
    explanation: 'Putting functions together to encapsulate complex application logic like calculating student level rank from total XP.',
    keyConcepts: [
      'Modularity: breaking large problems into small single-purpose functions.',
      'Clean return values.'
    ],
    codeExample: `def get_level(xp):
    if xp >= 1000:
        return 4
    elif xp >= 500:
        return 3
    elif xp >= 200:
        return 2
    return 1

current_level = get_level(850)
print(f"Student Level: {current_level}")`,
    expectedOutput: `Student Level: 3`,
    tip: 'Functions can call other functions inside their execution body!',
    prevLessonId: 'py-4-3',
    nextLessonId: null
  },

  // --- C LEVEL 1 ---
  'c-1-1': {
    id: 'c-1-1',
    courseId: 'c',
    levelId: 1,
    title: 'Introduction to C',
    subtitle: 'The foundational systems language',
    explanation: 'C is a powerful procedural programming language created by Dennis Ritchie. It provides low-level access to memory, clean syntax, and serves as the foundation for modern operating systems and compilers.',
    keyConcepts: [
      'Every C program must contain a `main()` function.',
      'Statements end with a semicolon `;`.',
      'Requires compilation before execution.'
    ],
    codeExample: `#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");
    return 0;
}`,
    expectedOutput: `Hello, C World!`,
    tip: 'The `\\n` escape character creates a new line in stdout.',
    prevLessonId: null,
    nextLessonId: 'c-1-2'
  },
  'c-1-2': {
    id: 'c-1-2',
    courseId: 'c',
    levelId: 1,
    title: 'Variables',
    subtitle: 'Declaring typed variables in memory',
    explanation: 'Unlike Python, C is statically typed. You must specify the variable’s data type (like `int`, `char`, `float`) when declaring it.',
    keyConcepts: [
      'Syntax: `datatype variableName = value;`',
      'Variable types cannot change after declaration.'
    ],
    codeExample: `#include <stdio.h>

int main() {
    int xp = 850;
    char rankGrade = 'A';
    
    printf("XP: %d\\nGrade: %c\\n", xp, rankGrade);
    return 0;
}`,
    expectedOutput: `XP: 850
Grade: A`,
    tip: "Single characters use single quotes 'A', while strings use double quotes \"Sujay\".",
    prevLessonId: 'c-1-1',
    nextLessonId: 'c-1-3'
  },
  'c-1-3': {
    id: 'c-1-3',
    courseId: 'c',
    levelId: 1,
    title: 'Data Types',
    subtitle: 'Primitive types in C',
    explanation: 'Core primitive types in C include `int` (integers), `float` (single-precision floating point), `double` (double-precision), and `char` (single byte character).',
    keyConcepts: [
      '`int`: 4 bytes on standard 64-bit systems.',
      '`float`: Decimal numbers with ~6-7 digits precision.',
      '`char`: Stores individual ASCII characters.'
    ],
    codeExample: `#include <stdio.h>

int main() {
    int level = 2;
    float accuracy = 94.5;
    
    printf("Level %d, Accuracy: %.1f%%\\n", level, accuracy);
    return 0;
}`,
    expectedOutput: `Level 2, Accuracy: 94.5%`,
    tip: 'Use `%.1f` in `printf` to format floating point numbers to 1 decimal place.',
    prevLessonId: 'c-1-2',
    nextLessonId: 'c-1-4'
  },
  'c-1-4': {
    id: 'c-1-4',
    courseId: 'c',
    levelId: 1,
    title: 'printf()',
    subtitle: 'Formatted output stream',
    explanation: 'The `printf()` function from `<stdio.h>` outputs formatted text to stdout using format specifiers like `%d`, `%f`, `%s`, and `%c`.',
    keyConcepts: [
      '`%d` or `%i`: integer',
      '`%f`: float / decimal',
      '`%c`: single character',
      '`%s`: string of characters'
    ],
    codeExample: `#include <stdio.h>

int main() {
    char student[] = "Sujay";
    int score = 100;
    
    printf("Student: %s | Score: %d\\n", student, score);
    return 0;
}`,
    expectedOutput: `Student: Sujay | Score: 100`,
    tip: 'Make sure format specifiers match the exact type of passed arguments in order.',
    prevLessonId: 'c-1-3',
    nextLessonId: 'c-1-5'
  },
  'c-1-5': {
    id: 'c-1-5',
    courseId: 'c',
    levelId: 1,
    title: 'scanf()',
    subtitle: 'Reading user input from stdin',
    explanation: 'The `scanf()` function reads formatted input from the user keyboard. Address-of operator `&` is required for non-array variables to pass their memory location.',
    keyConcepts: [
      '`scanf("%d", &variable)` stores entered integer.',
      'The `&` prefix passes memory address location to `scanf`.'
    ],
    codeExample: `#include <stdio.h>

int main() {
    int entered_xp = 150; // Simulating scanf input
    printf("You gained: %d XP\\n", entered_xp);
    return 0;
}`,
    expectedOutput: `You gained: 150 XP`,
    tip: 'For strings, array names already point to memory addresses, so `&` is omitted for strings in scanf.',
    prevLessonId: 'c-1-4',
    nextLessonId: null
  },

  // --- C LEVEL 2 ---
  'c-2-1': {
    id: 'c-2-1',
    courseId: 'c',
    levelId: 2,
    title: 'if',
    subtitle: 'Conditional execution in C',
    explanation: 'The `if` statement executes a block of code enclosed in curly braces `{}` if the condition in parentheses evaluates to true (non-zero).',
    keyConcepts: [
      'In C, zero represents false, any non-zero value represents true.',
      'Curly braces `{}` enclose statement blocks.'
    ],
    codeExample: `#include <stdio.h>

int main() {
    int streak = 7;
    if (streak >= 7) {
        printf("7-Day Streak Badge Unlocked!\\n");
    }
    return 0;
}`,
    expectedOutput: `7-Day Streak Badge Unlocked!`,
    tip: 'Always enclose your condition in parentheses `if (condition)`.',
    prevLessonId: null,
    nextLessonId: 'c-2-2'
  },
  'c-2-2': {
    id: 'c-2-2',
    courseId: 'c',
    levelId: 2,
    title: 'else',
    subtitle: 'Alternative code branch',
    explanation: 'Use the `else` block to execute alternative logic when the `if` condition evaluates to false (0).',
    keyConcepts: [
      'Executes when parent condition fails.',
      'Keeps decision branches clear and predictable.'
    ],
    codeExample: `#include <stdio.h>

int main() {
    int score = 45;
    if (score >= 60) {
        printf("Pass\\n");
    } else {
        printf("Fail - Needs practice\\n");
    }
    return 0;
}`,
    expectedOutput: `Fail - Needs practice`,
    tip: 'Keep your curly braces nicely formatted for clean code readability.',
    prevLessonId: 'c-2-1',
    nextLessonId: 'c-2-3'
  },
  'c-2-3': {
    id: 'c-2-3',
    courseId: 'c',
    levelId: 2,
    title: 'else if',
    subtitle: 'Chaining conditions',
    explanation: 'Use `else if` to test subsequent conditions when earlier conditions evaluate to false.',
    keyConcepts: [
      'Allows multiple conditional checks in sequence.',
      'First matching condition executes; rest are skipped.'
    ],
    codeExample: `#include <stdio.h>

int main() {
    int mark = 88;
    if (mark >= 90) printf("Grade: S\\n");
    else if (mark >= 80) printf("Grade: A\\n");
    else if (mark >= 70) printf("Grade: B\\n");
    else printf("Grade: C\\n");
    return 0;
}`,
    expectedOutput: `Grade: A`,
    tip: 'Single line statements in C can omit `{}` but using curly braces is safer.',
    prevLessonId: 'c-2-2',
    nextLessonId: 'c-2-4'
  },
  'c-2-4': {
    id: 'c-2-4',
    courseId: 'c',
    levelId: 2,
    title: 'Comparison operators',
    subtitle: 'Relational and logical operators',
    explanation: 'Relational operators (`==`, `!=`, `>`, `<`, `>=`, `<=`) combined with logical operators (`&&` AND, `||` OR, `!` NOT).',
    keyConcepts: [
      '`&&` returns true only if BOTH operands are true.',
      '`||` returns true if AT LEAST ONE operand is true.',
      '`!` negates a boolean result.'
    ],
    codeExample: `#include <stdio.h>

int main() {
    int level = 2;
    int completed_quizzes = 1;
    
    if (level >= 2 && completed_quizzes >= 1) {
        printf("Eligible for Intermediate Badges\\n");
    }
    return 0;
}`,
    expectedOutput: `Eligible for Intermediate Badges`,
    tip: '`&&` has higher precedence than `||` in C logical expressions.',
    prevLessonId: 'c-2-3',
    nextLessonId: null
  },

  // --- C LEVEL 3 ---
  'c-3-1': {
    id: 'c-3-1',
    courseId: 'c',
    levelId: 3,
    title: 'for',
    subtitle: 'Counter-controlled loops',
    explanation: 'The `for` loop combines initialization, condition check, and increment/decrement step in a single clean header line.',
    keyConcepts: [
      'Syntax: `for (init; condition; update) { ... }`',
      'Ideal when total iteration count is known ahead of time.'
    ],
    codeExample: `#include <stdio.h>

int main() {
    for (int i = 1; i <= 3; i++) {
        printf("Completed C Module %d\\n", i);
    }
    return 0;
}`,
    expectedOutput: `Completed C Module 1
Completed C Module 2
Completed C Module 3`,
    tip: 'The counter variable `i` can be declared inside the `for` statement header in C99+.',
    prevLessonId: null,
    nextLessonId: 'c-3-2'
  },
  'c-3-2': {
    id: 'c-3-2',
    courseId: 'c',
    levelId: 3,
    title: 'while',
    subtitle: 'Pre-test loop iteration',
    explanation: 'The `while` loop checks the condition BEFORE entering the loop body. It repeats as long as the condition remains non-zero (true).',
    keyConcepts: [
      'Checks condition before executing loop body.',
      'If initial condition is false, loop body executes 0 times.'
    ],
    codeExample: `#include <stdio.h>

int main() {
    int lessons = 4;
    while (lessons > 0) {
        printf("%d lessons remaining in level\\n", lessons);
        lessons--;
    }
    return 0;
}`,
    expectedOutput: `4 lessons remaining in level
3 lessons remaining in level
2 lessons remaining in level
1 lessons remaining in level`,
    tip: '`lessons--` decrements the variable value by 1.',
    prevLessonId: 'c-3-1',
    nextLessonId: 'c-3-3'
  },
  'c-3-3': {
    id: 'c-3-3',
    courseId: 'c',
    levelId: 3,
    title: 'do-while',
    subtitle: 'Post-test loop iteration',
    explanation: 'The `do-while` loop executes its body AT LEAST ONCE before evaluating the condition at the end.',
    keyConcepts: [
      'Guarantees execution of loop body at least once.',
      'Syntax ends with a semicolon: `do { ... } while (condition);`'
    ],
    codeExample: `#include <stdio.h>

int main() {
    int attempts = 1;
    do {
        printf("Simulating code execution attempt %d\\n", attempts);
        attempts++;
    } while (attempts <= 2);
    return 0;
}`,
    expectedOutput: `Simulating code execution attempt 1
Simulating code execution attempt 2`,
    tip: 'Remember the semicolon `;` after `while (condition)` in `do-while` loops!',
    prevLessonId: 'c-3-2',
    nextLessonId: null
  },

  // --- C LEVEL 4 ---
  'c-4-1': {
    id: 'c-4-1',
    courseId: 'c',
    levelId: 4,
    title: 'Function declaration',
    subtitle: 'Prototypes and function definitions',
    explanation: 'Functions in C must be declared (prototyped) or defined before they are called in `main()`. A declaration specifies function return type, name, and parameter types.',
    keyConcepts: [
      'Prototype tells compiler about function signature.',
      'Prevents implicit declaration compilation warnings.'
    ],
    codeExample: `#include <stdio.h>

void showHeader() {
    printf("==================\\n");
    printf("  UpSkillX C Engine  \\n");
    printf("==================\\n");
}

int main() {
    showHeader();
    return 0;
}`,
    expectedOutput: `==================
  UpSkillX C Engine  
==================`,
    tip: 'Return type `void` indicates that the function does not return any value.',
    prevLessonId: null,
    nextLessonId: 'c-4-2'
  },
  'c-4-2': {
    id: 'c-4-2',
    courseId: 'c',
    levelId: 4,
    title: 'Parameters',
    subtitle: 'Pass by value in C',
    explanation: 'Parameters allow data to be passed into functions. In C, parameters are passed by value by default (a copy is created).',
    keyConcepts: [
      'Specify parameter data types in function header.',
      'Modifications to parameters inside function do not affect original variables unless pointers are used.'
    ],
    codeExample: `#include <stdio.h>

void addBonus(int currentXP, int bonus) {
    printf("New total: %d XP\\n", currentXP + bonus);
}

int main() {
    addBonus(850, 100);
    return 0;
}`,
    expectedOutput: `New total: 950 XP`,
    tip: 'For modifying original variables directly, C uses pointer addresses (`int *var`).',
    prevLessonId: 'c-4-1',
    nextLessonId: 'c-4-3'
  },
  'c-4-3': {
    id: 'c-4-3',
    courseId: 'c',
    levelId: 4,
    title: 'Return values',
    subtitle: 'Returning data from C functions',
    explanation: 'The `return` statement computes a value and exits function execution, passing control and result back to caller.',
    keyConcepts: [
      'Return data type must match the function return type signature.',
      'Functions stop immediately upon reaching `return`.'
    ],
    codeExample: `#include <stdio.h>

int multiply(int a, int b) {
    return a * b;
}

int main() {
    int total = multiply(5, 30);
    printf("Gained XP: %d\\n", total);
    return 0;
}`,
    expectedOutput: `Gained XP: 150`,
    tip: 'In `main()`, returning 0 signals successful program termination to the OS.',
    prevLessonId: 'c-4-2',
    nextLessonId: null
  }
};
