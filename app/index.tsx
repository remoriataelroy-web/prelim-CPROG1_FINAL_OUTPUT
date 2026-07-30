import { useState, useEffect } from 'react';
import {
  YStack,
  XStack,
  ScrollView,
  Card,
  Button,
  H1,
  H2,
  H3,
  Paragraph,
  SizableText,
  Sheet,
  AppHeader,
  Separator,
  Badge,
  Input,
  TextArea,
  Spinner,
} from '@blinkdotnew/mobile-ui';
import {
  BookOpen,
  Database,
  Calculator,
  GitBranch,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Terminal,
  FileCode2,
  LogIn,
  Send,
  User,
  LogOut,
  Sparkles,
  AlertCircle,
} from '@tamagui/lucide-icons';
import { blink } from '@/lib/blink';
import { BlinkAuthError } from '@blinkdotnew/sdk';

// ─── Topic Content ────────────────────────────────────────────

interface Topic {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badgeColor: string;
  sections: { heading: string; body: string; code?: string; codeOutput?: string }[];
}

const TOPICS: Topic[] = [
  {
    id: 'variables',
    title: 'Variables',
    subtitle: 'Named storage for values in memory',
    icon: <BookOpen size={22} color="#fff" />,
    badgeColor: '$blue9',
    sections: [
      {
        heading: 'What are Variables?',
        body: 'A variable is a named container that holds a value in the computer\'s memory. In Python, you create a variable simply by assigning a value to a name — no declaration keyword is needed.',
      },
      {
        heading: 'Declaration & Assignment',
        code: '# Variable declaration and assignment\nname = "Juan"          # string\nage = 20               # integer\ngpa = 1.75             # float\nis_enrolled = True     # boolean',
        body: 'Python uses dynamic typing — the type is inferred from the value. You can even reassign a variable to a different type (though that\'s not recommended).',
      },
      {
        heading: 'Naming Rules',
        body: '1. Must start with a letter (a–z, A–Z) or underscore (_).\n2. Can contain letters, digits (0–9), and underscores.\n3. Case-sensitive: `age` and `Age` are different.\n4. Cannot use Python reserved words (if, for, while, etc.).\n5. Use snake_case for multi-word names: `student_name`.',
      },
      {
        heading: 'Multiple Assignment',
        code: 'x, y, z = 10, 20, 30    # assign three at once\na = b = c = 0            # all three get 0',
        body: 'Python lets you assign multiple variables in a single line. This is useful for swapping values without a temporary variable: `a, b = b, a`.',
        codeOutput: 'x=10  y=20  z=30\na=b=c=0',
      },
      {
        heading: 'Checking the Type',
        code: 'score = 95.5\nprint(type(score))      # <class \'float\'>\n\nname = "Maria"\nprint(type(name))       # <class \'str\'>',
        body: 'Use `type()` to inspect what kind of data a variable holds. This is handy for debugging and input validation.',
      },
    ],
  },
  {
    id: 'data-types',
    title: 'Data Types',
    subtitle: 'The building blocks of every program',
    icon: <Database size={22} color="#fff" />,
    badgeColor: '$green9',
    sections: [
      {
        heading: 'Numeric Types',
        code: 'age = 20                # int (whole number)\nprice = 99.99           # float (decimal)\nbig = 1_000_000         # int with underscores\nsci = 1.5e3             # float: 1500.0',
        body: 'Python has three numeric types: `int` (unlimited precision), `float` (64-bit floating point), and `complex` (real + imaginary).',
      },
      {
        heading: 'Text Type: str',
        code: 'greeting = "Hello, World!"\nname = \'Maria\'\nmulti = """Line 1\nLine 2\nLine 3"""\n\n# String operations\nfull = greeting + " " + name     # concatenation\nrepeat = "Ha" * 3               # "HaHaHa"\nlength = len(greeting)          # 13',
        body: 'Strings can use single, double, or triple quotes. They support concatenation (+), repetition (*), indexing, and slicing.',
      },
      {
        heading: 'Sequence Types',
        code: '# List (mutable, ordered)\nfruits = ["apple", "banana", "mango"]\nfruits.append("orange")\nfruits[0] = "grape"\n\n# Tuple (immutable, ordered)\npoint = (3, 7)\ncolors = ("red", "green", "blue")\n\n# Range (immutable sequence of numbers)\nnums = range(1, 11)     # 1 through 10',
        body: 'Lists `[]` are mutable — you can change them. Tuples `()` are immutable — once created, they cannot be modified. `range()` generates arithmetic progressions.',
      },
      {
        heading: 'Mapping Type: dict',
        code: 'student = {\n    "name": "Juan",\n    "age": 20,\n    "grades": [85, 90, 88]\n}\n\nprint(student["name"])          # Juan\nstudent["course"] = "BSCS"      # add new key\nprint(student.get("gpa", "N/A")) # safe access',
        body: 'Dictionaries store key-value pairs. Keys must be immutable (strings, numbers, tuples). Values can be anything.',
      },
      {
        heading: 'Other Important Types',
        code: '# Boolean\nis_pass = True\nis_admin = False\nprint(10 > 5)        # True\n\n# Set (unordered, unique)\ntags = {"python", "coding", "prelim"}\ntags.add("exam")\n\n# NoneType\nresult = None        # represents "no value"',
        body: '`bool` — True/False. `set` — unordered collection of unique items. `None` — Python\'s null value.',
      },
    ],
  },
  {
    id: 'operators',
    title: 'Operators',
    subtitle: 'Symbols that perform operations on values',
    icon: <Calculator size={22} color="#fff" />,
    badgeColor: '$orange9',
    sections: [
      {
        heading: 'Arithmetic Operators',
        code: 'a = 15\nb = 4\n\nprint(a + b)    # 19  (addition)\nprint(a - b)    # 11  (subtraction)\nprint(a * b)    # 60  (multiplication)\nprint(a / b)    # 3.75  (true division)\nprint(a // b)   # 3  (floor division)\nprint(a % b)    # 3  (modulo / remainder)\nprint(a ** b)   # 50625  (exponentiation)',
        body: 'Python follows standard arithmetic rules. `/` always returns a float. `//` discards the decimal part. `%` gives the remainder. `**` is for powers.',
      },
      {
        heading: 'Comparison (Relational) Operators',
        code: 'x, y = 10, 20\n\nprint(x == y)    # False  (equal to)\nprint(x != y)    # True   (not equal to)\nprint(x < y)     # True   (less than)\nprint(x > y)     # False  (greater than)\nprint(x <= 10)   # True   (less than or equal)\nprint(y >= 25)   # False  (greater than or equal)',
        body: 'Comparison operators always return a boolean (`True` or `False`). They are essential for decision-making in control structures.',
      },
      {
        heading: 'Logical Operators',
        code: 'age = 22\nhas_id = True\n\n# and: both conditions must be True\nprint(age >= 18 and has_id)   # True\n\n# or: at least one must be True\nprint(age < 18 or has_id)     # True\n\n# not: inverts the boolean\nprint(not has_id)             # False',
        body: '`and`, `or`, `not` let you combine multiple conditions. Python uses short-circuit evaluation — it stops as soon as the result is determined.',
      },
      {
        heading: 'Assignment & Compound Operators',
        code: 'count = 0\ncount += 1    # count = count + 1 → 1\ncount -= 2    # count = count - 2 → -1\ncount *= 5    # count = count * 5 → -5\ncount /= 2    # count = count / 2 → -2.5\n\nname = "Hi"\nname += " there"   # "Hi there"',
        body: 'Compound operators are shorthand: `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=`. They work with numbers and `+=` also works with strings.',
      },
      {
        heading: 'Identity & Membership',
        code: '# Identity: checks if same object in memory\na = [1, 2, 3]\nb = [1, 2, 3]\nc = a\nprint(a is c)       # True  (same object)\nprint(a is b)       # False (different objects)\nprint(a == b)       # True  (same content)\n\n# Membership: checks if value exists\nfruits = ["apple", "banana"]\nprint("apple" in fruits)      # True\nprint("grape" not in fruits)  # True',
        body: '`is` checks object identity (same memory address). `==` checks value equality. `in` checks if a value is present in a sequence.',
      },
    ],
  },
  {
    id: 'control-structures',
    title: 'Control Structures',
    subtitle: 'Directing the flow of your program',
    icon: <GitBranch size={22} color="#fff" />,
    badgeColor: '$purple9',
    sections: [
      {
        heading: 'if / elif / else',
        code: 'grade = 85\n\nif grade >= 90:\n    print("Excellent!")\nelif grade >= 80:\n    print("Very Good!")\nelif grade >= 75:\n    print("Good")\nelse:\n    print("Needs Improvement")\n\n# Output: Very Good!',
        body: 'The `if` statement executes a block only when its condition is `True`. `elif` (else-if) checks additional conditions. `else` runs when all previous conditions are `False`. Indentation defines the block.',
        codeOutput: 'Very Good!',
      },
      {
        heading: 'Nested Conditionals',
        code: 'age = 20\nhas_permit = True\n\nif age >= 18:\n    if has_permit:\n        print("You can drive.")\n    else:\n        print("Get a permit first.")\nelse:\n    print("Too young to drive.")',
        body: 'You can nest `if` statements inside other `if` blocks to create multi-level decision trees.',
        codeOutput: 'You can drive.',
      },
      {
        heading: 'for Loop',
        code: '# Loop through a range\nfor i in range(5):\n    print(f"Iteration {i}")\n\n# Loop through a list\nfruits = ["apple", "banana", "mango"]\nfor fruit in fruits:\n    print(f"I like {fruit}")\n\n# Loop with index\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")',
        body: '`for` iterates over a sequence (list, tuple, string, range). `enumerate()` gives you both the index and the value. `range(n)` produces numbers 0 to n-1.',
      },
      {
        heading: 'while Loop',
        code: 'count = 0\nwhile count < 5:\n    print(f"Count is {count}")\n    count += 1\n\nprint("Loop finished!")',
        body: '`while` repeats as long as the condition remains `True`. Be careful — if the condition never becomes `False`, you get an infinite loop. Always include a way to exit.',
      },
      {
        heading: 'break, continue, pass',
        code: '# break: exit the loop immediately\nfor i in range(10):\n    if i == 5:\n        break\n    print(i)    # prints 0-4\n\n# continue: skip to next iteration\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i)    # prints 0,1,3,4\n\n# pass: do nothing (placeholder)\nif True:\n    pass',
        body: '`break` exits the loop. `continue` skips the rest of the current iteration. `pass` is a no-op placeholder used when syntax requires a statement but you don\'t need any action.',
      },
    ],
  },
  {
    id: 'algorithm-design',
    title: 'Algorithm Design',
    subtitle: 'Step-by-step problem solving',
    icon: <Lightbulb size={22} color="#fff" />,
    badgeColor: '$pink9',
    sections: [
      {
        heading: 'What is an Algorithm?',
        body: 'An algorithm is a finite sequence of well-defined instructions designed to solve a specific problem or perform a computation. Every program you write IS an algorithm.\n\nKey properties:\n• Finiteness — must terminate after a finite number of steps\n• Definiteness — each step must be precisely defined\n• Input — zero or more inputs\n• Output — at least one output\n• Effectiveness — each step must be basic enough to be carried out',
      },
      {
        heading: 'Example 1: Sum of N Numbers',
        code: '# Algorithm: Sum of first N natural numbers\n# Input: n (a positive integer)\n# Output: sum of 1 + 2 + ... + n\n\ndef sum_of_n(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\nn = 5\nresult = sum_of_n(n)\nprint(f"Sum of first {n} numbers = {result}")',
        body: 'This demonstrates a classic iterative algorithm. Initialize an accumulator (`total`), loop through values, add each one, and return the result.',
        codeOutput: 'Sum of first 5 numbers = 15',
      },
      {
        heading: 'Example 2: Factorial',
        code: '# Algorithm: Factorial of a number\n# Input: n (non-negative integer)\n# Output: n! = n * (n-1) * ... * 1\n\ndef factorial(n):\n    if n < 0:\n        return "Invalid input"\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result\n\nprint(f"5! = {factorial(5)}")',
        body: 'The factorial algorithm multiplies numbers from 1 to n. Special case: 0! = 1. The iteration builds up the product step by step.',
        codeOutput: '5! = 120',
      },
      {
        heading: 'Input Validation Pattern',
        code: 'def get_positive_int(prompt):\n    """Keep asking until user provides a valid positive integer."""\n    while True:\n        try:\n            value = int(input(prompt))\n            if value > 0:\n                return value\n            print("Please enter a positive number.")\n        except ValueError:\n            print("Invalid input. Enter a whole number.")\n\n# Usage\nage = get_positive_int("Enter age: ")',
        body: 'Input validation is critical in real programs. This pattern uses a `while True` loop with `try/except` to handle invalid inputs gracefully, only returning when valid data is received.',
      },
      {
        heading: 'Flowchart Symbols',
        body: 'Standard flowchart symbols used in algorithm design:\n\n⬭ Oval — Start / End (Terminator)\n▭ Rectangle — Process / Action step\n◇ Diamond — Decision / Branch (yes/no)\n▱ Parallelogram — Input / Output\n→ Arrow — Flow direction\n○ Circle — Connector\n\nA well-drawn flowchart makes the algorithm\'s logic visible before you write a single line of code.',
      },
    ],
  },
];

