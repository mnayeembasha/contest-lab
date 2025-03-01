"use client"
import { Medal, Award, Star, Trophy, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "../../../components/ui/badge"

interface User {
  name: string
  avatarUrl: string
  score: number
  timeTaken: string
  rank?: number
}

export default function Leaderboard() {
  const initialUsers: User[] = [
    { name: "Alice Johnson", avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg", score: 95, timeTaken: "12m 30s" },
    { name: "Bob Smith", avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg", score: 90, timeTaken: "14m 10s" },
    { name: "Charlie Brown", avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg", score: 85, timeTaken: "15m 45s" },
    { name: "Daisy Williams", avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg", score: 80, timeTaken: "18m 20s" },
    { name: "Ethan Davis", avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg", score: 75, timeTaken: "20m 05s" },
  ]

  const timeToSeconds = (timeStr: string): number => {
    const [min, sec] = timeStr.split("m ").map((part) => Number.parseInt(part))
    return min * 60 + (sec ? Number.parseInt(sec.toString()) : 0)
  }

  const sortedUsers = [...initialUsers]
    .sort((a, b) => (a.score !== b.score ? b.score - a.score : timeToSeconds(a.timeTaken) - timeToSeconds(b.timeTaken)))
    .map((user, index) => ({ ...user, rank: index + 1 }))

  const getBadge = (rank: number) => {
    switch (rank) {
      case 1: return <Badge className="bg-[#ffd700]/40 text-[#ffd700]"><Medal className="h-4 w-4 mr-1" />Gold</Badge>
      case 2: return <Badge className="bg-gray-400 hover:bg-gray-500"><Medal className="h-4 w-4 mr-1" />Silver</Badge>
      case 3: return <Badge className="bg-amber-700 hover:bg-amber-800"><Medal className="h-4 w-4 mr-1" />Bronze</Badge>
      case 4: return <Badge className="bg-purple-500 hover:bg-purple-600"><Star className="h-4 w-4 mr-1" />Star</Badge>
      default: return <Badge className="bg-blue-500 hover:bg-blue-600"><Award className="h-4 w-4 mr-1" />Participant</Badge>
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 flex justify-center">
      <Card className="w-full max-w-3xl bg-neutral-950/20 bg-opacity-20 backdrop-filter backdrop-blur-8xl border border-white/10 shadow-lg text-white transition duration-300 rounded-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg flex items-center py-4">
          <div className="flex items-center gap-x-2 py-2"><Trophy className="h-6 w-6 mr-2" />
          <CardTitle className="text-2xl font-bold">Leaderboard</CardTitle></div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 bg-neutral-800/60 text-sm font-medium rounded-t-md py-4 px-4">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5 md:col-span-4">Participant</div>
            <div className="col-span-2 text-center">Score</div>
            <div className="col-span-2 md:col-span-2 text-center">Time</div>
            <div className="hidden md:block md:col-span-3 text-center">Badge</div>
          </div>
          <div className="divide-y divide-neutral-700/50">
            {sortedUsers.map((user) => (
              <div key={user.name} className="grid grid-cols-12 p-4 items-center hover:bg-neutral-800/50 transition duration-300">
                <div className="col-span-1 font-bold text-center">{user.rank}</div>
                <div className="col-span-5 md:col-span-4 flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate">{user.name}</span>
                </div>
                <div className="col-span-2 font-semibold text-center">{user.score}</div>
                <div className="col-span-2 md:col-span-2 text-center flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">{user.timeTaken}</span>
                </div>
                <div className="hidden md:flex md:col-span-3 justify-center">{getBadge(user.rank!)}</div>
                <div className="col-span-2 md:hidden flex justify-end">{getBadge(user.rank!)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
