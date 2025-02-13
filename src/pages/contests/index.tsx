import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { Contest } from "@/utils/types/contest";
import { Clock, Users } from "lucide-react";
import { mockContest } from "@/utils/data/contest";
import { useRouter } from "next/router";

const mockContests: Contest[] = [
  mockContest
];

const Index = () => {
  const router = useRouter();
  const [contests, setContests] = useState<Contest[]>([]);

  useEffect(() => {
    setContests(mockContests);
  }, []);

  return (
    <div className="min-h-screen w-full bg-dark-layer-2 px-4 py-8 animate-fade-in text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter  mb-4">Coding Contests</h1>
          <p className="text-muted-foreground text-lg">
            Participate in coding contests and improve your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => (
            <Card
              key={contest.contestId}
              className="bg-dark-layer-1 hover:shadow-lg transition-shadow duration-300 group"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-white text-2xl font-bold tracking-tight">{contest.contestName}</span>
                  {contest.isActive && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    Starts {formatDistanceToNow(new Date(contest.startTime), { addSuffix: true })}
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
                  onClick={() => router.push(`/contests/${contest.contestId}`)}
                >
                  Join Contest
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;