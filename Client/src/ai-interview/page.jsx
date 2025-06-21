import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Clock,
  Brain,
  MessageSquare,
  Star,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function AIInterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const videoRef = useRef(null);
  const [searchParams] = useSearchParams();
  const interviewId = searchParams.get("interviewId");

  // Fetch questions on mount
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/interview/${interviewId}`);
        const data = await res.json();
        setQuestions(data.questions || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching interview:", err);
        setError("Failed to load interview questions.");
        setLoading(false);
      }
    };

    if (interviewId) fetchInterview();
  }, [interviewId]);

  useEffect(() => {
    let interval;
    if (interviewStarted) {
      interval = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [interviewStarted]);

  useEffect(() => {
    let stream;
    if (isVideoOn && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access error:", err);
          alert("Camera access blocked or not available.");
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoOn]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartInterview = () => {
    setInterviewStarted(true);
    setIsRecording(true);
  };

  const handleNextQuestion = () => {
    setIsThinking(true);
    setTimeout(() => {
      setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
      setIsThinking(false);
      setUserResponse("");
    }, 2000);
  };

  const handleEndInterview = () => {
    setInterviewStarted(false);
    setIsRecording(false);
    window.location.href = "/interview-results";
  };

  const progress = questions.length ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (loading) return <div className="p-6 text-center text-gray-600">⏳ Loading interview questions...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-lg px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">JP</span>
              </div>
            </a>
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-black" />
              <span className="text-black font-semibold">AI Interview Session</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-700">
              <Clock className="h-4 w-4" />
              <span className="font-mono font-medium">{formatTime(timeElapsed)}</span>
            </div>
            <Badge className="bg-gray-100 text-black border-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT PANEL */}
          <div className="lg:col-span-2 space-y-6">
            {/* PROGRESS */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 font-medium">Interview Progress</span>
                  <span className="text-sm text-gray-600 font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* VIDEO STREAM */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {isVideoOn ? (
                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <VideoOff className="h-12 w-12 text-gray-500" />
                      </div>
                    </div>
                  )}
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black px-3 py-1 rounded-full shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">Recording</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-xl">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CONTROLS */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-4">
                  <Button onClick={() => setIsRecording(!isRecording)} className={`rounded-full w-14 h-14 border-2 ${isRecording ? "bg-black text-white" : "bg-white text-gray-700"}`}>
                    {isRecording ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                  </Button>
                  <Button onClick={() => setIsVideoOn(!isVideoOn)} className={`rounded-full w-14 h-14 border-2 ${isVideoOn ? "bg-white text-gray-700" : "bg-black text-white"}`}>
                    {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                  </Button>
                  <Button onClick={() => setIsSpeakerOn(!isSpeakerOn)} className="rounded-full w-14 h-14 border-2 bg-white text-gray-700">
                    {isSpeakerOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                  </Button>
                  <Button variant="destructive" onClick={handleEndInterview} className="rounded-full w-14 h-14 bg-black text-white">
                    <Phone className="h-6 w-6 rotate-[135deg]" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">
            {/* CURRENT QUESTION */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-black" />
                  Current Question
                </CardTitle>
                <Badge className="w-fit bg-gray-100 text-black border-gray-300">
                  {questions[currentQuestion]?.category}
                </Badge>
              </CardHeader>
              <CardContent>
                {isThinking ? (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Brain className="h-4 w-4 animate-pulse" />
                    <span>AI is thinking...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-black mb-4 leading-relaxed">{questions[currentQuestion]?.question}</p>
                    <div className="text-sm text-gray-600">Expected duration: 2–3 minutes</div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* TIPS */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <Star className="mr-2 h-5 w-5 text-black" />
                  Live Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-black text-sm">💡 Maintain eye contact with the camera</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-black text-sm">🎯 Use the STAR method for behavioral questions</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-black text-sm">⏱️ Take a moment to think before answering</p>
                </div>
              </CardContent>
            </Card>

            {/* ACTION BUTTONS */}
            <div className="space-y-3">
              {!interviewStarted ? (
                <Button onClick={handleStartInterview} className="w-full bg-black text-white">
                  <Brain className="mr-2 h-4 w-4" /> Start Interview
                </Button>
              ) : (
                <>
                  <Button onClick={handleNextQuestion} disabled={currentQuestion >= questions.length - 1 || isThinking} className="w-full bg-black text-white">
                    Next Question <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button onClick={handleEndInterview} variant="outline" className="w-full text-black">
                    End Interview
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
