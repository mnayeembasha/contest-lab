import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatInTimeZone } from "date-fns-tz";
import { useCallback, useEffect, useState } from "react";
import { Contest } from "@/utils/types/contest";
import { Clock, Users } from "lucide-react";
import { mockContest } from "@/utils/data/contest";
import { useRouter } from "next/router";
import { customizedToast } from "@/utils/Toast/Toast";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const mockContests: Contest[] = [mockContest];

const Countdown = ({ startTime }: { startTime: Date }) => {
  const calculateTimeLeft = useCallback(() => {
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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!timeLeft) return <span className="text-green-400">Contest is Live!</span>;

  return (
    <span className="text-yellow-400 text-lg font-semibold">
      Starts in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
};

const Index = () => {

  const router = useRouter();
  const [contests, setContests] = useState<Contest[]>([]);
  const {user} = useAuth();

  const pathName = usePathname();
  useEffect(() => {
    if (!user) {
      customizedToast({
        type: "error",
        position: "top-center",
        message: "Login to continue to contest",
      });

      localStorage.setItem("redirectPath", pathName);

      router.push("/login");
    }
  }, [pathName,router,user]);

  useEffect(() => {
    setContests(mockContests);
  }, []);

  const handleJoinContest = (contest: Contest) => {
    const currentTime = new Date();
    const startTime = new Date(contest.startTime); // Keep UTC time
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

  return (
    <div className="min-h-screen w-full bg-dark-layer-2 px-4 py-8 animate-fade-in text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter mb-4">Coding Contests</h1>
          <p className="text-muted-foreground text-lg">
            Participate in coding contests and improve your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => {
            const startTime = new Date(contest.startTime); // Keep UTC time
            const durationHours = parseFloat(contest.duration);
            const durationMs = durationHours * 60 * 60 * 1000;
            const endTime = new Date(startTime.getTime() + durationMs);
            const isActive = new Date() >= startTime && new Date() <= endTime;

            return (
              <Card
                key={contest.contestId}
                className="bg-dark-layer-1 hover:shadow-lg backdrop-blur-2xl transition-shadow duration-300 group"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-white text-2xl font-bold tracking-tight">
                      {contest.contestName}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      <Countdown startTime={startTime} />
                      {"  (" + formatInTimeZone(startTime, "Asia/Kolkata", "MMM d, h:mm a") + ")"}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{contest.problems.length} Questions</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-dark-layer-2 group-hover:bg-primary/90 transition-colors"
                    onClick={() => handleJoinContest(contest)}
                    // disabled={!isActive}
                  >
                    {isActive ? "Join Contest" : "Not Started"}
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

export default Index;