"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { formatInTimeZone } from "date-fns-tz";
import { Clock, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { customizedToast } from "@/utils/Toast/Toast";
import { mockContest } from "@/utils/data/contest";
import { Contest } from "@/utils/types/contest";

const mockContests: Contest[] = [mockContest];

const Countdown = ({ startTime }: { startTime: Date }) => {
  const calculateTimeLeft = useCallback(() => {
    if (typeof window === "undefined") return null; // Prevent SSR hydration issues

    const now = new Date();
    const difference = startTime.getTime() - now.getTime();

    if (difference <= 0) return null; // Contest has started

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }, [startTime]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, timeLeft]);

  if (!timeLeft) return <span className="text-green-400">Contest is Live!</span>;

  return (
    <span className="text-yellow-400 text-lg font-semibold">
      Starts in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
};

const ContestsPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const router = useRouter();
  const { user } = useAuth();
  const pathName = usePathname();
  const [contests, setContests] = useState<Contest[]>([]);

  useEffect(() => {
    // Ensure authentication logic only runs on the client
    if (typeof window === "undefined") return;

    if (!user) {
      localStorage.setItem("redirectPath", pathName);
      router.push("/login?redirectPath=/contests");
    }
  }, [pathName, router, user]);

  useEffect(() => {
    setContests(mockContests);
  }, []);

  const handleJoinContest = (contest: Contest) => {
    const currentTime = new Date();
    const startTime = new Date(contest.startTime);
    const durationHours = parseFloat(contest.duration);
    const durationMs = durationHours * 60 * 60 * 1000;
    const endTime = new Date(startTime.getTime() + durationMs);

    if (currentTime < startTime) {
      customizedToast({
        type: "error",
        position: "top-center",
        message: `Contest starts at ${formatInTimeZone(startTime, "Asia/Kolkata", "MMM d, h:mm a")}`,
      });
      return;
    }

    if (currentTime > endTime) {
      customizedToast({
        type: "error",
        position: "top-center",
        message: `This contest ended on ${formatInTimeZone(endTime, "Asia/Kolkata", "MMM d, h:mm a")}`,
      });
      return;
    }

    router.push(`/contests/${contest.contestId}`);
  };

  if (!isClient) return null; 

  return (
    <div className="min-h-screen w-full bg-dark-layer-2 text-white bg-gradient-to-br from-[#1a001f] via-[#2b001d] to-[#3a0024]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter mb-4">Coding Contests</h1>
          <p className="text-muted-foreground text-lg">Participate in coding contests and improve your skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => {
            const startTime = new Date(contest.startTime);
            const durationHours = parseFloat(contest.duration);
            const durationMs = durationHours * 60 * 60 * 1000;
            const endTime = new Date(startTime.getTime() + durationMs);
            const currentTime = new Date();

            let statusText = "Inactive";
            let statusClass = "bg-red-100 text-red-800";
            let buttonLabel = "Not Started";
            let isButtonDisabled = true;

            if (currentTime >= startTime && currentTime <= endTime) {
              statusText = "Active";
              statusClass = "bg-green-100 text-green-800";
              buttonLabel = "Join Contest";
              isButtonDisabled = false;
            } else if (currentTime > endTime) {
              statusText = "Ended";
              statusClass = "bg-gray-400 text-gray-900";
              buttonLabel = "Contest Ended";
              isButtonDisabled = true;
            }

            return (
              <Card key={contest.contestId} className="bg-dark-layer-1 hover:shadow-lg backdrop-blur-2xl transition-shadow duration-300 group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-white text-2xl font-bold tracking-tight">{contest.contestName}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                      {statusText}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {currentTime > endTime ? (
                      <span className="text-gray-500">Contest Ended</span>
                    ) : (
                      <span>
                        <Countdown startTime={startTime} /> {" (" + formatInTimeZone(startTime, "Asia/Kolkata", "MMM d, h:mm a") + ")"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{contest.problems.length} Questions</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-dark-layer-2 group-hover:bg-primary/90 transition-colors" onClick={() => handleJoinContest(contest)} disabled={isButtonDisabled}>
                    {buttonLabel}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContestsPage;
