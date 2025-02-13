import { Contest } from "../types/contest";
import { problems } from "./problems";

export const mockContest: Contest = {
    contestId: "123",
    contestName: "Algo Hustle",
    startTime: "2025-03-10T22:00:00Z",
    duration: "3h",
    isActive:true,
    problems:problems   
}