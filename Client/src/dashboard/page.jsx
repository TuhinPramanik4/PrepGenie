import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Brain,
  Target,
  TrendingUp,
  Clock,
  Star,
  Play,
  BookOpen,
  Award,
  Users,
  Menu,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
   const navigate = useNavigate();

  const stats = [
    { label: "Interviews Completed", value: "12", icon: Target, color: "text-black", bgColor: "bg-gray-100" },
    { label: "Average Score", value: "8.5/10", icon: TrendingUp, color: "text-black", bgColor: "bg-gray-100" },
    { label: "Time Practiced", value: "24h", icon: Clock, color: "text-black", bgColor: "bg-gray-100" },
    { label: "Skills Improved", value: "15", icon: Star, color: "text-black", bgColor: "bg-gray-100" },
  ]

  const recentInterviews = [
    {
      title: "Software Engineer - Google",
      score: 9.2,
      date: "2 days ago",
      status: "Excellent",
      statusColor: "bg-green-100 text-green-800 border-green-300",
    },
    {
      title: "Product Manager - Meta",
      score: 8.7,
      date: "5 days ago",
      status: "Good",
      statusColor: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
      title: "Data Scientist - Netflix",
      score: 8.1,
      date: "1 week ago",
      status: "Good",
      statusColor: "bg-blue-100 text-blue-800 border-blue-300",
    },
  ]

  const handleNavigation = (url) => {
    // In a real app, you'd use router.push() or window.location
    console.log(`Navigating to: ${url}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center space-x-8">
              <button onClick={() => handleNavigation("/")} className="flex items-center">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">JP</span>
                </div>
                <span className="ml-3 text-black font-semibold text-xl">JobPrep</span>
              </button>

              <div className="hidden md:flex items-center space-x-6">
                <Button
                  variant={activeTab === "home" ? "default" : "ghost"}
                  onClick={() => setActiveTab("home")}
                  className={activeTab === "home" ? "bg-gray-100 text-black hover:bg-gray-200" : "text-gray-600 hover:text-black hover:bg-gray-50"}
                >
                  Home
                </Button>
                <Button
                  variant={activeTab === "about" ? "default" : "ghost"}
                  onClick={() => setActiveTab("about")}
                  className={activeTab === "about" ? "bg-gray-100 text-black hover:bg-gray-200" : "text-gray-600 hover:text-black hover:bg-gray-50"}
                >
                  About Us
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/interview")}
                  className="text-gray-600 hover:text-black hover:bg-gray-50"
                >
                  Interview with AI
                </Button>
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  onClick={() => setActiveTab("profile")}
                  className={activeTab === "profile" ? "bg-gray-100 text-black hover:bg-gray-200" : "text-gray-600 hover:text-black hover:bg-gray-50"}
                >
                  Profile
                </Button>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("home")}
                  className="justify-start"
                >
                  Home
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("about")}
                  className="justify-start"
                >
                  About Us
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/interview")}
                  className="justify-start"
                >
                  Interview with AI
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("profile")}
                  className="justify-start"
                >
                  Profile
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8 text-black shadow-2xl border border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1 mb-6 lg:mb-0">
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                Ready to Ace Your
                <span className="block text-gray-600">Dream Job Interview?</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6 max-w-2xl">
                Practice with AI-powered mock interviews, get real-time feedback, and boost your confidence for any job
                interview.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <Button
      onClick={() => navigate("/interview")}
      className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg shadow-lg"
      size="lg"
    >
      <Brain className="mr-2 h-5 w-5" />
      Start AI Interview
    </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-black hover:bg-gray-50 hover:text-black px-8 py-3 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-48 h-48 bg-gray-100 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-gray-200">
                  <Brain className="h-24 w-24 text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-black">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Interviews */}
          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <Target className="mr-2 h-5 w-5 text-black" />
                Recent Interviews
              </CardTitle>
              <CardDescription className="text-gray-600">Your latest practice sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentInterviews.map((interview, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <h4 className="text-black font-medium">{interview.title}</h4>
                    <p className="text-sm text-gray-600">{interview.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-black font-semibold">{interview.score}</p>
                    <Badge className={`${interview.statusColor} border`}>{interview.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-black" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-600">Jump into your next practice session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => handleNavigation("/interview")}
                className="w-full bg-black hover:bg-gray-800 text-white justify-start shadow-lg"
              >
                <Brain className="mr-2 h-4 w-4" />
                New AI Interview
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-black hover:bg-gray-50 hover:text-black justify-start"
              >
                <Award className="mr-2 h-4 w-4" />
                View Certificates
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-black hover:bg-gray-50 hover:text-black justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Join Study Group
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-black hover:bg-gray-50 hover:text-black justify-start"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Interview Tips
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">AI-Powered Interviews</h3>
              <p className="text-gray-600">
                Experience realistic interviews with advanced AI that adapts to your responses
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Real-time Feedback</h3>
              <p className="text-gray-600">
                Get instant analysis of your performance and personalized improvement tips
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Skill Certification</h3>
              <p className="text-gray-600">Earn certificates to showcase your interview readiness to employers</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}