// ─── Code Block Component ─────────────────────────────────────

function CodeBlock({ code, output }: { code: string; output?: string }) {
  return (
    <YStack gap="$2">
      <Card backgroundColor="$color3" bordered borderColor="$color5" padding="$4" borderRadius="$3">
        <XStack gap="$2" alignItems="flex-start">
          <FileCode2 size={14} color="$color9" style={{ marginTop: 2 }} />
          <SizableText
            fontFamily="$mono"
            size="$2"
            color="$color11"
            lineHeight={20}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {code}
          </SizableText>
        </XStack>
      </Card>
      {output && (
        <XStack gap="$2" paddingLeft="$1">
          <ArrowRight size={14} color="$green9" />
          <SizableText fontFamily="$mono" size="$2" color="$green11">
            {output}
          </SizableText>
        </XStack>
      )}
    </YStack>
  );
}

// ─── Topic Section ────────────────────────────────────────────

function TopicSection({ heading, body, code, codeOutput }: Topic['sections'][number]) {
  return (
    <YStack gap="$3">
      <XStack gap="$2" alignItems="center">
        <CheckCircle2 size={16} color="$color9" />
        <H3 color="$color12">{heading}</H3>
      </XStack>
      <SizableText size="$3" color="$color10" lineHeight={22} style={{ whiteSpace: 'pre-wrap' }}>
        {body}
      </SizableText>
      {code && <CodeBlock code={code} output={codeOutput} />}
      <Separator />
    </YStack>
  );
}

