export const QUIZZES = {
  // --- PYTHON QUIZZES ---
  'py-quiz-1': {
    id: 'py-quiz-1',
    courseId: 'python',
    levelId: 1,
    title: 'Python Level 1 Quiz — Basics',
    description: 'Test your understanding of Python syntax, variables, data types, and IO operations.',
    xpReward: 50,
    passingScorePercentage: 60,
    questions: [
      {
        id: 1,
        question: 'What is the correct way to print text in Python?',
        options: ['scanf("Hello")', 'print("Hello")', 'printf("Hello")', 'output("Hello")'],
        correctIndex: 1,
        explanation: 'In Python, print() is the built-in function to display text to stdout.'
      },
      {
        id: 2,
        question: 'How do you create a variable named `score` with value 10 in Python?',
        options: ['int score = 10;', 'var score = 10;', 'score := 10;', 'score = 10'],
        correctIndex: 3,
        explanation: 'Python variables do not require explicit type keywords or semicolons; simple `score = 10` works.'
      },
      {
        id: 3,
        question: 'What data type is returned by the `input()` function by default?',
        options: ['Integer', 'String', 'Float', 'Boolean'],
        correctIndex: 1,
        explanation: 'input() always returns a string (str). You must cast it with int() or float() for numerical operations.'
      },
      {
        id: 4,
        question: 'Which of the following is a valid Python variable name?',
        options: ['2score', 'student_name', 'student-name', 'class'],
        correctIndex: 1,
        explanation: 'Variable names cannot start with numbers, cannot contain hyphens, and cannot use reserved keywords like `class`.'
      },
      {
        id: 5,
        question: 'What will `type(3.14)` return in Python?',
        options: ['<class \'int\'>', '<class \'float\'>', '<class \'double\'>', '<class \'num\'>'],
        correctIndex: 1,
        explanation: 'Numbers with decimals in Python are categorized under the `float` class.'
      }
    ]
  },
  'py-quiz-2': {
    id: 'py-quiz-2',
    courseId: 'python',
    levelId: 2,
    title: 'Python Level 2 Quiz — Conditions',
    description: 'Evaluate your knowledge of if, elif, else statements and comparison operators in Python.',
    xpReward: 50,
    passingScorePercentage: 60,
    questions: [
      {
        id: 1,
        question: 'Which symbol is used to check for equality in Python conditional statements?',
        options: ['=', '==', '===', 'equals'],
        correctIndex: 1,
        explanation: '`==` is the equality operator. Single `=` is used for variable assignment.'
      },
      {
        id: 2,
        question: 'What is the keyword used to check additional conditions if the first `if` condition is False?',
        options: ['else if', 'elseif', 'elif', 'otherwise'],
        correctIndex: 2,
        explanation: 'In Python, `elif` is the keyword for else-if conditions.'
      },
      {
        id: 3,
        question: 'What will `print(10 > 5 and 3 == 4)` output?',
        options: ['True', 'False', 'None', 'Error'],
        correctIndex: 1,
        explanation: '`10 > 5` is True, but `3 == 4` is False. `True and False` evaluates to False.'
      },
      {
        id: 4,
        question: 'What character MUST end an `if` statement line in Python?',
        options: [';', ':', '.', '{'],
        correctIndex: 1,
        explanation: 'All compound statements in Python like `if`, `for`, `while`, and `def` end with a colon `:`.'
      },
      {
        id: 5,
        question: 'What happens if no `if` or `elif` condition is True, and an `else` block is present?',
        options: ['The program crashes', 'The else block executes', 'Python skips everything including else', 'The first condition runs anyway'],
        correctIndex: 1,
        explanation: 'The `else` block acts as the default fallback when all prior conditions fail.'
      }
    ]
  },
  'py-quiz-3': {
    id: 'py-quiz-3',
    courseId: 'python',
    levelId: 3,
    title: 'Python Level 3 Quiz — Loops',
    description: 'Test your understanding of for loops, while loops, and range() functions.',
    xpReward: 50,
    passingScorePercentage: 60,
    questions: [
      {
        id: 1,
        question: 'What sequence does `list(range(1, 5))` generate?',
        options: ['[1, 2, 3, 4, 5]', '[1, 2, 3, 4]', '[0, 1, 2, 3, 4]', '[2, 3, 4, 5]'],
        correctIndex: 1,
        explanation: 'range(start, stop) generates numbers starting at start and stopping BEFORE stop: [1, 2, 3, 4].'
      },
      {
        id: 2,
        question: 'Which statement is used to break out of a loop immediately?',
        options: ['stop', 'exit', 'break', 'continue'],
        correctIndex: 2,
        explanation: 'The `break` statement terminates the current loop immediately.'
      },
      {
        id: 3,
        question: 'What will happen if a `while` loop condition never becomes False?',
        options: ['Loop executes once', 'It causes an infinite loop', 'Python fixes it automatically', 'Syntax Error'],
        correctIndex: 1,
        explanation: 'If the condition never turns False, the loop continues running endlessly (infinite loop).'
      },
      {
        id: 4,
        question: 'Which loop is best suited when iterating through elements of a list?',
        options: ['for loop', 'do-while loop', 'repeat-until loop', 'if loop'],
        correctIndex: 0,
        explanation: 'The Python `for` loop natively iterates over iterable sequences like lists.'
      },
      {
        id: 5,
        question: 'What does the `continue` statement do inside a loop?',
        options: ['Terminates the loop', 'Skips the rest of current iteration and moves to next', 'Restarts the loop from 0', 'Prints loop status'],
        correctIndex: 1,
        explanation: '`continue` skips remaining code in current iteration and starts the next iteration cycle.'
      }
    ]
  },
  'py-quiz-4': {
    id: 'py-quiz-4',
    courseId: 'python',
    levelId: 4,
    title: 'Python Level 4 Quiz — Functions',
    description: 'Assess your skills in defining functions, handling parameters, and returning values.',
    xpReward: 50,
    passingScorePercentage: 60,
    questions: [
      {
        id: 1,
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'create', 'func'],
        correctIndex: 1,
        explanation: 'Python uses the `def` keyword to define functions.'
      },
      {
        id: 2,
        question: 'What keyword sends a result back from a function to its caller?',
        options: ['give', 'send', 'return', 'yield_out'],
        correctIndex: 2,
        explanation: 'The `return` statement exits a function and passes back a value.'
      },
      {
        id: 3,
        question: 'What does a Python function return if no explicit `return` statement is written?',
        options: ['0', 'False', 'None', 'Error'],
        correctIndex: 2,
        explanation: 'Python functions implicitly return `None` if no return statement is executed.'
      },
      {
        id: 4,
        question: 'What is the parameter `name` in `def greet(name="Student"):` called when given a default value?',
        options: ['Required parameter', 'Default parameter', 'Global parameter', 'Variable parameter'],
        correctIndex: 1,
        explanation: '`name="Student"` specifies a default parameter value if no argument is passed.'
      },
      {
        id: 5,
        question: 'What will `def add(a, b): return a + b` produce for `add(3, 4)`?',
        options: ['7', '"34"', 'None', 'Error'],
        correctIndex: 0,
        explanation: '`3 + 4` calculates the numerical sum, returning 7.'
      }
    ]
  },

  // --- C QUIZZES ---
  'c-quiz-1': {
    id: 'c-quiz-1',
    courseId: 'c',
    levelId: 1,
    title: 'C Level 1 Quiz — Basics',
    description: 'Test your understanding of C program structure, variables, printf, and scanf.',
    xpReward: 50,
    passingScorePercentage: 60,
    questions: [
      {
        id: 1,
        question: 'Every standard C program must contain which function to serve as the entry point?',
        options: ['start()', 'main()', 'init()', 'program()'],
        correctIndex: 1,
        explanation: 'In C, execution always begins at the main() function.'
      },
      {
        id: 2,
        question: 'Which header file is required to use `printf()` and `scanf()` in C?',
        options: ['<stdlib.h>', '<conio.h>', '<stdio.h>', '<math.h>'],
        correctIndex: 2,
        explanation: 'Standard Input Output functions printf() and scanf() reside in <stdio.h>.'
      },
      {
        id: 3,
        question: 'Which format specifier is used to print an integer in `printf()`?',
        options: ['%f', '%c', '%d', '%s'],
        correctIndex: 2,
        explanation: '%d (or %i) is the format specifier for signed integers.'
      },
      {
        id: 4,
        question: 'Why is the address-of operator `&` required before non-pointer variables in `scanf("%d", &x)`?',
        options: ['To convert to string', 'To pass the variable\'s memory address', 'To make x global', 'To check if x exists'],
        correctIndex: 1,
        explanation: 'scanf needs the memory address (&x) so it can store the input value directly into x.'
      },
      {
        id: 5,
        question: 'What character is used to terminate statements in C?',
        options: [':', ';', '.', 'comma'],
        correctIndex: 1,
        explanation: 'In C, every statement must end with a semicolon `;`.'
      }
    ]
  },
  'c-quiz-2': {
    id: 'c-quiz-2',
    courseId: 'c',
    levelId: 2,
    title: 'C Level 2 Quiz — Conditions',
    description: 'Evaluate your knowledge of if, else, else-if and relational operators in C.',
    xpReward: 50,
    passingScorePercentage: 60,
    questions: [
      {
        id: 1,
        question: 'In C, what numerical value represents `false` in logical conditions?',
        options: ['-1', '0', '1', 'NULL'],
        correctIndex: 1,
        explanation: 'In C, zero (0) represents false; any non-zero value represents true.'
      },
      {
        id: 2,
        question: 'Which operator represents logical AND in C?',
        options: ['&', '&&', 'AND', 'and'],
        correctIndex: 1,
        explanation: '`&&` is the logical AND operator in C. Single `&` is bitwise AND.'
      },
      {
        id: 3,
        question: 'What is the correct syntax for an `if` statement in C?',
        options: ['if x > 5 { }', 'if (x > 5) { }', 'if x > 5 then { }', 'if [x > 5] { }'],
        correctIndex: 1,
        explanation: 'In C, conditional expressions inside `if` must be enclosed in parentheses `()`.}'
      },
      {
        id: 4,
        question: 'What does the operator `!=` check in C?',
        options: ['Is equal to', 'Is not equal to', 'Is greater than', 'Assignment'],
        correctIndex: 1,
        explanation: '`!=` evaluates to true if two values are not equal.'
      },
      {
        id: 5,
        question: 'Which keyword handles a default scenario when all `if` and `else if` conditions fail?',
        options: ['default', 'finally', 'else', 'otherwise'],
        correctIndex: 2,
        explanation: 'The `else` block executes when all preceding if/else-if branches evaluate to false.'
      }
    ]
  },
  'c-quiz-3': {
    id: 'c-quiz-3',
    courseId: 'c',
    levelId: 3,
    title: 'C Level 3 Quiz — Loops',
    description: 'Test your understanding of for, while, and do-while loops in C.',
    xpReward: 50,
    passingScorePercentage: 60,
    questions: [
      {
        id: 1,
        question: 'Which C loop guarantees that its loop body executes at least once?',
        options: ['for loop', 'while loop', 'do-while loop', 'infinite loop'],
        correctIndex: 2,
        explanation: 'do-while checks its condition at the end of the iteration, so body runs at least once.'
      },
      {
        id: 2,
        question: 'What are the three components inside a `for` loop header in C separated by?',
        options: ['Colons', 'Commas', 'Semicolons', 'Spaces'],
        correctIndex: 2,
        explanation: 'Syntax: for (initialization; condition; increment/decrement)'
      },
      {
        id: 3,
        question: 'How many times will `for(int i=0; i<3; i++)` iterate?',
        options: ['2 times', '3 times', '4 times', '0 times'],
        correctIndex: 1,
        explanation: 'i takes values 0, 1, 2 (3 iterations total).'
      },
      {
        id: 4,
        question: 'What does `i++` do in a loop?',
        options: ['Adds 2 to i', 'Increments i by 1', 'Decrements i by 1', 'Multiplies i by 2'],
        correctIndex: 1,
        explanation: '`i++` is post-increment syntax, adding 1 to `i`.'
      },
      {
        id: 5,
        question: 'Which syntax properly ends a `do-while` loop in C?',
        options: ['while (cond)', 'while (cond);', 'end while;', 'until (cond)'],
        correctIndex: 1,
        explanation: 'A `do-while` loop must terminate with a semicolon after the while condition.'
      }
    ]
  },
  'c-quiz-4': {
    id: 'c-quiz-4',
    courseId: 'c',
    levelId: 4,
    title: 'C Level 4 Quiz — Functions',
    description: 'Assess your skills in C function declarations, prototypes, and parameters.',
    xpReward: 50,
    passingScorePercentage: 60,
    questions: [
      {
        id: 1,
        question: 'What return type is used when a function does not return a value?',
        options: ['int', 'null', 'void', 'empty'],
        correctIndex: 2,
        explanation: '`void` specifies that a function does not return any value.'
      },
      {
        id: 2,
        question: 'What is a function prototype in C?',
        options: ['A full function definition', 'A declaration informing the compiler of function signature', 'A special loop', 'A global variable'],
        correctIndex: 1,
        explanation: 'A prototype declares the return type, name, and parameters before full definition.'
      },
      {
        id: 3,
        question: 'By default, how are simple primitive parameters passed to C functions?',
        options: ['Pass by reference', 'Pass by pointer', 'Pass by value (a copy)', 'Pass by memory'],
        correctIndex: 2,
        explanation: 'Parameters in C are passed by value by default, passing a copy of argument data.'
      },
      {
        id: 4,
        question: 'What value does `main()` return to indicate successful execution to the OS?',
        options: ['1', '0', '-1', '100'],
        correctIndex: 1,
        explanation: 'Returning 0 from main() signals normal, successful termination.'
      },
      {
        id: 5,
        question: 'Which is a valid function declaration in C?',
        options: ['def square(int x)', 'int square(int x);', 'function int square(x)', 'int square = (x) => x*x'],
        correctIndex: 1,
        explanation: 'In C syntax: return_type function_name(parameter_list);'
      }
    ]
  }
};
