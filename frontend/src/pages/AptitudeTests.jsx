import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, Home, RotateCcw, Award, BookOpen, BarChart2 } from 'lucide-react';

const AptitudeTest = () => {
  // Test states
  const [currentScreen, setCurrentScreen] = useState('home'); // home, instructions, test, results
  const [currentSection, setCurrentSection] = useState(''); // numerical, logical, verbal
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  
  // Sample test sections
  const sections = [
    { id: 'numerical', name: 'Numerical Aptitude', time: 15 * 60, icon: <BarChart2 size={24} /> },
    { id: 'logical', name: 'Logical Reasoning', time: 15 * 60, icon: <BookOpen size={24} /> },
    { id: 'verbal', name: 'Verbal Ability', time: 15 * 60, icon: <Award size={24} /> }
  ];
  
  // Sample questions for each section
  const questions = {
    numerical: [
      {
        id: 'n1',
        question: 'If a car travels at a speed of 60 km/h, how long will it take to cover a distance of 150 km?',
        options: ['1.5 hours', '2 hours', '2.5 hours', '3 hours'],
        correct: '2.5 hours'
      },
      {
        id: 'n2',
        question: 'A can complete a work in 20 days and B can complete the same work in 15 days. How many days will they take to complete the work if they work together?',
        options: ['8.57 days', '9.33 days', '10 days', '12 days'],
        correct: '8.57 days'
      },
      {
        id: 'n3',
        question: 'What is 15% of 80?',
        options: ['8', '10', '12', '15'],
        correct: '12'
      },
      {
        id: 'n4',
        question: 'The average of 5 consecutive numbers is 15. What is the largest number?',
        options: ['13', '15', '17', '19'],
        correct: '17'
      },
      {
        id: 'n5',
        question: 'If the cost price of an article is ₹800 and it is sold at a profit of 25%, what is the selling price?',
        options: ['₹900', '₹950', '₹1000', '₹1050'],
        correct: '₹1000'
      }
    ],
    logical: [
      {
        id: 'l1',
        question: 'In a certain code language, "COMPUTER" is written as "RFUVQNPD". How will "PROGRAM" be written in that code?',
        options: ['QSPHSBN', 'RTQITCO', 'NDHPSQO', 'NBSHPQR'],
        correct: 'QSPHSBN'
      },
      {
        id: 'l2',
        question: 'If "+" means "divided by", "-" means "multiplied by", "×" means "subtracted from" and "÷" means "added to", then what is the value of 18 - 9 + 3 × 6 ÷ 3?',
        options: ['45', '36', '54', '63'],
        correct: '54'
      },
      {
        id: 'l3',
        question: 'In a row of children, Rahul is 7th from the left and Mohan is 12th from the right. If they exchange positions, Rahul becomes 22nd from the left. How many children are there in the row?',
        options: ['27', '33', '34', '35'],
        correct: '33'
      },
      {
        id: 'l4',
        question: 'What comes next in the sequence: 3, 6, 12, 24, 48, ?',
        options: ['72', '96', '108', '120'],
        correct: '96'
      },
      {
        id: 'l5',
        question: 'If A = 1, B = 2, C = 3,..., Z = 26, what is the value of LOGIC?',
        options: ['47', '50', '52', '54'],
        correct: '50'
      }
    ],
    verbal: [
      {
        id: 'v1',
        question: 'Choose the word which is most OPPOSITE in meaning to the word "Benevolent".',
        options: ['Malevolent', 'Benign', 'Beneficial', 'Munificent'],
        correct: 'Malevolent'
      },
      {
        id: 'v2',
        question: 'Choose the correct meaning of the idiom: "To bite the dust"',
        options: ['To be very thirsty', 'To suffer defeat', 'To die', 'To work hard'],
        correct: 'To suffer defeat'
      },
      {
        id: 'v3',
        question: 'Choose the word with the correct spelling:',
        options: ['Accomodation', 'Accommodation', 'Acommodation', 'Acomodation'],
        correct: 'Accommodation'
      },
      {
        id: 'v4',
        question: 'Choose the correctly punctuated sentence:',
        options: [
          'The movie which I watched yesterday was quite good.',
          'The movie, which I watched yesterday was quite good.',
          'The movie which I watched yesterday, was quite good.',
          'The movie which, I watched yesterday was quite good.'
        ],
        correct: 'The movie which I watched yesterday was quite good.'
      },
      {
        id: 'v5',
        question: 'Fill in the blank: The project was completed ________ schedule.',
        options: ['in', 'on', 'at', 'by'],
        correct: 'on'
      }
    ]
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (currentScreen === 'test' && timeRemaining > 0 && !testCompleted) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && currentScreen === 'test') {
      endCurrentSection();
    }
    
    return () => clearInterval(interval);
  }, [currentScreen, timeRemaining, testCompleted]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle section selection
  const startSection = (sectionId) => {
    setCurrentSection(sectionId);
    setCurrentQuestionIndex(0);
    setTimeRemaining(sections.find(s => s.id === sectionId).time);
    setCurrentScreen('instructions');
  };

  // Start test after reading instructions
  const startTest = () => {
    setCurrentScreen('test');
    setTimer(Date.now());
  };

  // Handle answer selection
  const selectAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Navigate to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions[currentSection].length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      endCurrentSection();
    }
  };

  // Navigate to the previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // End current section
  const endCurrentSection = () => {
    const timeTaken = Math.floor((Date.now() - timer) / 1000);
    setTestCompleted(true);
    setCurrentScreen('results');
  };

  // Calculate test results
  const calculateResults = () => {
    const sectionQuestions = questions[currentSection];
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    
    sectionQuestions.forEach(q => {
      if (!answers[q.id]) {
        unattempted++;
      } else if (answers[q.id] === q.correct) {
        correct++;
      } else {
        incorrect++;
      }
    });
    
    return {
      total: sectionQuestions.length,
      correct,
      incorrect,
      unattempted,
      score: Math.round((correct / sectionQuestions.length) * 100)
    };
  };

  // Reset test to start over
  const resetTest = () => {
    setCurrentScreen('home');
    setCurrentSection('');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTestCompleted(false);
  };

  // Return to home screen
  const goHome = () => {
    setCurrentScreen('home');
  };

  // Helper function for question status
  const getQuestionStatus = (index) => {
    const question = questions[currentSection][index];
    if (!question) return 'unattempted';
    
    if (!answers[question.id]) return 'unattempted';
    return 'attempted';
  };

  // Render Different Screens
  const renderHomeScreen = () => (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Aptitude Test</h1>
        <p className="text-xl mb-8 text-center text-gray-200">Test your aptitude skills with our comprehensive assessment suite</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sections.map(section => (
            <div 
              key={section.id} 
              className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors cursor-pointer border border-gray-600"
              onClick={() => startSection(section.id)}
            >
              <div className="flex items-center justify-center mb-4 text-gray-300">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{section.name}</h3>
              <p className="text-gray-300 text-center">
                Time: {Math.floor(section.time / 60)} minutes
              </p>
              <p className="text-gray-300 text-center">
                Questions: {questions[section.id].length}
              </p>
              <button 
                className="w-full mt-4 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-md font-medium transition-colors"
                onClick={() => startSection(section.id)}
              >
                Start Test
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-600">
          <h2 className="text-2xl font-bold mb-4">Why Practice Aptitude Tests?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Improve your logical reasoning and problem-solving skills</li>
            <li>Prepare for technical interviews at top companies</li>
            <li>Identify your strengths and areas for improvement</li>
            <li>Practice under timed conditions similar to real assessments</li>
            <li>Boost your confidence for placement tests</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderInstructionsScreen = () => {
    const currentSectionData = sections.find(s => s.id === currentSection);
    
    return (
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">{currentSectionData.name} - Instructions</h1>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8 border border-gray-600">
            <h2 className="text-xl font-bold mb-4">Before You Begin:</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-200">
              <li>This section contains <strong>{questions[currentSection].length}</strong> questions</li>
              <li>You have <strong>{Math.floor(currentSectionData.time / 60)} minutes</strong> to complete this section</li>
              <li>Each question has only one correct answer</li>
              <li>You can navigate between questions using the previous and next buttons</li>
              <li>You can review and change your answers before submission</li>
              <li>The test will automatically submit when the time expires</li>
              <li>Your results will be displayed immediately after completion</li>
            </ul>
          </div>
          
          <div className="flex justify-between">
            <button 
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-md font-medium transition-colors flex items-center"
              onClick={goHome}
            >
              <Home size={18} className="mr-2" />
              Return to Home
            </button>
            
            <button 
              className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-6 rounded-md font-medium transition-colors flex items-center"
              onClick={startTest}
            >
              Begin Test
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTestScreen = () => {
    const currentQuestion = questions[currentSection][currentQuestionIndex];
    const currentSectionData = sections.find(s => s.id === currentSection);
    
    return (
      <div className="bg-gray-900 min-h-screen text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{currentSectionData.name}</h1>
            <div className="flex items-center bg-gray-800 px-4 py-2 rounded-md">
              <Clock size={20} className="mr-2 text-gray-300" />
              <span className={`font-mono text-lg ${timeRemaining < 60 ? 'text-red-400 animate-pulse' : 'text-gray-200'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Question Navigation Sidebar */}
            <div className="bg-gray-800 rounded-lg p-4 shadow-lg order-2 md:order-1 border border-gray-600">
              <h3 className="text-lg font-bold mb-3 border-b border-gray-700 pb-2">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions[currentSection].map((_, index) => (
                  <button
                    key={index}
                    className={`h-10 w-10 rounded-md flex items-center justify-center font-medium transition-colors ${
                      currentQuestionIndex === index
                        ? 'bg-gray-600 text-white'
                        : getQuestionStatus(index) === 'attempted'
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-900 text-gray-400'
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-4 h-4 bg-gray-900 rounded-sm mr-2"></div>
                  <span>Not Attempted</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-4 h-4 bg-gray-700 rounded-sm mr-2"></div>
                  <span>Attempted</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <div className="w-4 h-4 bg-gray-600 rounded-sm mr-2"></div>
                  <span>Current Question</span>
                </div>
              </div>
              
              <button
                className="w-full mt-6 bg-red-600 hover:bg-red-500 text-white py-2 rounded-md font-medium transition-colors flex items-center justify-center"
                onClick={endCurrentSection}
              >
                End Test
              </button>
            </div>
            
            {/* Main Question Area */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg md:col-span-2 order-1 md:order-2 border border-gray-600">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-gray-700 px-3 py-1 rounded-md text-sm font-medium">
                    Question {currentQuestionIndex + 1} of {questions[currentSection].length}
                  </span>
                </div>
                <h3 className="text-xl mb-6">{currentQuestion.question}</h3>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option, i) => (
                    <label
                      key={i}
                      className={`block p-3 rounded-md cursor-pointer transition-colors ${
                        answers[currentQuestion.id] === option
                          ? 'bg-gray-600 border-gray-500'
                          : 'bg-gray-700 hover:bg-gray-650 border-gray-700'
                      } border`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={() => selectAnswer(currentQuestion.id, option)}
                          className="mr-3"
                        />
                        <span>{option}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  className={`bg-gray-700 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center ${
                    currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
                  }`}
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft size={18} className="mr-1" />
                  Previous
                </button>
                
                <button
                  className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center"
                  onClick={nextQuestion}
                >
                  {currentQuestionIndex === questions[currentSection].length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResultsScreen = () => {
    const results = calculateResults();
    const currentSectionData = sections.find(s => s.id === currentSection);
    
    return (
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">{currentSectionData.name} - Results</h1>
          
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-600 overflow-hidden">
            <div className="bg-gray-700 p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Your Score</h2>
              <div className="text-5xl font-bold mb-2">{results.score}%</div>
              <p className="text-gray-200">
                {results.correct} correct out of {results.total} questions
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <CheckCircle size={24} className="mx-auto mb-2 text-green-400" />
                  <div className="text-xl font-bold">{results.correct}</div>
                  <p className="text-gray-300">Correct</p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <XCircle size={24} className="mx-auto mb-2 text-red-400" />
                  <div className="text-xl font-bold">{results.incorrect}</div>
                  <p className="text-gray-300">Incorrect</p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <Clock size={24} className="mx-auto mb-2 text-yellow-400" />
                  <div className="text-xl font-bold">{results.unattempted}</div>
                  <p className="text-gray-300">Unattempted</p>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <h3 className="font-bold mb-3">Performance Analysis</h3>
                <div className="h-5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-gray-500 to-blue-500" 
                    style={{ width: `${results.score}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-300">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
                
                <div className="mt-4">
                  {results.score >= 80 ? (
                    <p className="text-green-400">Excellent! You have strong skills in this area.</p>
                  ) : results.score >= 60 ? (
                    <p className="text-blue-400">Good job! With a little more practice, you can excel in this area.</p>
                  ) : (
                    <p className="text-yellow-400">This area needs improvement. Consider focusing your studies here.</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
                  onClick={goHome}
                >
                  <Home size={18} className="mr-2" />
                  Return to Home
                </button>
                
                <button
                  className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
                  onClick={resetTest}
                >
                  <RotateCcw size={18} className="mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-600">
            <h3 className="text-xl font-bold mb-4">Question Review</h3>
            
            <div className="space-y-6">
              {questions[currentSection].map((q, index) => (
                <div key={q.id} className="border-b border-gray-700 pb-4 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                      !answers[q.id] ? 'bg-yellow-500' : 
                      answers[q.id] === q.correct ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {!answers[q.id] ? '?' : 
                       answers[q.id] === q.correct ? '✓' : '✗'}
                    </div>
                    <div>
                      <p className="font-medium">Question {index + 1}: {q.question}</p>
                      
                      <div className="mt-2 ml-2">
                        <div className="text-sm text-gray-300">Your answer: {answers[q.id] || 'Not attempted'}</div>
                        <div className="text-sm text-green-400">Correct answer: {q.correct}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Main render logic
  switch (currentScreen) {
    case 'home':
      return renderHomeScreen();
    case 'instructions':
      return renderInstructionsScreen();
    case 'test':
      return renderTestScreen();
    case 'results':
      return renderResultsScreen();
    default:
      return renderHomeScreen();
  }
};

export default AptitudeTest;