// ─── Auth Hook ────────────────────────────────────────────────

interface AuthState {
  user: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuth({
        user: state.user,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
      });
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await blink.auth.signInWithEmail({ email, password });
      return null;
    } catch (err) {
      if (err instanceof BlinkAuthError) return err.message;
      return 'Sign in failed. Please try again.';
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await blink.auth.signUp({ email, password });
      return null;
    } catch (err) {
      if (err instanceof BlinkAuthError) return err.message;
      return 'Sign up failed. Please try again.';
    }
  };

  const signOut = () => blink.auth.signOut();

  return { ...auth, signIn, signUp, signOut };
}

// ─── Main Screen ──────────────────────────────────────────────

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [reviewResult, setReviewResult] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Auth form state
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const { isAuthenticated, user, signIn, signUp, signOut } = useAuth();

  const handleOpen = (topic: Topic) => {
    setSelectedTopic(topic);
    setOpen(true);
  };

  const handleReviewSubmit = async () => {
    if (!codeInput.trim()) return;
    if (!isAuthenticated) {
      setReviewError('Please sign in to use code review.');
      return;
    }
    setIsReviewing(true);
    setReviewError('');
    setReviewResult('');

    try {
      const { text } = await blink.ai.generateText({
        model: 'google/gemini-3-flash',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert Python instructor reviewing student code for a Computer Programming 1 (CPROG1) prelim course. Analyze the submitted code and provide concise, helpful feedback covering: 1) Correctness — does it work as intended? 2) Coding style — naming, indentation, readability. 3) Potential errors or bugs. 4) Suggestions for improvement. Keep the tone encouraging and educational. Use markdown formatting with bullet points.',
          },
          {
            role: 'user',
            content: `Please review this Python code:\n\n\`\`\`python\n${codeInput}\n\`\`\``,
          },
        ],
      });
      setReviewResult(text);
    } catch (err: any) {
      setReviewError(err?.message || 'Code review failed. Please try again.');
    } finally {
      setIsReviewing(false);
    }
  };

  const handleAuthSubmit = async () => {
    setAuthError('');
    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Please fill in all fields.');
      return;
    }
    setAuthLoading(true);
    const error =
      authMode === 'signin'
        ? await signIn(authEmail.trim(), authPassword)
        : await signUp(authEmail.trim(), authPassword);
    setAuthLoading(false);
    if (error) {
      setAuthError(error);
    } else {
      setAuthOpen(false);
      setAuthEmail('');
      setAuthPassword('');
    }
  };

  return (
    <>
      <AppHeader
        title="Prelim Python Learner"
        variant="default"
      >
        <AppHeader.Right>
          <XStack gap="$2" alignItems="center">
            {isAuthenticated ? (
              <XStack gap="$2" alignItems="center">
                <SizableText size="$2" color="$color10">
                  {user?.email?.split('@')[0] || 'User'}
                </SizableText>
                <Button chromeless size="$3" onPress={signOut} icon={<LogOut size={16} />}>
                  Sign Out
                </Button>
              </XStack>
            ) : (
              <Button
                variant="secondary"
                size="$3"
                onPress={() => setAuthOpen(true)}
                icon={<LogIn size={14} />}
              >
                Sign In
              </Button>
            )}
          </XStack>
        </AppHeader.Right>
      </AppHeader>

      <ScrollView backgroundColor="$color1" flex={1}>
        <YStack padding="$4" gap="$4" paddingBottom="$8">
          {/* Hero */}
          <YStack gap="$2" paddingVertical="$2">
            <XStack gap="$2" alignItems="center">
              <Terminal size={28} color="$blue9" />
              <H1 color="$color12">CPROG1</H1>
            </XStack>
            <Paragraph color="$color10" size="$4">
              Master Python fundamentals — variables, data types, operators, control structures, and algorithm design. Tap any topic to dive in.
            </Paragraph>
          </YStack>

          {/* Topic Cards */}
          {TOPICS.map((topic, index) => (
            <Card
              key={topic.id}
              elevation={3}
              bordered
              pressable
              onPress={() => handleOpen(topic)}
              animation="bouncy"
              scaleOnPress={0.98}
            >
              <Card.Header padded>
                <XStack gap="$3" alignItems="center">
                  <YStack
                    backgroundColor={topic.badgeColor}
                    width={44}
                    height={44}
                    borderRadius="$4"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {topic.icon}
                  </YStack>
                  <YStack flex={1} gap="$1">
                    <XStack gap="$2" alignItems="center">
                      <H2 color="$color12">{topic.title}</H2>
                      <Badge variant="default" size="$1">
                        Topic {index + 1}
                      </Badge>
                    </XStack>
                    <SizableText size="$2" color="$color10">
                      {topic.subtitle}
                    </SizableText>
                  </YStack>
                </XStack>
              </Card.Header>
            </Card>
          ))}

          {/* Code Review Section */}
          <Separator marginVertical="$2" />
          <YStack gap="$3">
            <XStack gap="$2" alignItems="center">
              <Sparkles size={22} color="$yellow9" />
              <H2 color="$color12">Submit Your Code for Review</H2>
            </XStack>
            <Paragraph color="$color10" size="$3">
              Paste your Python code below and get instant AI-powered feedback from an instructor.
              {!isAuthenticated && ' Sign in to unlock this feature.'}
            </Paragraph>

            <YStack gap="$3">
              <XStack gap="$2">
                <TextArea
                  flex={1}
                  value={codeInput}
                  onChangeText={setCodeInput}
                  placeholder="# Paste your Python code here...&#10;print('Hello, CPROG1!')"
                  minHeight={120}
                  fontFamily="$mono"
                  size="$2"
                />
              </XStack>

              <Button
                theme="active"
                icon={<Send size={16} />}
                onPress={handleReviewSubmit}
                disabled={isReviewing || !codeInput.trim()}
                opacity={!codeInput.trim() ? 0.5 : 1}
              >
                {isReviewing ? 'Reviewing...' : 'Submit for Review'}
              </Button>

              {isReviewing && (
                <XStack gap="$3" alignItems="center" justifyContent="center" paddingVertical="$4">
                  <Spinner size="small" />
                  <SizableText size="$3" color="$color10">Analyzing your code...</SizableText>
                </XStack>
              )}

              {reviewError !== '' && (
                <Card backgroundColor="$red3" bordered borderColor="$red5" padding="$4">
                  <XStack gap="$2" alignItems="center">
                    <AlertCircle size={16} color="$red9" />
                    <SizableText size="$3" color="$red11">{reviewError}</SizableText>
                  </XStack>
                </Card>
              )}

              {reviewResult !== '' && (
                <Card elevation={2} bordered padding="$4">
                  <YStack gap="$3">
                    <XStack gap="$2" alignItems="center">
                      <Sparkles size={16} color="$yellow9" />
                      <H3 color="$color12">Review Feedback</H3>
                    </XStack>
                    <Separator />
                    <SizableText
                      size="$3"
                      color="$color11"
                      lineHeight={22}
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {reviewResult}
                    </SizableText>
                  </YStack>
                </Card>
              )}
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>

      {/* Topic Detail Sheet */}
      <Sheet
        open={open}
        onOpenChange={setOpen}
        snapPoints={[90]}
        dismissOnSnapToBottom
      >
        {selectedTopic && (
          <ScrollView backgroundColor="$color1">
            <YStack padding="$4" gap="$4" paddingBottom="$8">
              {/* Sheet header */}
              <YStack gap="$2">
                <XStack gap="$3" alignItems="center">
                  <YStack
                    backgroundColor={selectedTopic.badgeColor}
                    width={48}
                    height={48}
                    borderRadius="$4"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {selectedTopic.icon}
                  </YStack>
                  <YStack flex={1}>
                    <H2 color="$color12">{selectedTopic.title}</H2>
                    <SizableText size="$2" color="$color10">
                      {selectedTopic.subtitle}
                    </SizableText>
                  </YStack>
                  <Badge variant="default">
                    {selectedTopic.sections.length} sections
                  </Badge>
                </XStack>
              </YStack>

              <Separator />

              {/* Content sections */}
              {selectedTopic.sections.map((section, i) => (
                <TopicSection key={i} {...section} />
              ))}

              {/* Close button */}
              <Button
                theme="active"
                width="100%"
                onPress={() => setOpen(false)}
                marginTop="$2"
              >
                Close
              </Button>
            </YStack>
          </ScrollView>
        )}
      </Sheet>

      {/* Auth Sheet */}
      <Sheet
        open={authOpen}
        onOpenChange={setAuthOpen}
        snapPoints={[70]}
        dismissOnSnapToBottom
      >
        <ScrollView backgroundColor="$color1">
          <YStack padding="$4" gap="$4" paddingBottom="$8">
            <YStack gap="$2" alignItems="center" paddingVertical="$2">
              <YStack
                backgroundColor="$blue4"
                width={56}
                height={56}
                borderRadius="$6"
                alignItems="center"
                justifyContent="center"
              >
                <User size={28} color="$blue9" />
              </YStack>
              <H2 color="$color12">{authMode === 'signin' ? 'Welcome Back' : 'Create Account'}</H2>
              <Paragraph color="$color10" textAlign="center">
                {authMode === 'signin'
                  ? 'Sign in to submit code for AI review.'
                  : 'Sign up to get started with code review.'}
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <Input
                label="Email"
                placeholder="you@example.com"
                value={authEmail}
                onChangeText={setAuthEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                value={authPassword}
                onChangeText={setAuthPassword}
                isPassword
              />

              {authError !== '' && (
                <Card backgroundColor="$red3" bordered borderColor="$red5" padding="$4">
                  <XStack gap="$2" alignItems="center">
                    <AlertCircle size={16} color="$red9" />
                    <SizableText size="$3" color="$red11">{authError}</SizableText>
                  </XStack>
                </Card>
              )}

              <Button
                theme="active"
                width="100%"
                size="$4"
                onPress={handleAuthSubmit}
                disabled={authLoading}
              >
                {authLoading
                  ? 'Please wait...'
                  : authMode === 'signin'
                  ? 'Sign In'
                  : 'Create Account'}
              </Button>

              <Button
                variant="ghost"
                width="100%"
                onPress={() => {
                  setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                  setAuthError('');
                }}
              >
                {authMode === 'signin'
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </Button>
            </YStack>
          </YStack>
        </ScrollView>
      </Sheet>
    </>
  );
}
