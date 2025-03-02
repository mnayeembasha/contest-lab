import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, PlusCircle } from "lucide-react";
import { customizedToast } from "@/utils/Toast/Toast";
import { BACKEND_URL } from "@/config";
// import { useAuth } from "@/hooks/useAuth";

// Form validation schema
const questionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "Test case input cannot be empty"),
        expected: z
          .string()
          .min(1, "Test case expected output cannot be empty"),
      })
    )
    .min(1, "At least one test case is required"),
  difficulty: z.enum(["easy", "medium", "difficult"], {
    required_error: "Please select a difficulty level",
  }),
  category: z.string().min(3, "Category must be at least 3 characters long"),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

const AddQuestionForm = () => {
  //   const { loading, setLoading } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      description: "",
      testCases: [{ input: "", expected: "" }],
      difficulty: undefined,
      category: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testCases",
  });

  const onSubmit = async (data: QuestionFormValues) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/questions/add`,
        data
      );
      customizedToast({ type:"success", message: response.data.message });
      reset();
    } catch (error: unknown) {
        customizedToast({
          type: "error",
          position:"top-center",
          message: "An unexpected error occoured",
        });
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        customizedToast({ type: "error", message: errorMessage });
      }
      }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-dark-layer-2 p-4 text-white mt-10">
      <Card className="w-full max-w-2xl shadow-lg bg-[#121212] text-white">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Add a New Question
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                {...register("title")}
                placeholder="Enter question title"
                className="bg-dark-layer-2 border-gray-600 text-white"
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Enter question description"
                className="bg-dark-layer-2 border-gray-600 text-white"
              />
              {errors.description && (
                <p className="text-red-400 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label>Difficulty</Label>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "difficulty",
                    value as "easy" | "medium" | "difficult",
                    { shouldValidate: true }
                  )
                }
              >
                <SelectTrigger className="bg-dark-layer-2 border-gray-600 text-white">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-dark-layer-2 text-white">
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="difficult">Difficult</SelectItem>
                </SelectContent>
              </Select>
              {errors.difficulty && (
                <p className="text-red-400 text-sm">
                  {errors.difficulty.message}
                </p>
              )}
            </div>

            <div>
              <Label>Category</Label>
              <Input
                {...register("category")}
                placeholder="Enter question category"
                className="bg-dark-layer-2 border-gray-600 text-white"
              />
              {errors.category && (
                <p className="text-red-400 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Test Cases</Label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    {...register(`testCases.${index}.input`)}
                    placeholder="Input"
                    className="bg-dark-layer-2 border-gray-600 text-white"
                  />
                  <Input
                    {...register(`testCases.${index}.expected`)}
                    placeholder="Expected Output"
                    className="bg-dark-layer-2 border-gray-600 text-white"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="px-2"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                type="button"
                className="bg-dark-layer-2 mt-3"
                onClick={() => append({ input: "", expected: "" })}
              >
                <PlusCircle className="h-5 w-5 mr-1" /> Add Test Case
              </Button>
              {errors.testCases && (
                <p className="text-red-400 text-sm">
                  {errors.testCases.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-500 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Question"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddQuestionForm;
