var questions = [
  {
    question:
      'What will this code output?\n\nint x = 5;\nint y = 2;\nConsole.WriteLine(x / y);',
    options: ['2.5', '2', '3', 'Error'],
    correct: 1,
    explanation: 'Integer division truncates decimals. 5/2 = 2 (not 2.5)',
  },
  {
    question: 'Which variable name is INVALID in C#?',
    options: ['_myVar', 'myVar2', '2myVar', '@class'],
    correct: 2,
    explanation: 'Variable names cannot start with a digit. 2myVar is invalid.',
  },
  {
    question: "What's the result of: 10 % 3",
    options: ['3', '1', '3.33', '0'],
    correct: 1,
    explanation:
      'The modulo operator (%) returns the remainder. 10 ÷ 3 = 3 remainder 1',
  },
  {
    question: 'Which converts string to int correctly?',
    options: [
      '(int)strNum',
      'strNum.ToInt()',
      'Convert.ToInt32(strNum)',
      'int.Parse(strNum)',
    ],
    correct: 2,
    explanation:
      'Convert.ToInt32() is the recommended method from the Convert class.',
  },
  {
    question: 'What does this output?\n\nint a = 5;\nConsole.WriteLine(++a);',
    options: ['5', '6', '4', 'Error'],
    correct: 1,
    explanation:
      '++a (pre-increment) increases THEN returns value. So output is 6.',
  },
  {
    question: 'Which is a reference type?',
    options: ['int', 'bool', 'string', 'double'],
    correct: 2,
    explanation:
      'string is a reference type. int, bool, and double are value types.',
  },
  {
    question: "What's wrong with: const int MAX;",
    options: [
      'Missing semicolon',
      'const needs value at declaration',
      'MAX should be lowercase',
      'Nothing wrong',
    ],
    correct: 1,
    explanation:
      'Constants MUST be initialized when declared: const int MAX = 100;',
  },
  {
    question: 'What does boxing do?',
    options: [
      'Puts code in a box',
      'Converts value type to reference type',
      'Creates a container',
      'Wraps text',
    ],
    correct: 1,
    explanation:
      'Boxing converts value types (like int) to reference types (object).',
  },
  {
    question: 'Result of: true && false || true',
    options: ['true', 'false', 'Error', 'null'],
    correct: 0,
    explanation:
      'false || true evaluates to true. && has higher precedence than ||.',
  },
  {
    question: 'Which escape sequence creates a new line?',
    options: ['\\t', '\\n', '\\r', '\\b'],
    correct: 1,
    explanation:
      '\\n is the newline character. \\t is tab, \\r is carriage return.',
  },
];

var userAnswers = {};
var showingResults = false;

function showTab(tabName, btn) {
  var tabs = document.querySelectorAll('.tab-content');
  var btns = document.querySelectorAll('.tab-btn');

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }

  document.getElementById(tabName).classList.add('active');
  btn.classList.add('active');

  if (tabName === 'quiz' && !showingResults) {
    renderQuiz();
  }
}

function renderQuiz() {
  var container = document.getElementById('quiz-questions');
  container.innerHTML = '';

  for (var qIdx = 0; qIdx < questions.length; qIdx++) {
    var q = questions[qIdx];
    var questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    var html = '<h3>Question ' + (qIdx + 1) + '</h3>';
    html += '<div class="question-text">' + q.question + '</div>';
    html += '<div class="options">';

    for (var oIdx = 0; oIdx < q.options.length; oIdx++) {
      html +=
        '<div class="option" onclick="selectAnswer(' +
        qIdx +
        ', ' +
        oIdx +
        ')" id="q' +
        qIdx +
        'o' +
        oIdx +
        '">';
      html += q.options[oIdx];
      html += '</div>';
    }

    html += '</div>';
    questionDiv.innerHTML = html;
    container.appendChild(questionDiv);
  }
}

function selectAnswer(qIdx, oIdx) {
  if (showingResults) return;

  userAnswers[qIdx] = oIdx;

  for (var i = 0; i < 4; i++) {
    var elem = document.getElementById('q' + qIdx + 'o' + i);
    if (elem) elem.classList.remove('selected');
  }

  document.getElementById('q' + qIdx + 'o' + oIdx).classList.add('selected');

  var answerCount = Object.keys(userAnswers).length;
  document.getElementById('submit-btn').disabled =
    answerCount !== questions.length;
}

function submitQuiz() {
  showingResults = true;
  var correct = 0;

  for (var qIdx = 0; qIdx < questions.length; qIdx++) {
    var q = questions[qIdx];
    if (userAnswers[qIdx] === q.correct) correct++;

    for (var oIdx = 0; oIdx < q.options.length; oIdx++) {
      var elem = document.getElementById('q' + qIdx + 'o' + oIdx);
      elem.style.pointerEvents = 'none';

      if (oIdx === q.correct) {
        elem.classList.add('correct');
      } else if (oIdx === userAnswers[qIdx]) {
        elem.classList.add('incorrect');
      }
    }

    var questionDiv = document.querySelectorAll('.question')[qIdx];
    var explanationDiv = document.createElement('div');
    explanationDiv.className = 'explanation';
    explanationDiv.innerHTML =
      '<strong>💡 Explanation:</strong> ' + q.explanation;
    questionDiv.appendChild(explanationDiv);
  }

  var container = document.getElementById('quiz-questions');
  var scoreDiv = document.createElement('div');
  scoreDiv.className = 'score';
  var emoji =
    correct === questions.length
      ? '🎉'
      : correct >= questions.length * 0.7
      ? '👍'
      : '💪';
  var message =
    correct === questions.length
      ? 'Perfect Score!'
      : correct >= questions.length * 0.7
      ? 'Great job!'
      : 'Keep practicing!';

  scoreDiv.innerHTML =
    '<h2>Quiz Results</h2>' +
    '<div class="points">' +
    correct +
    ' / ' +
    questions.length +
    '</div>' +
    '<p>' +
    emoji +
    ' ' +
    message +
    '</p>';
  container.insertBefore(scoreDiv, container.firstChild);

  document.getElementById('submit-btn').style.display = 'none';
  document.getElementById('reset-btn').style.display = 'block';
}

function resetQuiz() {
  userAnswers = {};
  showingResults = false;
  document.getElementById('submit-btn').style.display = 'block';
  document.getElementById('submit-btn').disabled = true;
  document.getElementById('reset-btn').style.display = 'none';
  renderQuiz();
}

renderQuiz();
