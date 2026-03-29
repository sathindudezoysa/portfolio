---
title: "TestLang++"
description: "API Testing DSL Compiler"
---

[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## About TestLang++

TestLang++ is a custom Domain-Specific Language (DSL) designed to make backend testing fast, readable, and highly maintainable. Currently, the compiler parses `.test` files and translates them into runnable JUnit 5 Java test classes.

Built for speed and flexibility, the compiler core relies on **Flex (Lex)** and **Bison (Yacc)**, with intermediate code generation handled in **C**.

## 🚀 Vision & Roadmap

TestLang++ is actively expanding beyond its Java/API roots. We are currently looking for contributors to help build out the following features:

- **Multi-Language Support:** Expanding the C code generator to compile `.test` files into Python (e.g., PyTest) and other testing frameworks.
- **Unit Testing Capabilities:** Extending the DSL grammar beyond API endpoints to support modular unit test generation.
- **Enhanced Assertions:** Broadening the `expect` syntax for more complex payload validations.

## Features

- **Declarative Syntax:** Define `config` blocks for global settings, setup `let` variables, and isolate tests in `test` blocks.
- **Native HTTP Methods:** First-class support for `GET`, `POST`, `PUT`, and `DELETE`.
- **Multiline JSON:** Native support for `"""..."""` multiline JSON payloads.

## Features Implemented

This compiler successfully implements all core requirements of the assignment, as well as the optional bonus features.

- **Compiler:** Built with Flex and Bison, generating C code that produces a Java output file.

- **DSL Parsing:** Reliably parses:
  - `config { ... }` blocks for global settings like `base_url` and default `header`s.

  - `let ... = ...;` statements for global variable declaration (both strings and numbers).

  - `test { ... }` blocks, which are mapped to individual `@Test` methods in JUnit.

- **Variable Substitution:** Correctly substitutes variables (e.g., `$id`, `$role`) in request URLs, headers, and bodies.

- **HTTP Methods:** Supports all required HTTP methods:
  - `GET`

  - `POST` (with optional body and headers)

  - `PUT` (with optional body and headers)

  - `DELETE`

- **Assertions:** Generates JUnit assertions for:
  - `expect status = 200`

  - `expect header "key" = "value"`

  - `expect header "key" contains "value"`

  - `expect body contains "substring"`

- **✨ Optional Feature: Multiline JSON Bodies:** Supports `"""..."""` syntax for multiline JSON strings in `POST` and `PUT` request bodies, making them much easier to read and write.

- **✨ Optional Feature: Status Code Ranges:** Supports `expect status in 200..299` for asserting a range of successful status codes.

## TestLang++ Grammar (EBNF)

This is the formal EBNF grammar that the compiler implements.

```ebnf
Program = [ConfigSection], {LetStatement}, {TestBlock};

ConfigSection = "config", "{", {ConfigStatement}, "}";
ConfigStatement = BaseUrl | HeaderStatement;
BaseUrl = "base_url", "=", String, ";";
HeaderStatement = "header", String, "=", String, ";";

LetStatement = "let", Identifier, "=", (String | Number), ";";

TestBlock = "test", Identifier, "{", {Step}, "}";
Step = Request | Assertion;

Request = GetRequest | DeleteRequest | PostRequest | PutRequest;

GetRequest = "GET", String, ";";
DeleteRequest = "DELETE", String, ";";
PostRequest = "POST", String, [RequestBlock];
PutRequest = "PUT", String, [RequestBlock];

RequestBlock = "{", {RequestStatement}, "}";
RequestStatement = BodyStatement | HeaderStatementInBlock;
BodyStatement = "body", "=", (String | JsonBody), ";";
HeaderStatementInBlock = "header", String, "=", String, ";";

Assertion = ExpectStatement;
ExpectStatement = "expect", ExpectCondition, ";";
ExpectCondition = StatusAssertion | HeaderAssertion | BodyAssertion;
StatusAssertion = "status", ("=", Number | "in", Number, "..", Number);
HeaderAssertion = "header", String, ("=" | "contains"), String;
BodyAssertion = "body", "contains", String;

String = '"', {Character | Escape}, '"';
JsonBody = '"""', {AnyCharacter}, '"""';
Escape = '\\', ('"' | '\\');
Number = Digit, {Digit};
Identifier = Letter, {Letter | Digit};
Letter = "A" | "B" | ... | "Z" | "a" | "b" | ... | "z";
Digit = "0" | "1" | ... | "9";
```

## Project Structure

```text
.
├── bin/                 # Compiled executables
│   └── testlang         # <- The compiled compiler
│
├── compiler/            # Compiler source code
│   ├── Makefile         # Build configuration
│   ├── include/         # Header files (e.g., codegen.h)
│   └── src/             # Core implementation
    │   ├── lexer.l      # Flex lexer rules
    │   ├── parser.y     # Bison grammar rules
    │   └── codegen/     # C code generation logic
    │
    ├── tests/            # Tests cases
    │   └── api/          #api test cases
    │   └── unit/         #unit test cases

```

(Note: A build/ directory will be automatically generated inside compiler/ during the make process to hold intermediate object files and generated C code.)
(Note: out/ directory will be automatically generated inside compiler during the make test process to hold the generated test cases.)

## How to Run

Follow these steps to build the compiler, run the backend, generate the tests, and execute them.

### Prerequisites

- `gcc`, `make`, `flex`, `bison` (for building the compiler)
- `java` (JDK 11+), `maven` (for running the Spring Boot backend)
- `java` (JDK 11+) (for running the JUnit tests)

### Step 1: Build the Compiler (`testlang`)

We use `make` to compile the lexer, parser, and code generators.

```bash
# Navigate to the compiler directory
cd compiler

# Build the project
make

```

### Step 2: Generate the Java Tests

Once the compiler is built, you can run the test cases to see whether compiler pass the test cases.

```bash
#run test cases
make test
```

## Currently Handles Erros

A compiler is no good if it doesn't help you find mistakes! The yyerror function in parser.y is set up to give you clear, color-coded feedback right in your terminal, including the line number and the line that has the problem.

Here are the types of errors it can catch:

#### 1. Lexical Errors (Typo-level)

This happens when you use a character that the language doesn't recognize at all.

- Example Code: `let x = 10; %`
- Error Message:

```bash
8: error: Unexpected character
  8 | let x = 10; %
```

#### 2. Syntax Errors (Grammar-level)

This is the most common error. It means you wrote something in the wrong order or are missing a token (like a semicolon or a brace).

- Example Code (Missing semicolon): `let x = 10`
- Error Message:

```bash
8: error: syntax error, unexpected 'test', expecting SEMICOLON
  8 | let x = 10
```

#### 3. Semantic Errors (Logic-level)

These errors happen when your code is syntactically perfect, but it just doesn't make sense.

- Invalid Variable Name: The language rules say variable names must start with a letter.
  - Example Code: `let 1badVar = "oops"`;

  - Error Message:

```bash
8: error: Invalid variable name: 1badVar
  8 | let 1badVar = "oops";
```

- Undefined Variable: You try to use a variable (like $nope) that you never defined with let.
  - Example Code: `GET "/api/users/$nope";`

  - Error Message:

```bash
16: error: Undefined variable 'nope' in '/api/users/$nope'
  16 |   GET "/api/users/$nope";
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Whether you want to fix a bug, enhance the grammar, or help us build out Python test generation, your contributions are **greatly appreciated**.

To get started, please read our [Contributing Guidelines](CONTRIBUTING.md). It covers everything you need to know about setting up the compiler locally, understanding the project architecture, and submitting your first Pull Request.
