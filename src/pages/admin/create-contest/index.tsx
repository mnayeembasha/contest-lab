import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const contestSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  questions: z.array(z.string().min(1, "Each question must have an ID")),
});

type ContestFormData = z.infer<typeof contestSchema>;

export default function CreateContest() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContestFormData>({
    resolver: zodResolver(contestSchema),
  });

  const onSubmit = async (data: ContestFormData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/create",
        data,
        { withCredentials: true }
      );
      console.log(response.data);
      toast.success("Contest created successfully!");
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data?.error || "Failed to create contest");
          } else {
            toast.error("An unexpected error occurred");
          }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-dark-layer-2 text-white mt-20 w-[50%] mx-auto p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Create a Contest</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="Enter contest title" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              {...register("duration", { valueAsNumber: true })}
              placeholder="Enter duration in minutes"
            />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
          </div>

          <div>
            <Label htmlFor="questions">Question IDs (comma-separated)</Label>
            <Input
              id="questions"
              placeholder="Enter question IDs"
              onChange={(e) =>
                setValue(
                  "questions",
                  e.target.value.split(",").map((q) => q.trim())
                )
              }
            />
            {errors.questions && <p className="text-red-500 text-sm">{errors.questions.message}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-dark-layer-1 hover:bg-slate-600">
            {loading ? "Creating..." : "Create Contest"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
