import { Question } from './types';

export const TRIVIA_QUESTIONS: Question[] = [
  // ==========================================
  // 1. JAVASCRIPT & TYPESCRIPT (Category: "JavaScript & TypeScript")
  // ==========================================
  {
    id: 1,
    difficulty: "EASY",
    category: "JavaScript & TypeScript",
    questionText: "What is the correct way to declare a block-scoped local variable in modern JavaScript?",
    choices: [
      "var x = 1;",
      "let x = 1;",
      "define x = 1;",
      "global x = 1;"
    ],
    correctAnswer: "let x = 1;",
    explanation: "Introduced in ES6, 'let' allows you to declare block-scoped local variables. This avoids the hoisting and global scope pollution issues associated with 'var'."
  },
  {
    id: 2,
    difficulty: "EASY",
    category: "JavaScript & TypeScript",
    questionText: "Which comparison operator checks both value and type equality without implicit coercion in JavaScript?",
    choices: [
      "==",
      "=",
      "===",
      "equal"
    ],
    correctAnswer: "===",
    explanation: "The triple-equals operator (===) performs strict equality checking. It returns true only if both operands have the same value and the same data type."
  },
  {
    id: 3,
    difficulty: "MEDIUM",
    category: "JavaScript & TypeScript",
    questionText: "What is the evaluation result of the expression 'typeof null' in standard JavaScript?",
    choices: [
      "\"null\"",
      "\"undefined\"",
      "\"object\"",
      "\"value\""
    ],
    correctAnswer: "\"object\"",
    explanation: "This is a historical bug in JavaScript's initial implementation. JS values were represented as a type tag and a value, where the object type tag was 0. Since null was a null pointer (represented as 0), it returned 'object'."
  },
  {
    id: 4,
    difficulty: "MEDIUM",
    category: "JavaScript & TypeScript",
    questionText: "Which statement best describes a 'closure' in JavaScript?",
    choices: [
      "A method to close a browser tab or database session connection",
      "A function combined with references to its surrounding lexical state, allowing access to outer scopes",
      "An automated routine that executes when memory is garbage collected",
      "An import block syntax that prevents third-party packages from executing"
    ],
    correctAnswer: "A function combined with references to its surrounding lexical state, allowing access to outer scopes",
    explanation: "Closures are created every time a function is defined inside another function. The inner function remembers and has access to variables declared in its outer parent scope, even after the parent function has finished executing."
  },
  {
    id: 5,
    difficulty: "HARD",
    category: "JavaScript & TypeScript",
    questionText: "How does the microtask queue (e.g. Promises) execute relative to the macrotask queue (e.g. setTimeout) in the JS Event Loop?",
    choices: [
      "All microtasks in the queue are executed immediately after the current script finishes, before the loop proceeds to the next macrotask",
      "Macrotasks are prioritized and always execute completely before any pending microtasks are started",
      "One microtask and one macrotask are interleaved sequentially",
      "Microtasks bypass the event loop completely and execute on a parallel thread pool"
    ],
    correctAnswer: "All microtasks in the queue are executed immediately after the current script finishes, before the loop proceeds to the next macrotask",
    explanation: "At the end of each task in the event loop, the engine checks the microtask queue. It drains the entire microtask queue (including any microtasks added during execution) before moving to rendering or the next macrotask."
  },
  {
    id: 6,
    difficulty: "HARD",
    category: "JavaScript & TypeScript",
    questionText: "What is the result of executing the statement '0.1 + 0.2 === 0.3' in standard JS engines?",
    choices: [
      "true",
      "false",
      "undefined",
      "NaN"
    ],
    correctAnswer: "false",
    explanation: "JavaScript represents numbers using IEEE 754 double-precision floats. Because binary fraction formats cannot precisely represent decimal fractions like 0.1 and 0.2, 0.1 + 0.2 evaluates to 0.30000000000000004, which is not equal to 0.3."
  },
  {
    id: 7,
    difficulty: "EASY",
    category: "JavaScript & TypeScript",
    questionText: "Which of the following array methods returns a new array with transformed elements, rather than mutating the original?",
    choices: [
      "forEach()",
      "map()",
      "push()",
      "reverse()"
    ],
    correctAnswer: "map()",
    explanation: "The '.map()' method is a pure functional tool that returns a brand new array populated with the results of calling a provided function on every element in the calling array."
  },
  {
    id: 8,
    difficulty: "MEDIUM",
    category: "JavaScript & TypeScript",
    questionText: "How do ES6 Arrow Functions handle the dynamic 'this' keyword binding context?",
    choices: [
      "They bind 'this' to the element that triggered the execution event",
      "They have no 'this' of their own; they lexically inherit 'this' from their enclosing parent scope",
      "They bind 'this' dynamically to the window or global object at runtime",
      "They throw a TypeError if 'this' is referenced inside them"
    ],
    correctAnswer: "They have no 'this' of their own; they lexically inherit 'this' from their enclosing parent scope",
    explanation: "Arrow functions do not define their own 'this' context. Instead, they capture the 'this' value of the surrounding lexical context in which they were created."
  },
  {
    id: 9,
    difficulty: "MEDIUM",
    category: "JavaScript & TypeScript",
    questionText: "What is the key difference between Promise.all() and Promise.allSettled() in async JS?",
    choices: [
      "Promise.all() accepts only synchronous functions, while allSettled() accepts Promises",
      "Promise.all() rejects immediately if any promise rejects; Promise.allSettled() waits for all promises to complete regardless of results",
      "Promise.allSettled() runs in parallel threads while Promise.all() runs sequentially",
      "There is no difference; they are exact functional aliases"
    ],
    correctAnswer: "Promise.all() rejects immediately if any promise rejects; Promise.allSettled() waits for all promises to complete regardless of results",
    explanation: "Promise.all() is 'fail-fast'. If any promise in the input array rejects, it aborts immediately. Promise.allSettled() waits for every single promise to resolve or reject, returning an array of detailed status outcomes."
  },
  {
    id: 10,
    difficulty: "HARD",
    category: "JavaScript & TypeScript",
    questionText: "In TypeScript, what is the fundamental difference between the 'unknown' type and the 'any' type?",
    choices: [
      "'unknown' can only represent object types; 'any' represents primitive values",
      "'unknown' is a type-safe counterpart of 'any'; values of type 'unknown' cannot be interacted with until type checked or casted",
      "'any' requires a compiler assertion flag to use, whereas 'unknown' does not",
      "The 'unknown' type is evaluated at runtime, whereas 'any' is stripped during transpile cycles"
    ],
    correctAnswer: "'unknown' is a type-safe counterpart of 'any'; values of type 'unknown' cannot be interacted with until type checked or casted",
    explanation: "'unknown' is the type-safe sibling of 'any'. Anything is assignable to 'unknown', but 'unknown' is not assignable to anything else (except 'any') without performing explicit type guards, assertions, or type narrowing first."
  },

  // ==========================================
  // 2. PYTHON (Category: "Python")
  // ==========================================
  {
    id: 11,
    difficulty: "EASY",
    category: "Python",
    questionText: "Which built-in list method is used to add an element to the very end of an existing list in Python?",
    choices: [
      "add()",
      "append()",
      "push()",
      "insert()"
    ],
    correctAnswer: "append()",
    explanation: "The '.append(x)' method inserts the object 'x' directly at the end of the array. In contrast, '.insert(i, x)' places it at a specific index."
  },
  {
    id: 12,
    difficulty: "EASY",
    category: "Python",
    questionText: "Which Python keyword is used to begin the definition of a user-defined function?",
    choices: [
      "func",
      "def",
      "define",
      "function"
    ],
    correctAnswer: "def",
    explanation: "In Python, the 'def' keyword (short for define) is followed by the function's name and its parameters, initiating a local scope block."
  },
  {
    id: 13,
    difficulty: "MEDIUM",
    category: "Python",
    questionText: "Which of the following sequence types in Python is strictly immutable once initialized?",
    choices: [
      "list",
      "set",
      "tuple",
      "dict"
    ],
    correctAnswer: "tuple",
    explanation: "Tuples are immutable sequences. Once created, elements cannot be appended, replaced, or removed, making them hashable and memory-efficient."
  },
  {
    id: 14,
    difficulty: "MEDIUM",
    category: "Python",
    questionText: "What is the boolean evaluation result of passing an empty list 'bool([])' in Python?",
    choices: [
      "True",
      "False",
      "None",
      "TypeError"
    ],
    correctAnswer: "False",
    explanation: "In Python, empty collection structures (empty list [], empty string '', empty dict {}, empty tuple (), set()) as well as numeric 0, 0.0, and None evaluate to 'False' in boolean contexts."
  },
  {
    id: 15,
    difficulty: "HARD",
    category: "Python",
    questionText: "What is the primary optimization benefit of defining '__slots__' in a custom Python class?",
    choices: [
      "It allows multi-threaded class procedures to bypass the Global Interpreter Lock (GIL)",
      "It prevents the creation of a dynamic '__dict__' for instances, greatly reducing memory footprints",
      "It automatically converts all class methods into pure C compiled structures",
      "It allows instances to inherit from final class objects safely"
    ],
    correctAnswer: "It prevents the creation of a dynamic '__dict__' for instances, greatly reducing memory footprints",
    explanation: "By default, Python stores instance attributes in a dynamic hash dictionary (__dict__), which consumes significant memory overhead. Defining '__slots__' tells Python to allocate flat space only for the declared fields, bypassing __dict__."
  },
  {
    id: 16,
    difficulty: "EASY",
    category: "Python",
    questionText: "Which of the following is the correct Python syntax for a list comprehension that squares numbers from 0 to 4?",
    choices: [
      "[x^2 for x in range(5)]",
      "[x**2 for x in range(5)]",
      "{x**2 in range(5)}",
      "[square(x) loop 5]"
    ],
    correctAnswer: "[x**2 for x in range(5)]",
    explanation: "Python list comprehensions use brackets. The exponentiation operator is double asterisks (**), and range(5) provides numbers 0, 1, 2, 3, 4."
  },
  {
    id: 17,
    difficulty: "MEDIUM",
    category: "Python",
    questionText: "What order of namespaces does Python search when resolving a variable name (the LEGB rule)?",
    choices: [
      "Local, Enclosing, Global, Built-in",
      "Local, External, Global, Binary",
      "Lexical, Environment, General, Base",
      "Loop, Enclosing, Global, Built-in"
    ],
    correctAnswer: "Local, Enclosing, Global, Built-in",
    explanation: "Python resolves scopes sequentially following the LEGB rule: 1. Local scope inside the function, 2. Enclosing scopes of nested functions, 3. Global module-level scope, 4. Built-in global scope names."
  },
  {
    id: 18,
    difficulty: "HARD",
    category: "Python",
    questionText: "Why is declaring mutable objects like lists or dictionaries as default arguments (e.g., 'def append_to(element, target=[])') considered a major pitfall in Python?",
    choices: [
      "It causes an immediate SyntaxError during bytecode compilation",
      "The default list is instantiated once when the function is defined, causing state to persist and accumulate across separate function calls",
      "It forces the entire argument list to allocate memory on the CPU stack instead of heap structures",
      "Python forbids executing functions containing bracket symbols inside argument registers"
    ],
    correctAnswer: "The default list is instantiated once when the function is defined, causing state to persist and accumulate across separate function calls",
    explanation: "Default arguments are evaluated once at function definition time. If you mutate that list inside the function, future invocations without a second argument will share that exact same list object."
  },
  {
    id: 19,
    difficulty: "EASY",
    category: "Python",
    questionText: "What is the key difference between the 'is' operator and the '==' operator in Python?",
    choices: [
      "'is' checks for variable type, while '==' checks for variable value",
      "'is' checks if both variables refer to the exact same object in memory; '==' checks if their values are equivalent",
      "'==' is only used for strings, whereas 'is' handles numbers and floats",
      "There is no difference; they are interchangeable shortcuts"
    ],
    correctAnswer: "'is' checks if both variables refer to the exact same object in memory; '==' checks if their values are equivalent",
    explanation: "The 'is' operator checks for object identity (checking if their memory address 'id(x)' matches). The '==' operator checks for value equality (calling the objects' '__eq__' magic method)."
  },
  {
    id: 20,
    difficulty: "MEDIUM",
    category: "Python",
    questionText: "What does the 'yield' keyword do inside a Python function definition?",
    choices: [
      "It exits the program immediately with an OS warning code",
      "It pauses function execution and returns a value to the caller, turning the function into a generator",
      "It locks the CPU thread to prevent other modules from executing concurrent routines",
      "It imports external compiler submodules into the active local namespace"
    ],
    correctAnswer: "It pauses function execution and returns a value to the caller, turning the function into a generator",
    explanation: "'yield' suspends the function's state and returns an intermediate value. When the generator is iterated or next() is called, execution resumes from exactly where it was suspended."
  },

  // ==========================================
  // 3. C / C++ / SYSTEMS (Category: "C / C++ / Systems")
  // ==========================================
  {
    id: 21,
    difficulty: "EASY",
    category: "C / C++ / Systems",
    questionText: "In C or C++, what is a 'pointer' variable?",
    choices: [
      "A variable that directly copies array buffer structures",
      "A variable that stores the physical RAM memory address of another variable",
      "A custom compiler shorthand for virtual functions",
      "An automated memory garbage collection handle"
    ],
    correctAnswer: "A variable that stores the physical RAM memory address of another variable",
    explanation: "Pointers hold hex addresses pointing directly to bytes in memory, enabling direct RAM manipulation, dynamic structures, and highly optimized reference sharing."
  },
  {
    id: 22,
    difficulty: "EASY",
    category: "C / C++ / Systems",
    questionText: "Which symbol sequence is used to initiate a single-line comment in C++ and ANSI C99?",
    choices: [
      "//",
      "/*",
      "#",
      "--"
    ],
    correctAnswer: "//",
    explanation: "Double slashes (//) define a single-line comment. Slanted asterisks (/* ... */) are used for multi-line block comments."
  },
  {
    id: 23,
    difficulty: "MEDIUM",
    category: "C / C++ / Systems",
    questionText: "What safety architectural mechanism does Rust use to manage memory safety at compile-time without a Garbage Collector?",
    choices: [
      "Dynamic Virtual Stack Auditing",
      "An explicit Ownership system with Borrowing rules and Lifetimes",
      "Automated Reference Counting (ARC) wrappers",
      "Compile-time address randomizing buffers"
    ],
    correctAnswer: "An explicit Ownership system with Borrowing rules and Lifetimes",
    explanation: "Rust enforces memory safety via compiler constraints: each resource has a single owner. Borrowing allows either multiple read-only references OR one mutable reference at a time, verified during compiling."
  },
  {
    id: 24,
    difficulty: "HARD",
    category: "C / C++ / Systems",
    questionText: "Why is returning the memory address of an automatic local variable from a C function a critical programming bug?",
    choices: [
      "It causes an immediate compiler linker crash",
      "Local variables are allocated on the stack and destroyed when the function exits, making the returned pointer dangling and invalid",
      "It triggers heap corruption because the variable leaks RAM",
      "C functions are restricted from returning pointer values"
    ],
    correctAnswer: "Local variables are allocated on the stack and destroyed when the function exits, making the returned pointer dangling and invalid",
    explanation: "Automatic local variables are stored in the function's stack frame. When the function returns, its frame is popped and reclaimed, leaving the pointer pointing to unallocated memory. Dereferencing it causes undefined behavior."
  },
  {
    id: 25,
    difficulty: "HARD",
    category: "C / C++ / Systems",
    questionText: "In Rust memory architecture, what is the core structural difference between 'String' and '&str'?",
    choices: [
      "String is stored on the stack, while &str is allocated in registers",
      "String is an owned, growable heap-allocated buffer; &str is an immutable view or slice referencing a string segment",
      "&str maintains a Reference Count counter; String uses Garbage Collection",
      "There is no difference; they are exact aliases"
    ],
    correctAnswer: "String is an owned, growable heap-allocated buffer; &str is an immutable view or slice referencing a string segment",
    explanation: "'String' owns its dynamic heap buffer. '&str' (a string slice) is a lightweight fat pointer containing a memory address and a length, viewing UTF-8 data owned by someone else."
  },
  {
    id: 26,
    difficulty: "HARD",
    category: "C / C++ / Systems",
    questionText: "In C++, what does the 'Rule of Three/Five' state about resource management?",
    choices: [
      "A class can only have three constructors and five member functions",
      "If a class manages dynamic resources and overrides a destructor, it must likely override the copy/move constructors and assignment operators",
      "Code is compiled in three passes and optimized in five steps",
      "A program must have three source files and five header headers"
    ],
    correctAnswer: "If a class manages dynamic resources and overrides a destructor, it must likely override the copy/move constructors and assignment operators",
    explanation: "If you need a custom destructor to free dynamic resources (e.g., raw pointers), standard copy assignment will perform shallow copies, leading to double-frees. You must define custom copy and move routines to handle resource transfer safely."
  },
  {
    id: 27,
    difficulty: "MEDIUM",
    category: "C / C++ / Systems",
    questionText: "What is a major conceptual difference between using malloc() and using the C++ 'new' operator?",
    choices: [
      "malloc() allocates memory on stack, while 'new' allocates memory on heap",
      "malloc() only allocates raw bytes; 'new' allocates memory and also calls the class constructor to initialize the object",
      "new is an asynchronous system call; malloc() is strictly synchronous",
      "new is limited to integer types; malloc() handles objects"
    ],
    correctAnswer: "malloc() only allocates raw bytes; 'new' allocates memory and also calls the class constructor to initialize the object",
    explanation: "The C++ 'new' operator is type-safe. It computes the required size automatically, allocates heap memory, and invokes the class constructor. C's malloc() merely returns a void* pointer of uninitialized raw bytes."
  },
  {
    id: 28,
    difficulty: "EASY",
    category: "C / C++ / Systems",
    questionText: "What happens when you pass a large class object to a function by value (e.g. 'void foo(MyClass obj)') in C++?",
    choices: [
      "A reference pointer is passed automatically by the compiler",
      "The program copies the entire object byte-by-byte onto the function stack, which can cause overhead for large classes",
      "The compiler flags it as a syntax error",
      "The original object is destroyed instantly when entering the function"
    ],
    correctAnswer: "The program copies the entire object byte-by-byte onto the function stack, which can cause overhead for large classes",
    explanation: "Passing by value invokes the object's copy constructor, duplicating its entire memory structure onto the stack frame. For large classes, passing by const-reference ('const MyClass& obj') is preferred to avoid copy overhead."
  },
  {
    id: 29,
    difficulty: "MEDIUM",
    category: "C / C++ / Systems",
    questionText: "What is the function of declaring a member function of a C++ class as 'const' (e.g., 'void display() const;')?",
    choices: [
      "It turns the return value into a read-only variable",
      "It promises that the method will not modify any member variables of the calling object",
      "It prevents other concurrent threads from executing the method",
      "It compiles the function into a static library"
    ],
    correctAnswer: "It promises that the method will not modify any member variables of the calling object",
    explanation: "Const member functions prevent the method from modifying the object's internal state (unless a field is marked 'mutable'). It also allows the method to be safely called on const instances of the class."
  },
  {
    id: 30,
    difficulty: "EASY",
    category: "C / C++ / Systems",
    questionText: "In C and C++, which operator is used to 'dereference' a pointer, accessing the actual value stored at that address?",
    choices: [
      "&",
      "->",
      "*",
      "."
    ],
    correctAnswer: "*",
    explanation: "The asterisk (*) operator dereferences a pointer. It reads or writes the value located at the address held by the pointer. The ampersand (&) is the address-of operator."
  },

  // ==========================================
  // 4. MIXED CS & PARADIGMS (Category: "Mixed Languages & CS")
  // ==========================================
  {
    id: 31,
    difficulty: "EASY",
    category: "Mixed Languages & CS",
    questionText: "In relational SQL databases, which clause is used to filter query records to match specific conditions?",
    choices: [
      "HAVING",
      "WHERE",
      "GROUP BY",
      "SELECT"
    ],
    correctAnswer: "WHERE",
    explanation: "The 'WHERE' clause filters rows *before* they are grouped or selected. 'HAVING' is used later to filter aggregated group fields."
  },
  {
    id: 32,
    difficulty: "MEDIUM",
    category: "Mixed Languages & CS",
    questionText: "What is the implicit default 'zero-value' of a boolean variable declared in Google's Go language?",
    choices: [
      "nil",
      "false",
      "true",
      "0"
    ],
    correctAnswer: "false",
    explanation: "In Go, variables are always initialized to a default value if not specified. Numbers get 0, strings get empty '', and booleans get 'false'."
  },
  {
    id: 33,
    difficulty: "HARD",
    category: "Mixed Languages & CS",
    questionText: "In purely functional languages like Haskell, what abstraction represents a design pattern to chain side-effects together sequentially?",
    choices: [
      "Functor",
      "Monad",
      "Closure",
      "Lambda"
    ],
    correctAnswer: "Monad",
    explanation: "Monads wrap values and provide a bind operator (>>=) to chain operations sequentially. This allows purely functional programs to cleanly model side-effects like state, I/O, or exceptions."
  },
  {
    id: 34,
    difficulty: "HARD",
    category: "Mixed Languages & CS",
    questionText: "What is the default buffer capacity when initializing a communication channel using 'make(chan int)' in Go?",
    choices: [
      "0 (Unbuffered - senders block until a receiver is ready)",
      "1 (Single slot cache)",
      "1024 bytes buffer",
      "Dynamic auto-growing buffer"
    ],
    correctAnswer: "0 (Unbuffered - senders block until a receiver is ready)",
    explanation: "Without a size argument, Go channels are unbuffered. Senders block immediately until another goroutine actively receives from the channel, ensuring execution synchronization."
  },
  {
    id: 35,
    difficulty: "EASY",
    category: "Mixed Languages & CS",
    questionText: "What is the file extension of a compiled Java bytecode file that runs inside the JVM?",
    choices: [
      ".java",
      ".class",
      ".jar",
      ".bytecode"
    ],
    correctAnswer: ".class",
    explanation: "Java source files (.java) are compiled by 'javac' into class files (.class) which contain the platform-independent bytecode instructions."
  },
  {
    id: 36,
    difficulty: "HARD",
    category: "Mixed Languages & CS",
    questionText: "Which Garbage Collector was introduced as the official default GC starting in Java OpenJDK 9?",
    choices: [
      "Serial Collector",
      "Parallel GC",
      "G1 (Garbage-First) GC",
      "Z Garbage Collector"
    ],
    correctAnswer: "G1 (Garbage-First) GC",
    explanation: "G1 GC replaced Parallel GC as the default collector in Java 9. It splits the heap into regions and prioritizes regions containing the most dead objects first, lowering pauses."
  },
  {
    id: 37,
    difficulty: "EASY",
    category: "Mixed Languages & CS",
    questionText: "Which Git command is used to turn an existing unversioned local directory into a fresh Git repository?",
    choices: [
      "git init",
      "git start",
      "git setup",
      "git create"
    ],
    correctAnswer: "git init",
    explanation: "'git init' creates a hidden '.git' metadata folder in the active directory, starting local branch tracking."
  },
  {
    id: 38,
    difficulty: "EASY",
    category: "Mixed Languages & CS",
    questionText: "What is the primary function of the Program Counter (PC) register inside a computer CPU?",
    choices: [
      "To count the milliseconds since CPU boot time",
      "To hold the physical memory address of the next machine instruction to be fetched and executed",
      "To store local arithmetic results from the ALU",
      "To monitor cache miss ratios"
    ],
    correctAnswer: "To hold the physical memory address of the next machine instruction to be fetched and executed",
    explanation: "The Program Counter (PC) keeps track of where the processor is. It holds the address of the next instruction, automatically incrementing upon fetch cycles."
  },
  {
    id: 39,
    difficulty: "MEDIUM",
    category: "Mixed Languages & CS",
    questionText: "In functional programming, what defining characteristic qualifies a function as a 'pure function'?",
    choices: [
      "It must be written in Haskell or Lisp and cannot be called from other languages",
      "It returns the exact same output for the same inputs and causes absolutely no side-effects in the system state",
      "It runs on an isolated sandboxed thread context",
      "It contains no reference variables or class imports"
    ],
    correctAnswer: "It returns the exact same output for the same inputs and causes absolutely no side-effects in the system state",
    explanation: "Pure functions are deterministic (same input produces same output) and side-effect free (they do not modify global variables, perform I/O, or mutate passing reference objects)."
  },
  {
    id: 40,
    difficulty: "MEDIUM",
    category: "Mixed Languages & CS",
    questionText: "What is the main conceptual difference between a SQL LEFT JOIN and an INNER JOIN?",
    choices: [
      "LEFT JOIN merges columns horizontally, while INNER JOIN groups rows vertically",
      "INNER JOIN only returns matching records present in both tables; LEFT JOIN returns all rows from the left table even if no matches exist in the right table",
      "LEFT JOIN is strictly faster because it ignores index keys",
      "There is no difference; they yield identical results on all databases"
    ],
    correctAnswer: "INNER JOIN only returns matching records present in both tables; LEFT JOIN returns all rows from the left table even if no matches exist in the right table",
    explanation: "INNER JOIN yields rows where values match in both datasets. LEFT JOIN retains every record of the left table, inserting 'NULL' values for missing columns of the right table."
  },

  // ==========================================
  // JAVASCRIPT & TYPESCRIPT EXPANSION (IDs 41-55)
  // ==========================================
  {
    id: 41,
    difficulty: "EASY",
    category: "JavaScript & TypeScript",
    questionText: "Which keyword is used to declare a block-scoped variable that cannot be reassigned?",
    choices: [
      "var",
      "let",
      "const",
      "immutable"
    ],
    correctAnswer: "const",
    explanation: "The 'const' keyword declares a read-only, block-scoped local variable. Once assigned, you cannot bind a new value to it, although its object properties can still be mutated."
  },
  {
    id: 42,
    difficulty: "MEDIUM",
    category: "JavaScript & TypeScript",
    questionText: "What is the purpose of the 'as const' assertion in TypeScript?",
    choices: [
      "It casts a value to a string data type",
      "It casts a value to a read-only literal type, making all properties readonly and preventing widening",
      "It compiles variables into native C constants for speed",
      "It converts asynchronous callbacks into synchronous blocks"
    ],
    correctAnswer: "It casts a value to a read-only literal type, making all properties readonly and preventing widening",
    explanation: "The 'as const' literal assertion signals to TypeScript that the value is static, converting all primitive properties into literal values rather than wide types (e.g., 'hello' instead of string) and setting all fields to read-only."
  },
  {
    id: 43,
    difficulty: "HARD",
    category: "JavaScript & TypeScript",
    questionText: "What is the difference in behavior between 'Promise.race()' and 'Promise.any()'?",
    choices: [
      "Promise.race() rejects immediately if any promise rejects, whereas Promise.any() resolves as soon as the first promise resolves successfully",
      "Promise.any() is strictly for client rendering, whereas race() operates only server-side",
      "Promise.any() is an asynchronous keyword, whereas race() runs synchronously",
      "There is no difference; they are exact structural aliases"
    ],
    correctAnswer: "Promise.race() rejects immediately if any promise rejects, whereas Promise.any() resolves as soon as the first promise resolves successfully",
    explanation: "Promise.race() settles (resolves or rejects) as soon as the first input promise settles. Promise.any() waits for the first *successful* (resolved) promise, only rejecting if every single input promise rejects."
  },
  {
    id: 44,
    difficulty: "EASY",
    category: "JavaScript & TypeScript",
    questionText: "Which symbol sequence is used for the optional chaining operator in modern JavaScript?",
    choices: [
      "??",
      "?.",
      "||",
      "?:"
    ],
    correctAnswer: "?.",
    explanation: "The optional chaining operator (?.) allows you to read nested property values without explicitly validating that each reference in the chain is non-nullish."
  },
  {
    id: 45,
    difficulty: "MEDIUM",
    category: "JavaScript & TypeScript",
    questionText: "What does the 'keyof' operator do in TypeScript?",
    choices: [
      "It returns a list of runtime values stored in an object dictionary",
      "It produces a union type of all known keys of an object type or interface at compile time",
      "It deletes a property from a compiled class schema",
      "It evaluates the memory footprint of a selected type"
    ],
    correctAnswer: "It produces a union type of all known keys of an object type or interface at compile time",
    explanation: "The 'keyof' operator takes an object type and yields a union of its string or numeric keys. For instance, keyof { x: number; y: number } produces 'x' | 'y'."
  },
  {
    id: 46,
    difficulty: "HARD",
    category: "JavaScript & TypeScript",
    questionText: "What is a major advantage of utilizing a Map object instead of a standard plain Object in JavaScript?",
    choices: [
      "Map can be compiled into binary assembly safely",
      "Map preserves the insertion order of keys and allows any data type (including objects) as keys",
      "Objects do not support the delete operator, whereas Maps do",
      "Maps are completely immutable and cannot be modified after construction"
    ],
    correctAnswer: "Map preserves the insertion order of keys and allows any data type (including objects) as keys",
    explanation: "Standard JS Object keys must be strings or symbols. Map allows any data type as key, guarantees insertion order during iteration, and offers optimized performance for frequent addition and removal of key-value pairs."
  },
  {
    id: 47,
    difficulty: "EASY",
    category: "JavaScript & TypeScript",
    questionText: "What does the global property 'NaN' stand for in standard JavaScript specifications?",
    choices: [
      "Null-and-Nil",
      "Not-a-Number",
      "No-Active-Node",
      "Negative-Absolute-Number"
    ],
    correctAnswer: "Not-a-Number",
    explanation: "NaN represents a value which is not a legal number, usually resulting from undefined arithmetic operations like dividing zero by zero or parsing an invalid string into an integer."
  },
  {
    id: 48,
    difficulty: "MEDIUM",
    category: "JavaScript & TypeScript",
    questionText: "What does the 'Object.freeze()' method accomplish when applied to an object in JavaScript?",
    choices: [
      "It pauses asynchronous timeouts referencing the object",
      "It prevents new properties from being added, existing properties from being deleted, or values of existing properties from being changed",
      "It converts the object into an encrypted string",
      "It schedules the object for immediate automatic garbage collection"
    ],
    correctAnswer: "It prevents new properties from being added, existing properties from being deleted, or values of existing properties from being changed",
    explanation: "Object.freeze() performs a shallow freeze on an object, making it completely immutable. It prevents any structural modification, property value changes, or prototype alterations."
  },
  {
    id: 49,
    difficulty: "HARD",
    category: "JavaScript & TypeScript",
    questionText: "What is a 'WeakMap' in JavaScript and how does it prevent memory leaks?",
    choices: [
      "It is a Map with a very small maximum capacity limit",
      "It stores key-value pairs where keys must be objects and are held as weak references, allowing them to be garbage collected if no other references exist",
      "It is a Map that runs on a background web worker thread",
      "It is an obsolete Map class that has been deprecated in modern engines"
    ],
    correctAnswer: "It stores key-value pairs where keys must be objects and are held as weak references, allowing them to be garbage collected if no other references exist",
    explanation: "WeakMap keys must be objects. Because references to keys are held 'weakly', they do not prevent garbage collection if the object is no longer referenced elsewhere, preventing memory leaks in modular architectures."
  },
  {
    id: 50,
    difficulty: "EASY",
    category: "JavaScript & TypeScript",
    questionText: "Which of the following describes the primary behavior of the built-in 'JSON.stringify()' method?",
    choices: [
      "It parses a JSON-formatted string into an interactive object",
      "It converts a JavaScript value or object into a standardized JSON string",
      "It downloads an external JSON package over network protocols",
      "It checks if an input string is syntactically valid JSON"
    ],
    correctAnswer: "It converts a JavaScript value or object into a standardized JSON string",
    explanation: "JSON.stringify() converts a JavaScript object, array, or primitive value into a JSON-compliant string, which is highly useful for storage and network transfer."
  },
  {
    id: 51,
    difficulty: "MEDIUM",
    category: "JavaScript & TypeScript",
    questionText: "In TypeScript, what qualifies as a 'discriminated union' pattern?",
    choices: [
      "A class that inherits from multiple abstract classes",
      "A union of object types that share a common literal property used by the compiler as a precise type guard",
      "An import statement that selects only specified type definitions",
      "A variable that can hold both integer and string values simultaneously"
    ],
    correctAnswer: "A union of object types that share a common literal property used by the compiler as a precise type guard",
    explanation: "A discriminated union uses a common, constant field (like a 'type' or 'kind' string literal) present in each object type in the union. This allows the compiler to narrow down the specific type inside conditional code blocks."
  },
  {
    id: 52,
    difficulty: "HARD",
    category: "JavaScript & TypeScript",
    questionText: "How does the upcoming ECMAScript 'Temporal' API improve upon the legacy 'Date' object?",
    choices: [
      "It operates in floating-point microseconds instead of standard milliseconds",
      "It provides immutable, timezone-aware, and DST-safe date/time representations with clean, dedicated arithmetic APIs",
      "It forces date strings to compile directly into machine assembly language",
      "It synchronizes client Date values with atomic clocks via peer-to-peer web sockets"
    ],
    correctAnswer: "It provides immutable, timezone-aware, and DST-safe date/time representations with clean, dedicated arithmetic APIs",
    explanation: "The Temporal API solves the major design issues of the legacy 'Date' object by providing immutable datetime objects, precise support for distinct calendars and time zones, and DST-safe duration calculations."
  },
  {
    id: 53,
    difficulty: "EASY",
    category: "JavaScript & TypeScript",
    questionText: "Which operator is the nullish coalescing operator in standard JavaScript?",
    choices: [
      "||",
      "&&",
      "??",
      "?."
    ],
    correctAnswer: "??",
    explanation: "The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side is null or undefined, otherwise returning the left-hand side value."
  },
  {
    id: 54,
    difficulty: "MEDIUM",
    category: "JavaScript & TypeScript",
    questionText: "What does calling 'bind()' do to an existing function in JavaScript?",
    choices: [
      "It invokes the function immediately on a background thread",
      "It returns a new function with its 'this' context and initial arguments locked to the specified values",
      "It parses the function's body for structural syntax errors",
      "It deletes the function from the active lexical memory"
    ],
    correctAnswer: "It returns a new function with its 'this' context and initial arguments locked to the specified values",
    explanation: "The bind() method creates a new bound function. When called, the bound function has its 'this' context set to the first argument provided, allowing you to pass callbacks with stable contexts."
  },
  {
    id: 55,
    difficulty: "HARD",
    category: "JavaScript & TypeScript",
    questionText: "In TypeScript, what is the 'Record<K, T>' utility type designed to model?",
    choices: [
      "A database table definition with automated serialization attributes",
      "An object type whose keys are of type K and values are of type T, enabling rapid dictionary creation",
      "A history log tracking function parameters and execution times",
      "An array list containing custom tuple references"
    ],
    correctAnswer: "An object type whose keys are of type K and values are of type T, enabling rapid dictionary creation",
    explanation: "Record<K, T> is a highly versatile built-in utility type that creates an object type with property keys K and property values T, widely used for mapping keys to values with strict type checking."
  },

  // ==========================================
  // PYTHON EXPANSION (IDs 56-70)
  // ==========================================
  {
    id: 56,
    difficulty: "EASY",
    category: "Python",
    questionText: "How are distinct blocks of code (such as inside a loop or function) demarcated in Python?",
    choices: [
      "Using open/close curly braces '{ }'",
      "By using a colon followed by consistent indentation (spaces or tabs)",
      "Using explicit 'begin' and 'end' keyword tags",
      "By wrapping the entire statement block inside parentheses"
    ],
    correctAnswer: "By using a colon followed by consistent indentation (spaces or tabs)",
    explanation: "Python avoids braces or keywords for block grouping. Instead, blocks are defined using a colon at the end of control statements and standard vertical indentation."
  },
  {
    id: 57,
    difficulty: "MEDIUM",
    category: "Python",
    questionText: "What is the primary conceptual difference between '__str__' and '__repr__' in Python class specifications?",
    choices: [
      "'__repr__' is optimized for file writers, while '__str__' is for memory buffers",
      "'__repr__' is intended for developer-friendly, unambiguous debugging output; '__str__' is for user-friendly, readable string representations",
      "__str__ must only return integers, whereas __repr__ returns text",
      "There is no difference; they are duplicate methods in Python 3"
    ],
    correctAnswer: "'__repr__' is intended for developer-friendly, unambiguous debugging output; '__str__' is for user-friendly, readable string representations",
    explanation: "Both are magic methods returning string representations of objects. '__repr__' aims for completeness and is called in interpreters/logs. '__str__' aims for readability for final user output."
  },
  {
    id: 58,
    difficulty: "HARD",
    category: "Python",
    questionText: "What is a 'metaclass' in Python?",
    choices: [
      "A library containing metadata about compiled system libraries",
      "A class that defines the behavior and creation rules of other classes (the class of a class)",
      "An abstract class that cannot contain any function definitions",
      "A runtime optimizer that speeds up variable lookups in modules"
    ],
    correctAnswer: "A class that defines the behavior and creation rules of other classes (the class of a class)",
    explanation: "In Python, classes are themselves objects. A metaclass defines how a class behaves and is constructed. The default metaclass is 'type', but you can write custom metaclasses to modify class structures on creation."
  },
  {
    id: 59,
    difficulty: "EASY",
    category: "Python",
    questionText: "Which built-in Python function is used to retrieve the total count of elements in a list, string, or dictionary?",
    choices: [
      "size()",
      "count()",
      "len()",
      "length()"
    ],
    correctAnswer: "len()",
    explanation: "The 'len()' built-in function returns the length (the number of items) of an object, supporting lists, strings, tuples, sets, and dictionary maps."
  },
  {
    id: 60,
    difficulty: "MEDIUM",
    category: "Python",
    questionText: "What is the primary safety benefit of utilizing the 'with' statement in Python resource management?",
    choices: [
      "It compiles code blocks into background execution threads",
      "It guarantees that setup and cleanup code (e.g., closing files or releasing locks) is executed, even if exceptions occur",
      "It encrypts variables stored in local memory sectors",
      "It speeds up execution times by bypassing the interpreter compiler"
    ],
    correctAnswer: "It guarantees that setup and cleanup code (e.g., closing files or releasing locks) is executed, even if exceptions occur",
    explanation: "The 'with' statement uses the context manager protocol ('__enter__' and '__exit__' methods). This ensures resources are safely cleaned up and closed immediately upon leaving the code block."
  },
  {
    id: 61,
    difficulty: "HARD",
    category: "Python",
    questionText: "What is the Global Interpreter Lock (GIL) in CPython?",
    choices: [
      "A security lock preventing unauthorized scripts from importing submodules",
      "A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes concurrently",
      "An encryption algorithm safeguarding database keys in memory",
      "A compiler constraint limiting variable names to alphanumeric characters"
    ],
    correctAnswer: "A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes concurrently",
    explanation: "The CPython GIL is a single interpreter lock that prevents multi-threaded Python programs from utilizing multiple CPU cores simultaneously for CPU-bound tasks, as only one thread holds the lock at any instant."
  },
  {
    id: 62,
    difficulty: "EASY",
    category: "Python",
    questionText: "Which exception is raised by a Python script when trying to access a key that does not exist in a dictionary?",
    choices: [
      "ValueError",
      "IndexError",
      "KeyError",
      "AttributeError"
    ],
    correctAnswer: "KeyError",
    explanation: "Accessing a non-existent dictionary key via 'dict[key]' triggers a KeyError. To retrieve keys safely with a default fallback, 'dict.get(key, default)' should be used."
  },
  {
    id: 63,
    difficulty: "MEDIUM",
    category: "Python",
    questionText: "How does a Python generator differ from a standard Python list regarding memory efficiency?",
    choices: [
      "Generators are stored in dynamic cache buffers on the CPU, whereas lists are heap allocated",
      "Generators evaluate items lazily on demand and consume minimal memory, whereas lists hold all elements in RAM simultaneously",
      "Lists are immutable, meaning they always consume less memory than mutable generators",
      "There is no difference; they consume identical amounts of RAM"
    ],
    correctAnswer: "Generators evaluate items lazily on demand and consume minimal memory, whereas lists hold all elements in RAM simultaneously",
    explanation: "Lists instantiate all items and keep them in memory. Generators yield items one-by-one on demand via the iterator protocol, making them excellent for handling extremely large or infinite data streams."
  },
  {
    id: 64,
    difficulty: "HARD",
    category: "Python",
    questionText: "What is the role of 'asyncio.gather()' in Python asynchronous programming?",
    choices: [
      "It gathers all local variables inside a function and exports them as a JSON string",
      "It runs multiple coroutines concurrently and returns a consolidated list of their results when all complete",
      "It pauses all active threads to perform a garbage collection cycle",
      "It translates async code blocks into synchronous execution threads"
    ],
    correctAnswer: "It runs multiple coroutines concurrently and returns a consolidated list of their results when all complete",
    explanation: "'asyncio.gather(*aws)' is a powerful utility to run multiple awaitable futures or coroutines in parallel, blocking until all of them complete, then returning their aggregated outputs."
  },
  {
    id: 65,
    difficulty: "EASY",
    category: "Python",
    questionText: "What is the result of executing the expression '3 * [1]' in a standard Python interpreter?",
    choices: [
      "3",
      "[3]",
      "[1, 1, 1]",
      "TypeError: cannot multiply list by int"
    ],
    correctAnswer: "[1, 1, 1]",
    explanation: "In Python, the multiplication operator on sequence types (like lists or strings) performs replication, repeating the sequence elements the specified number of times."
  },
  {
    id: 66,
    difficulty: "MEDIUM",
    category: "Python",
    questionText: "What is the difference between 'copy.copy()' and 'copy.deepcopy()' in Python?",
    choices: [
      "copy.copy() is used for files; deepcopy() handles memory variables",
      "copy.copy() creates a shallow copy, copying only outer object references; copy.deepcopy() recursively copies all nested objects",
      "deepcopy() runs in background execution threads, whereas copy() runs synchronously",
      "There is no difference; they are interchangeable shortcuts"
    ],
    correctAnswer: "copy.copy() creates a shallow copy, copying only outer object references; copy.deepcopy() recursively copies all nested objects",
    explanation: "A shallow copy creates a new collection object but populates it with references to the original nested elements. A deep copy recursively duplicates every nested object, ensuring complete independence from the original."
  },
  {
    id: 67,
    difficulty: "HARD",
    category: "Python",
    questionText: "In Python multiple inheritance, how does the 'super()' keyword resolve which parent method to invoke?",
    choices: [
      "It selects a parent class randomly to execute its method",
      "It follows the C3 Linearization algorithm to determine the Method Resolution Order (MRO) list",
      "It always calls the first class listed in the inheritance signature",
      "It runs both parents concurrently on separate threads"
    ],
    correctAnswer: "It follows the C3 Linearization algorithm to determine the Method Resolution Order (MRO) list",
    explanation: "Python class MRO is calculated using the C3 Linearization algorithm. When 'super()' is called, it searches the next class in this MRO sequence, ensuring that no ancestor class is visited twice."
  },
  {
    id: 68,
    difficulty: "EASY",
    category: "Python",
    questionText: "Which operator is used to perform 'floor division' (yielding the largest integer less than or equal to the quotient) in Python?",
    choices: [
      "/",
      "%",
      "//",
      "\\"
    ],
    correctAnswer: "//",
    explanation: "The double slash (//) operator performs floor division, truncating the fractional part and returning an integer (or a float with .0 if operands are floats)."
  },
  {
    id: 69,
    difficulty: "MEDIUM",
    category: "Python",
    questionText: "What does applying the '@staticmethod' decorator to a method inside a Python class do?",
    choices: [
      "It prevents other subclasses from overriding the method",
      "It defines a method that receives neither an implicit self nor cls parameter, behaving exactly like a plain function",
      "It compiles the method into static machine assembly code",
      "It automatically synchronizes execution across concurrent threads"
    ],
    correctAnswer: "It defines a method that receives neither an implicit self nor cls parameter, behaving exactly like a plain function",
    explanation: "@staticmethod methods are self-contained. They do not access or modify class or instance states, acting as logically grouped utility functions within the class namespace."
  },
  {
    id: 70,
    difficulty: "HARD",
    category: "Python",
    questionText: "What is the primary function of the 'yield from' statement inside Python generators?",
    choices: [
      "It terminates the generator instantly and returns a value to the parent function",
      "It delegates generator operations directly to an external sub-generator or iterable, forwarding inputs and returning values",
      "It creates an identical backup generator to prevent data loss",
      "It forces the generator to run on parallel CPU cores"
    ],
    correctAnswer: "It delegates generator operations directly to an external sub-generator or iterable, forwarding inputs and returning values",
    explanation: "'yield from' establishes a bidirectional channel between the outer caller and an inner sub-generator. It automatically handles yielding values, passing sent inputs, and returning final generator results."
  },

  // ==========================================
  // C / C++ / SYSTEMS EXPANSION (IDs 71-85)
  // ==========================================
  {
    id: 71,
    difficulty: "EASY",
    category: "C / C++ / Systems",
    questionText: "Which keyword in C++ is used to dynamically allocate memory on the heap?",
    choices: [
      "malloc",
      "alloc",
      "new",
      "create"
    ],
    correctAnswer: "new",
    explanation: "In C++, the 'new' operator allocates heap memory for an object, invokes its constructor, and returns a typed pointer, providing safety compared to C's malloc."
  },
  {
    id: 72,
    difficulty: "MEDIUM",
    category: "C / C++ / Systems",
    questionText: "What does the RAII (Resource Acquisition Is Initialization) design pattern stand for in C++?",
    choices: [
      "A pattern where memory is compiled in parallel cycles",
      "A pattern where resource lifecycle is tied strictly to object lifetime, acquired in the constructor and released in the destructor",
      "An automated system that cleans up dangling pointers at runtime",
      "An import protocol loading libraries on startup"
    ],
    correctAnswer: "A pattern where resource lifecycle is tied strictly to object lifetime, acquired in the constructor and released in the destructor",
    explanation: "RAII is a core C++ paradigm. When an object is instantiated on the stack, it claims needed resources (locks, file handles, heap blocks). When it goes out of scope, its destructor fires, automatically releasing them."
  },
  {
    id: 73,
    difficulty: "HARD",
    category: "C / C++ / Systems",
    questionText: "Why is declaring a virtual destructor in a C++ base class considered essential for polymorphic design?",
    choices: [
      "Without it,derived class destructors will not be called when deleting a derived class instance via a base class pointer, causing memory leaks",
      "It tells the compiler that the class is an abstract interface definition",
      "It speeds up execution times of class methods",
      "It allows derived classes to inherit multiple base class definitions"
    ],
    correctAnswer: "Without it,derived class destructors will not be called when deleting a derived class instance via a base class pointer, causing memory leaks",
    explanation: "If a base class destructor is non-virtual, deleting a derived object through a base pointer results in undefined behavior—specifically, only the base destructor is called, leaking derived resource segments."
  },
  {
    id: 74,
    difficulty: "EASY",
    category: "C / C++ / Systems",
    questionText: "Which standard command-line tool is widely used on GNU/Linux systems to compile raw C code into binary formats?",
    choices: [
      "gcc",
      "make",
      "compile",
      "link"
    ],
    correctAnswer: "gcc",
    explanation: "GCC (GNU Compiler Collection) is the default open-source compiler on Unix-like operating systems, compiling C, C++, and systems-level languages."
  },
  {
    id: 75,
    difficulty: "MEDIUM",
    category: "C / C++ / Systems",
    questionText: "What does declaring a variable as 'volatile' signify to a C or C++ compiler?",
    choices: [
      "The variable is highly unstable and will be deleted if memory is full",
      "The variable can be modified by external events outside the program's control, preventing the compiler from optimizing away reads/writes",
      "The variable should be stored in high-speed CPU registers",
      "The variable is protected from concurrent modifications by threads"
    ],
    correctAnswer: "The variable can be modified by external events outside the program's control, preventing the compiler from optimizing away reads/writes",
    explanation: "The 'volatile' keyword prevents compilers from performing aggressive optimizations (like caching values in registers) on variables that could change due to hardware interrupts or other threads."
  },
  {
    id: 76,
    difficulty: "HARD",
    category: "C / C++ / Systems",
    questionText: "What is the primary function of 'std::move' in modern C++ standard templates?",
    choices: [
      "It physically shifts raw bytes inside RAM to consolidate available memory",
      "It casts its argument into an rvalue reference, enabling move constructors or assignments to steal resources instead of making deep copies",
      "It spawns a parallel thread to execute a function asynchronously",
      "It exports a class instance to an external file system"
    ],
    correctAnswer: "It casts its argument into an rvalue reference, enabling move constructors or assignments to steal resources instead of making deep copies",
    explanation: "std::move does not actually perform any runtime movements. It merely performs a static cast to an rvalue reference, signaling to the compiler that the object's resources can be safely claimed by move semantics."
  },
  {
    id: 77,
    difficulty: "EASY",
    category: "C / C++ / Systems",
    questionText: "Which standard header file must be imported in standard C to utilize functions like printf() and scanf()?",
    choices: [
      "<stdlib.h>",
      "<stdio.h>",
      "<string.h>",
      "<math.h>"
    ],
    correctAnswer: "<stdio.h>",
    explanation: "<stdio.h> (Standard Input/Output) defines the core function declarations, types, and macros used for input and output operations in standard C."
  },
  {
    id: 78,
    difficulty: "MEDIUM",
    category: "C / C++ / Systems",
    questionText: "What is the primary cause of a 'segmentation fault' runtime error in systems-level programming languages?",
    choices: [
      "A syntax error in a header declaration that failed compiling",
      "The application attempting to read or write to a restricted, unmapped, or invalid virtual memory address segment",
      "The stack frame growing too large during an infinite recursion block",
      "The CPU overheating due to heavy multithreading processes"
    ],
    correctAnswer: "The application attempting to read or write to a restricted, unmapped, or invalid virtual memory address segment",
    explanation: "A segmentation fault (segfault) occurs when hardware and OS memory protection blocks detect a process trying to access memory that it does not own, halting the process immediately."
  },
  {
    id: 79,
    difficulty: "HARD",
    category: "C / C++ / Systems",
    questionText: "What is a major architectural difference between using 'std::unique_ptr' and 'std::shared_ptr' in modern C++?",
    choices: [
      "std::unique_ptr uses garbage collection, whereas std::shared_ptr does not",
      "std::unique_ptr owns a resource exclusively with zero runtime overhead; std::shared_ptr uses a reference-counting control block to share ownership",
      "std::shared_ptr is only for primitive variables; std::unique_ptr handles class objects",
      "There is no difference; they are exact aliases"
    ],
    correctAnswer: "std::unique_ptr owns a resource exclusively with zero runtime overhead; std::shared_ptr uses a reference-counting control block to share ownership",
    explanation: "std::unique_ptr prevents resource sharing (it is non-copyable, only movable) with zero overhead. std::shared_ptr maintains a heap-allocated reference counting block, enabling multiple pointers to share ownership of a single resource."
  },
  {
    id: 80,
    difficulty: "EASY",
    category: "C / C++ / Systems",
    questionText: "What value does the unary operator 'sizeof' yield when evaluated in C or C++?",
    choices: [
      "The number of characters in a string sequence",
      "The size of a data type or object variable in bytes",
      "The total physical RAM available in the local computer",
      "The line count of the compiled source file"
    ],
    correctAnswer: "The size of a data type or object variable in bytes",
    explanation: "The sizeof operator yields the physical size in bytes required to store an object or data type in memory, evaluated at compile-time (except for variable-length arrays in C)."
  },
  {
    id: 81,
    difficulty: "MEDIUM",
    category: "C / C++ / Systems",
    questionText: "What is the purpose of employing 'header guards' (e.g., #ifndef HEADER_H / #define HEADER_H) in C/C++ header files?",
    choices: [
      "To prevent unauthorized scripts from reading source files",
      "To ensure that header contents are compiled exactly once within a translation unit, avoiding duplicate definition errors",
      "To compress header file sizes before compilation",
      "To lock header code blocks from being modified by subclasses"
    ],
    correctAnswer: "To ensure that header contents are compiled exactly once within a translation unit, avoiding duplicate definition errors",
    explanation: "Header guards ensure that the preprocessor only includes the header declarations once per compiled source file, preventing cyclic inclusion compiler errors."
  },
  {
    id: 82,
    difficulty: "HARD",
    category: "C / C++ / Systems",
    questionText: "How do stack and heap memory allocation compare regarding access speed and physical size in standard systems architecture?",
    choices: [
      "Heap is extremely fast but small; stack is slow but massive",
      "Stack is extremely fast but relatively small and automatically managed; heap is larger but slower to allocate, needing manual management",
      "Stack and heap have identical capacities and performance",
      "Stack is stored on the hard drive, whereas heap is stored in CPU registers"
    ],
    correctAnswer: "Stack is extremely fast but relatively small and automatically managed; heap is larger but slower to allocate, needing manual management",
    explanation: "Stack allocations are simple pointer offsets, making them fast but bounded by strict stack size limits. Heap allocations require searching free-list structures and tracking blocks, which is slower but accommodates large structures."
  },
  {
    id: 83,
    difficulty: "EASY",
    category: "C / C++ / Systems",
    questionText: "Which keyword in C++11 is used to declare that a function is guaranteed not to throw any exceptions?",
    choices: [
      "throw()",
      "safe",
      "noexcept",
      "const"
    ],
    correctAnswer: "noexcept",
    explanation: "The 'noexcept' specifier tells the compiler that a function will not throw exceptions. This allows the compiler to perform optimizations, since it doesn't need to generate stack-unwinding blocks."
  },
  {
    id: 84,
    difficulty: "MEDIUM",
    category: "C / C++ / Systems",
    questionText: "What does the 'extern' keyword denote when prefixing a global variable declaration in C?",
    choices: [
      "The variable is static and local only to the header file",
      "The variable is defined in another source file or compilation unit and will be linked at link-time",
      "The variable should be exported directly to background threads",
      "The variable should be deleted when the active function returns"
    ],
    correctAnswer: "The variable is defined in another source file or compilation unit and will be linked at link-time",
    explanation: "extern tells the compiler that the variable's storage exists elsewhere. The compiler reserves space for a reference, leaving the linker to connect it with the actual definition."
  },
  {
    id: 85,
    difficulty: "HARD",
    category: "C / C++ / Systems",
    questionText: "In C++ meta-programming, what does the rule 'SFINAE' (Substitution Failure Is Not An Error) signify?",
    choices: [
      "If a compiler template fails to compile, it halts compilation immediately",
      "If a substitution error occurs during template specialization, the compiler discards that candidate instead of failing the build",
      "A rule that forces every template class to have an explicit constructor",
      "An automated routine converting templates into runtime pointers"
    ],
    correctAnswer: "If a substitution error occurs during template specialization, the compiler discards that candidate instead of failing the build",
    explanation: "SFINAE allows template overloads to fail substitution silently. The compiler merely ignores the failing template overload and continues looking for other valid specializations, enabling powerful compile-time type introspection."
  },

  // ==========================================
  // MIXED CS & PARADIGMS EXPANSION (IDs 86-100)
  // ==========================================
  {
    id: 86,
    difficulty: "EASY",
    category: "Mixed Languages & CS",
    questionText: "What is the default standard port number utilized for secure, encrypted web traffic (HTTPS)?",
    choices: [
      "80",
      "21",
      "443",
      "8080"
    ],
    correctAnswer: "443",
    explanation: "Port 443 is the standard port for Secure HTTP (HTTPS) using SSL/TLS encryption. Port 80 is used for unencrypted HTTP traffic."
  },
  {
    id: 87,
    difficulty: "MEDIUM",
    category: "Mixed Languages & CS",
    questionText: "What core database transaction properties are summarized by the ACID acronym?",
    choices: [
      "Algorithm, Complexity, Inheritance, Density",
      "Atomicity, Consistency, Isolation, Durability",
      "Array, Collection, Interface, Directory",
      "Authentication, Connection, Integrity, Data"
    ],
    correctAnswer: "Atomicity, Consistency, Isolation, Durability",
    explanation: "ACID properties guarantee relational database transaction reliability: Atomicity (all or nothing), Consistency (preserves rules), Isolation (concurrent safety), and Durability (survives crashes)."
  },
  {
    id: 88,
    difficulty: "HARD",
    category: "Mixed Languages & CS",
    questionText: "What is the worst-case lookup time complexity in a perfectly balanced Binary Search Tree (BST) containing n elements?",
    choices: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    correctAnswer: "O(log n)",
    explanation: "In a balanced BST, each comparison discards half of the remaining nodes. Hence, searching requires at most log2(n) comparisons, yielding O(log n) time complexity."
  },
  {
    id: 89,
    difficulty: "EASY",
    category: "Mixed Languages & CS",
    questionText: "Which classic abstract data structure implements the Last In, First Out (LIFO) access pattern?",
    choices: [
      "Queue",
      "Stack",
      "LinkedList",
      "HashMap"
    ],
    correctAnswer: "Stack",
    explanation: "A Stack restricts insertion and removal to one end. The last item pushed onto the stack is the first item popped off (LIFO), like a stack of plates."
  },
  {
    id: 90,
    difficulty: "MEDIUM",
    category: "Mixed Languages & CS",
    questionText: "What is the fundamental difference between a 'process' and a 'thread' in modern operating system architectures?",
    choices: [
      "Processes run on CPUs, whereas threads run on memory registers",
      "A process has its own isolated virtual memory space; threads share their parent process's memory space and resources",
      "Threads cannot be terminated, whereas processes can be terminated at any time",
      "There is no difference; they are interchangeable operating system terms"
    ],
    correctAnswer: "A process has its own isolated virtual memory space; threads share their parent process's memory space and resources",
    explanation: "Processes are isolated administrative entities in OS design. Threads are lightweight execution paths inside a process, sharing the same address space, which allows fast communication but requires sync locks."
  },
  {
    id: 91,
    difficulty: "HARD",
    category: "Mixed Languages & CS",
    questionText: "What is the primary function of the 'Two-Phase Commit' (2PC) protocol in distributed system databases?",
    choices: [
      "To compress database records into a dual-file zip archive",
      "To ensure atomic transaction commit decisions across multiple independent nodes in a distributed network",
      "To encrypt database traffic using two distinct keys",
      "To backup database schemas across two separate server drives"
    ],
    correctAnswer: "To ensure atomic transaction commit decisions across multiple independent nodes in a distributed network",
    explanation: "2PC consists of a Prepare Phase and a Commit Phase. A coordinator asks all participant nodes if they can commit. If all agree, the coordinator orders a commit; otherwise, everyone aborts, preserving global consistency."
  },
  {
    id: 92,
    difficulty: "EASY",
    category: "Mixed Languages & CS",
    questionText: "Which application-layer internet protocol is standard for sending or forwarding email messages between mail servers?",
    choices: [
      "FTP",
      "HTTP",
      "SMTP",
      "IMAP"
    ],
    correctAnswer: "SMTP",
    explanation: "SMTP (Simple Mail Transfer Protocol) handles sending and routing outgoing mail. POP3 and IMAP are protocols used for retrieving mail from servers."
  },
  {
    id: 93,
    difficulty: "MEDIUM",
    category: "Mixed Languages & CS",
    questionText: "What is a defining structural difference between relational (SQL) and non-relational (NoSQL) databases?",
    choices: [
      "NoSQL databases are strictly restricted from holding any string text",
      "SQL databases utilize structured relational tables with rigid schemas; NoSQL databases offer flexible, dynamic models like documents, key-values, or graphs",
      "SQL databases can only run on local machines, while NoSQL databases run on cloud servers",
      "Relational databases do not support backup capabilities, whereas NoSQL does"
    ],
    correctAnswer: "SQL databases utilize structured relational tables with rigid schemas; NoSQL databases offer flexible, dynamic models like documents, key-values, or graphs",
    explanation: "SQL databases enforce structured schemas with foreign keys and tables. NoSQL databases bypass rigid schemas to scale horizontally, supporting document stores (MongoDB), key-value databases (Redis), or graphs (Neo4j)."
  },
  {
    id: 94,
    difficulty: "HARD",
    category: "Mixed Languages & CS",
    questionText: "In TCP network transmission, what is the primary role of the 'sliding window' mechanism?",
    choices: [
      "To encrypt web socket packages before transmitting",
      "To perform flow control, preventing a fast sender from overwhelming a slow receiver by restricting outstanding unacknowledged bytes",
      "To split large images into smaller visual segments",
      "To measure physical fiber-optic connection distances"
    ],
    correctAnswer: "To perform flow control, preventing a fast sender from overwhelming a slow receiver by restricting outstanding unacknowledged bytes",
    explanation: "The sliding window protocol is a TCP flow control system. The receiver advertises its current buffer size (window) in ACK packets. The sender cannot transmit more bytes than this window allows, avoiding packet drops."
  },
  {
    id: 95,
    difficulty: "EASY",
    category: "Mixed Languages & CS",
    questionText: "Which abstract data structure is best suited for implementing a First In, First Out (FIFO) processing queue?",
    choices: [
      "Stack",
      "Queue",
      "BinaryTree",
      "HashMap"
    ],
    correctAnswer: "Queue",
    explanation: "A Queue appends new items to the back and removes processed items from the front, mirroring a physical line where the first to arrive is the first served (FIFO)."
  },
  {
    id: 96,
    difficulty: "MEDIUM",
    category: "Mixed Languages & CS",
    questionText: "What is the primary function of the Domain Name System (DNS) in internet routing?",
    choices: [
      "To check if a web page has secure SSL certificate credentials",
      "To translate human-readable domain names (like google.com) into computer-routable IP addresses",
      "To store user usernames and passwords in a global repository",
      "To coordinate concurrent packet transmissions over coaxial cables"
    ],
    correctAnswer: "To translate human-readable domain names (like google.com) into computer-routable IP addresses",
    explanation: "DNS behaves as the phonebook of the Internet. It maps user-friendly names to numerical IP addresses (e.g., 142.250.190.46), enabling browsers to load internet resources."
  },
  {
    id: 97,
    difficulty: "HARD",
    category: "Mixed Languages & CS",
    questionText: "What is the primary objective of Dijkstra's algorithm in computer science graph theory?",
    choices: [
      "To find a minimum spanning tree in an undirected graph",
      "To find the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights",
      "To detect if a graph contains any cycles or loop states",
      "To sort nodes alphabetically based on their label values"
    ],
    correctAnswer: "To find the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights",
    explanation: "Dijkstra's algorithm is a greedy algorithm that finds the shortest path from a source node to all other vertices. It maintains a set of tentative distances, choosing the node with the minimum distance at each iteration."
  },
  {
    id: 98,
    difficulty: "EASY",
    category: "Mixed Languages & CS",
    questionText: "What does receiving an HTTP status code '404' signify to a web client?",
    choices: [
      "The server is currently offline for maintenance",
      "The requested resource was not found on the server",
      "The client does not have permission to view the resource",
      "The server encountered an unhandled exception error"
    ],
    correctAnswer: "The requested resource was not found on the server",
    explanation: "HTTP 404 is a standard client-side error status indicating that the server could communicate with the client, but the server could not locate the requested URL."
  },
  {
    id: 99,
    difficulty: "MEDIUM",
    category: "Mixed Languages & CS",
    questionText: "What is the primary difference between symmetric and asymmetric cryptography?",
    choices: [
      "Symmetric is used only for text, whereas asymmetric handles video buffers",
      "Symmetric cryptography uses a single shared key for both encryption and decryption; asymmetric uses a public/private key pair",
      "Asymmetric cryptography is only implemented on local mainframe systems",
      "Symmetric cryptography runs in background parallel web threads"
    ],
    correctAnswer: "Symmetric cryptography uses a single shared key for both encryption and decryption; asymmetric uses a public/private key pair",
    explanation: "Symmetric encryption (e.g., AES) is fast and uses one shared secret key. Asymmetric encryption (e.g., RSA) uses two mathematically linked keys: a public key for encryption and a private key for decryption."
  },
  {
    id: 100,
    difficulty: "HARD",
    category: "Mixed Languages & CS",
    questionText: "What fundamental rule does the CAP Theorem state about distributed system database design?",
    choices: [
      "A distributed database can only have a maximum of three active nodes",
      "A distributed system can guarantee at most two of the following: Consistency, Availability, and Partition Tolerance",
      "All distributed queries are resolved in linear O(n) execution times",
      "Database clusters must be backed up at least once every 24 hours"
    ],
    correctAnswer: "A distributed system can guarantee at most two of the following: Consistency, Availability, and Partition Tolerance",
    explanation: "The CAP Theorem states that in the event of a network partition (P), a distributed system must choose between Consistency (C, all nodes see same data) or Availability (A, every request receives a non-error response), but cannot achieve both."
  }
];

