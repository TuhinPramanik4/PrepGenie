"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  TrendingUp,
  Clock,
  Star,
  Brain,
  Target,
  MessageSquare,
  Download,
  Share2,
  RotateCcw,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import {Link} from "react-router-dom"

export default function InterviewResultsPage() {
  const [selectedQuestion, setSelectedQuestion] = useState(0)

  const overallScore = 8.5
  const interviewDuration = "18:45"

  const scores = {
    communication: 9.2,
    technical: 8.1,
    problemSolving: 8.8,
    confidence: 7.9,
    clarity: 8.6,
  }

  const questionResults = [
    {
      question: "Tell me about yourself and why you're interested in this software engineering position.",
      score: 9.1,
      feedback:
        "Excellent introduction with clear career progression. Good connection between experience and role requirements.",
      strengths: ["Clear communication", "Relevant experience highlighted", "Good enthusiasm"],
      improvements: ["Could mention specific technologies more"],
      status: "excellent",
    },
    {
      question: "Describe a challenging technical problem you've solved recently.",
      score: 8.3,
      feedback:
        "Good technical explanation with clear problem-solving approach. Could benefit from more specific metrics.",
      strengths: ["Structured approach", "Technical depth", "Clear explanation"],
      improvements: ["Include quantifiable results", "Mention team collaboration"],
      status: "good",
    },
    {
      question: "How do you handle working in a team environment?",
      score: 7.8,
      feedback: "Decent response but could use more specific examples. Shows understanding of teamwork principles.",
      strengths: ["Understanding of teamwork", "Mentions communication"],
      improvements: ["More specific examples", "Discuss conflict resolution"],
      status: "average",
    },
  ]

  const getScoreColor = (score) => {
    if (score >= 9) return "text-black"
    if (score >= 7) return "text-gray-700"
    return "text-gray-500"
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-black" />
      case "good":
        return <AlertCircle className="h-4 w-4 text-gray-700" />
      case "average":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-lg px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">JP</span>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-black" />
              <span className="text-black font-semibold">Interview Results</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-gray-300 text-black hover:bg-gray-50 hover:text-black shadow-lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-black hover:bg-gray-50 hover:text-black shadow-lg"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overall Score Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-black rounded-full mb-6 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{overallScore}</div>
              <div className="text-sm text-gray-300">/ 10</div>
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">Great Performance!</h1>
          <p className="text-xl text-gray-600 mb-4">You scored above average in most areas</p>
          <div className="flex items-center justify-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Duration: {interviewDuration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>3 Questions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI Analyzed</span>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(scores).map(([category, score]) => (
            <Card key={category} className="bg-white border-gray-200 shadow-lg text-center">
              <CardContent className="p-4">
                <div className={`text-2xl font-bold mb-1 ${getScoreColor(score)}`}>{score}</div>
                <div className="text-sm text-gray-600 capitalize font-medium">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </div>
                <Progress value={score * 10} className="h-2 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Analysis */}
        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 border-gray-200">
            <TabsTrigger
              value="questions"
              className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Question Analysis
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Key Insights
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Question List */}
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-black">Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {questionResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedQuestion(index)}
                      className={`w-full p-3 rounded-lg text-left transition-colors border ${
                        selectedQuestion === index
                          ? "bg-gray-100 border-gray-300"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 font-medium">Question {index + 1}</span>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(result.status)}
                          <span className={`text-sm font-semibold ${getScoreColor(result.score)}`}>{result.score}</span>
                        </div>
                      </div>
                      <p className="text-black text-sm line-clamp-2">{result.question}</p>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Question Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-black">Question {selectedQuestion + 1} Analysis</CardTitle>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(questionResults[selectedQuestion].status)}
                        <span className={`text-xl font-bold ${getScoreColor(questionResults[selectedQuestion].score)}`}>
                          {questionResults[selectedQuestion].score}/10
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-gray-600 text-sm mb-2 font-medium">Question</h4>
                      <p className="text-black">{questionResults[selectedQuestion].question}</p>
                    </div>

                    <div>
                      <h4 className="text-gray-600 text-sm mb-2 font-medium">AI Feedback</h4>
                      <p className="text-gray-700">{questionResults[selectedQuestion].feedback}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-black flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {questionResults[selectedQuestion].strengths.map((strength, index) => (
                          <li key={index} className="flex items-center text-black">
                            <div className="w-1.5 h-1.5 bg-black rounded-full mr-3"></div>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Areas for Improvement */}
                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-black flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5" />
                        Areas for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {questionResults[selectedQuestion].improvements.map((improvement, index) => (
                          <li key={index} className="flex items-center text-black">
                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3"></div>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-black flex items-center">
                    <Star className="mr-2 h-5 w-5 text-black" />
                    Top Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="text-black font-semibold mb-2">Communication Skills</h4>
                    <p className="text-gray-700 text-sm">
                      You demonstrated excellent verbal communication with clear, structured responses.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="text-black font-semibold mb-2">Problem-Solving Approach</h4>
                    <p className="text-gray-700 text-sm">
                      Your systematic approach to breaking down complex problems was impressive.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="text-black font-semibold mb-2">Technical Knowledge</h4>
                    <p className="text-gray-700 text-sm">
                      Strong foundation in core technologies relevant to the role.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-black flex items-center">
                    <Target className="mr-2 h-5 w-5 text-black" />
                    Growth Areas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="text-black font-semibold mb-2">Specific Examples</h4>
                    <p className="text-gray-700 text-sm">
                      Include more quantifiable results and specific metrics in your responses.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="text-black font-semibold mb-2">Confidence Building</h4>
                    <p className="text-gray-700 text-sm">
                      Practice speaking with more conviction, especially about your achievements.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="text-black font-semibold mb-2">Follow-up Questions</h4>
                    <p className="text-gray-700 text-sm">
                      Prepare thoughtful questions about the role and company culture.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-black">Next Steps</CardTitle>
                  <CardDescription className="text-gray-600">
                    Recommended actions to improve your interview performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-black font-semibold">Practice STAR Method</h4>
                      <p className="text-gray-700 text-sm">
                        Structure your behavioral responses using Situation, Task, Action, Result framework.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-black font-semibold">Prepare Specific Examples</h4>
                      <p className="text-gray-700 text-sm">
                        Gather 3-5 detailed examples with quantifiable results from your experience.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-black font-semibold">Research Company Culture</h4>
                      <p className="text-gray-700 text-sm">
                        Prepare thoughtful questions about team dynamics and growth opportunities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-black">Recommended Practice</CardTitle>
                  <CardDescription className="text-gray-600">
                    Focus areas for your next practice session
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white justify-between shadow-lg">
                    <span>Behavioral Interview Practice</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-black hover:bg-gray-50 hover:text-black justify-between"
                  >
                    <span>Technical Deep Dive</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-black hover:bg-gray-50 hover:text-black justify-between"
                  >
                    <span>Confidence Building Session</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/interview">
            <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 shadow-lg">
              <RotateCcw className="mr-2 h-5 w-5" />
              Practice Again
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant="outline"
              className="border-gray-300 text-black hover:bg-gray-50 hover:text-black px-8 py-3 shadow-lg"
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
