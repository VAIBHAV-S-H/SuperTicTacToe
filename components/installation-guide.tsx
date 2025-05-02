"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { X, ChevronDown, ChevronUp, Share, PlusCircle, Menu } from "lucide-react"

export default function InstallationGuide({ onClose }: { onClose: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <Card className="ocean-card border-blue-100 relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 p-0 h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>

          <CardHeader>
            <CardTitle className="text-2xl text-center text-blue-800">Install Super Tic Tac Toe</CardTitle>
            <CardDescription className="text-center text-blue-600">
              Follow these steps to install the game on your device
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="android">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="android">Android</TabsTrigger>
                <TabsTrigger value="ios">iOS</TabsTrigger>
                <TabsTrigger value="desktop">Desktop</TabsTrigger>
              </TabsList>

              <TabsContent value="android" className="space-y-4">
                <div className="border rounded-lg p-3 cursor-pointer" onClick={() => toggleSection("android1")}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">1. Using Chrome Browser</h3>
                    {expandedSection === "android1" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSection === "android1" && (
                    <motion.div
                      className="mt-3 space-y-2 text-sm"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>1. Open the game in Chrome browser</p>
                      <p>
                        2. Tap the <Menu className="h-4 w-4 inline" /> menu icon
                      </p>
                      <p>3. Select "Install app" or "Add to Home Screen"</p>
                      <p>4. Tap "Install" in the prompt</p>
                      <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                        The game will open in fullscreen mode without browser interface!
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="border rounded-lg p-3 cursor-pointer" onClick={() => toggleSection("android2")}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">2. Using Samsung Internet</h3>
                    {expandedSection === "android2" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSection === "android2" && (
                    <motion.div
                      className="mt-3 space-y-2 text-sm"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>1. Open the game in Samsung Internet</p>
                      <p>
                        2. Tap the <Menu className="h-4 w-4 inline" /> menu icon
                      </p>
                      <p>3. Select "Add page to" → "Home screen"</p>
                      <p>4. Confirm by tapping "Add"</p>
                    </motion.div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="ios" className="space-y-4">
                <div className="border rounded-lg p-3 cursor-pointer" onClick={() => toggleSection("ios1")}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">1. Using Safari Browser</h3>
                    {expandedSection === "ios1" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSection === "ios1" && (
                    <motion.div
                      className="mt-3 space-y-2 text-sm"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>1. Open the game in Safari browser</p>
                      <p>
                        2. Tap the <Share className="h-4 w-4 inline" /> share icon
                      </p>
                      <p>3. Scroll down and tap "Add to Home Screen"</p>
                      <p>4. Tap "Add" in the top-right corner</p>
                      <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                        Note: This only works in Safari, not Chrome or other browsers on iOS!
                      </div>
                    </motion.div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="desktop" className="space-y-4">
                <div className="border rounded-lg p-3 cursor-pointer" onClick={() => toggleSection("desktop1")}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">1. Using Chrome</h3>
                    {expandedSection === "desktop1" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSection === "desktop1" && (
                    <motion.div
                      className="mt-3 space-y-2 text-sm"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>1. Open the game in Chrome</p>
                      <p>
                        2. Click the install icon <PlusCircle className="h-4 w-4 inline" /> in the address bar
                      </p>
                      <p>3. Click "Install" in the prompt</p>
                    </motion.div>
                  )}
                </div>

                <div className="border rounded-lg p-3 cursor-pointer" onClick={() => toggleSection("desktop2")}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">2. Using Edge Browser</h3>
                    {expandedSection === "desktop2" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSection === "desktop2" && (
                    <motion.div
                      className="mt-3 space-y-2 text-sm"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>1. Open the game in Edge</p>
                      <p>
                        2. Click the <Menu className="h-4 w-4 inline" /> menu icon
                      </p>
                      <p>3. Select "Apps" → "Install this site as an app"</p>
                      <p>4. Click "Install" in the prompt</p>
                    </motion.div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter>
            <Button onClick={onClose} className="w-full bg-gradient-to-r from-blue-500 to-blue-700">
              I'll Try It Later
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
