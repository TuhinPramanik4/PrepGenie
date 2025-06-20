"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Upload,
  FileText,
  Brain,
  ArrowRight,
  Briefcase,
  Code,
  Palette,
  BarChart3,
  Building,
  ChevronRight,
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
import { Link } from "react-router-dom";


export default function InterviewPage() {
  const [showCompanyModal, setShowCompanyModal] = useState(true)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState("")
  const [customCompany, setCustomCompany] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handleCompanyNext = () => {
    if (selectedCompany || customCompany) {
      setShowCompanyModal(false)
      setShowResumeModal(true)
    }
  }

  const handleStartInterview = () => {
    if (resumeFile && selectedRole && (selectedCompany || customCompany)) {
      setShowResumeModal(false)
      window.location.href = "/ai-interview"
    }
  }

  const topCompanies = [
    { id: "google", name: "Google", logo: "🔍", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "meta", name: "Meta", logo: "📘", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "amazon", name: "Amazon", logo: "📦", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "apple", name: "Apple", logo: "🍎", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "microsoft", name: "Microsoft", logo: "🪟", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "netflix", name: "Netflix", logo: "🎬", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "tesla", name: "Tesla", logo: "⚡", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "uber", name: "Uber", logo: "🚗", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "airbnb", name: "Airbnb", logo: "🏠", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "spotify", name: "Spotify", logo: "🎵", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "linkedin", name: "LinkedIn", logo: "💼", color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "salesforce", name: "Salesforce", logo: "☁️", color: "hover:bg-gray-50 hover:border-gray-300" },
  ]

  const interviewTypes = [
    {
      id: "technical",
      title: "Technical Interview",
      description: "Coding challenges and technical problem solving",
      icon: Code,
      color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
      iconColor: "text-black",
    },
    {
      id: "behavioral",
      title: "Behavioral Interview",
      description: "Situational questions and soft skills assessment",
      icon: User,
      color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
      iconColor: "text-black",
    },
    {
      id: "design",
      title: "Design Interview",
      description: "System design and architecture discussions",
      icon: Palette,
      color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
      iconColor: "text-black",
    },
    {
      id: "case-study",
      title: "Case Study",
      description: "Business analysis and strategic thinking",
      icon: BarChart3,
      color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
      iconColor: "text-black",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="flex items-center">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">JP</span>
                </div>
                <span className="ml-3 text-black font-semibold text-xl">JobPrep</span>
              </Link>

              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                >
                  Home
                </Link>
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors">
                  About Us
                </button>
                <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-black">
                  Interview with AI
                </button>
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors">
                  Profile
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-black rounded-full"></span>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 shadow-xl">
                  <DropdownMenuLabel className="text-gray-700">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-50 hover:text-black">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-50 hover:text-black">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-50 hover:text-black">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-600 hover:text-black p-2"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-black transition-colors font-medium">
                  Home
                </Link>
                <button className="text-left text-gray-600 hover:text-black transition-colors font-medium">
                  About Us
                </button>
                <button className="text-left text-black font-medium">Interview with AI</button>
                <button className="text-left text-gray-600 hover:text-black transition-colors font-medium">
                  Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">AI-Powered Interview Practice</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your target company and get ready for a personalized AI interview experience tailored to your role
            and resume.
          </p>
        </div>

        {/* Interview Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {interviewTypes.map((type) => (
            <Card
              key={type.id}
              className={`${type.color} border-2 hover:shadow-xl transition-all duration-200 cursor-pointer`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <type.icon className={`h-6 w-6 ${type.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Start Interview Button */}
        <div className="text-center">
          <Button
            onClick={() => setShowCompanyModal(true)}
            className="bg-black hover:bg-gray-800 text-white px-12 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Brain className="mr-2 h-6 w-6" />
            Start AI Interview
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </main>

      {/* Company Selection Modal */}
      <Dialog open={showCompanyModal} onOpenChange={setShowCompanyModal}>
        <DialogContent className="bg-white border-gray-200 text-black max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <Building className="mr-2 h-6 w-6 text-black" />
              Select Target Company
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Choose the company you're interviewing for to get tailored questions and feedback.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Popular Companies Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black">Popular Companies</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {topCompanies.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => setSelectedCompany(company.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedCompany === company.id
                        ? "border-black bg-gray-100 shadow-lg"
                        : `border-gray-200 bg-white ${company.color} shadow-sm`
                    }`}
                  >
                    <div className="text-2xl mb-2">{company.logo}</div>
                    <div className="text-sm text-black font-medium">{company.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Company Input */}
            <div className="space-y-2">
              <Label htmlFor="custom-company" className="text-gray-700 font-medium">
                Or enter a custom company
              </Label>
              <Input
                id="custom-company"
                type="text"
                placeholder="Enter company name..."
                value={customCompany}
                onChange={(e) => {
                  setCustomCompany(e.target.value)
                  if (e.target.value) setSelectedCompany("")
                }}
                className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowCompanyModal(false)}
                className="border-gray-300 text-black hover:bg-gray-50 hover:text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCompanyNext}
                disabled={!selectedCompany && !customCompany}
                className="bg-black hover:bg-gray-800 text-white shadow-lg"
              >
                Next: Upload Resume
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resume Upload Modal */}
      <Dialog open={showResumeModal} onOpenChange={setShowResumeModal}>
        <DialogContent className="bg-white border-gray-200 text-black max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <FileText className="mr-2 h-6 w-6 text-black" />
              Submit Your Resume
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Upload your resume and provide job details for{" "}
              {selectedCompany ? topCompanies.find((c) => c.id === selectedCompany)?.name : customCompany}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Selected Company Display */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-black" />
                <span className="text-black font-medium">
                  Target Company:{" "}
                  {selectedCompany ? topCompanies.find((c) => c.id === selectedCompany)?.name : customCompany}
                </span>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <Label htmlFor="resume" className="text-gray-700 font-medium">
                Resume/CV
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-black transition-colors bg-gray-50">
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="resume" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 mb-2 font-medium">
                    {resumeFile ? resumeFile.name : "Click to upload your resume"}
                  </p>
                  <p className="text-sm text-gray-500">PDF, DOC, or DOCX (Max 10MB)</p>
                </label>
              </div>
            </div>

            {/* Job Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-700 font-medium">
                Target Job Role
              </Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="bg-white border-gray-300 text-black focus:border-black focus:ring-black">
                  <SelectValue placeholder="Select the role you're interviewing for" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-xl">
                  <SelectItem value="software-engineer">Software Engineer</SelectItem>
                  <SelectItem value="senior-software-engineer">Senior Software Engineer</SelectItem>
                  <SelectItem value="product-manager">Product Manager</SelectItem>
                  <SelectItem value="data-scientist">Data Scientist</SelectItem>
                  <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                  <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
                  <SelectItem value="business-analyst">Business Analyst</SelectItem>
                  <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                  <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                  <SelectItem value="backend-developer">Backend Developer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="job-description" className="text-gray-700 font-medium">
                Job Description (Optional)
              </Label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here to get more targeted interview questions..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black min-h-[120px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowResumeModal(false)
                  setShowCompanyModal(true)
                }}
                className="border-gray-300 text-black hover:bg-gray-50 hover:text-black"
              >
                Back
              </Button>
              <Button
                onClick={handleStartInterview}
                disabled={!resumeFile || !selectedRole}
                className="bg-black hover:bg-gray-800 text-white shadow-lg"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Start Interview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
