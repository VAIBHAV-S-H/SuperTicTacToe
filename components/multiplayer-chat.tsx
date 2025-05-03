"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { multiplayerService, type ChatMessage, PRESET_MESSAGES } from "@/lib/multiplayer-service"
import { useDeviceDetect } from "@/hooks/use-device-detect"
import { format } from "date-fns"

export default function MultiplayerChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useDeviceDetect()

  useEffect(() => {
    // Register chat message callback
    multiplayerService.registerCallbacks({
      onChatMessage: (message) => {
        setMessages((prev) => [...prev, message])
      },
    })

    return () => {
      // Clean up
      multiplayerService.registerCallbacks({
        onChatMessage: undefined,
      })
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const sendMessage = (text: string) => {
    multiplayerService.sendChatMessage(text)
  }

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-30"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          size="icon"
          className={`h-12 w-12 rounded-full shadow-md ${
            isOpen ? "bg-blue-500 text-white" : "bg-white/80 hover:bg-white/90"
          } border-blue-200`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
          <span className="sr-only">{isOpen ? "Close chat" : "Open chat"}</span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed ${
              isMobile ? "inset-0 bg-black/50" : "bottom-20 right-4"
            } z-20 flex items-end justify-end`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (isMobile && e.target === e.currentTarget) {
                setIsOpen(false)
              }
            }}
          >
            <motion.div
              className={`${isMobile ? "w-full max-w-md mx-auto mb-4" : "w-80"}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <Card className="overflow-hidden shadow-lg border-blue-200">
                <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
                  <h3 className="font-medium">Chat</h3>
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-white hover:bg-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="h-64 overflow-y-auto p-3 bg-white flex flex-col space-y-2">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm py-4">
                      No messages yet. Send a message to start chatting!
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`max-w-[80%] ${
                          msg.sender === "me"
                            ? "self-end bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                            : "self-start bg-gray-200 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg"
                        } px-3 py-2 text-sm`}
                      >
                        <div>{msg.text}</div>
                        <div className={`text-xs mt-1 ${msg.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
                          {format(msg.timestamp, "HH:mm")}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_MESSAGES.slice(0, 6).map((text, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                        onClick={() => sendMessage(text)}
                      >
                        {text}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-2 flex">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600" size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
