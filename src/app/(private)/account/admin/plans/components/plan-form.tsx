"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PlanFormProps {
  formType?: "add" | "edit";
  initialValues?: any;
}

const PlanForm = ({ formType, initialValues }: PlanFormProps) => {
  const { control } = useForm();

  const formSchema = z.object({
    name: z.string().nonempty("name is required"),
    description: z.string().nonempty("Description is required"),
    features: z.array(z.string()).nonempty("features is required"),
    mounthly_price: z.number(),
    quartery_price: z.number(),
    half_yearly_price: z.number(),
    yearly_price: z.number(),
    images: z.array(z.string()).nonempty("images is required"),
  });

  const form: any = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      features: initialValues?.features || [],
      mounthly_price: initialValues?.mounthly_price || 0,
      quartery_price: initialValues?.quartery_price || 0,
      half_yearly_price: initialValues?.half_yearly_price || 0,
      yearly_price: initialValues?.yearly_price || 0,
      images: initialValues?.images || [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "features",
  });
  return (
    <Card className="w-full shadow-md border border-gray-200 bg-white">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Plan Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter plan name"
                        className="border-gray-300 focus:border-blue-500 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter plan description"
                        className="border-gray-300 focus:border-blue-500 transition-colors resize-none min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Pricing
                </h3>
                <div className="space-y-4 bg-gray-50 p-5 rounded-lg border border-gray-100">
                  <FormField
                    control={form.control}
                    name="mounthly_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Monthly Price ($)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="border-gray-300 focus:border-blue-500 transition-colors"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quartery_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Quarterly Price ($)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="border-gray-300 focus:border-blue-500 transition-colors"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="half_yearly_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Half-Yearly Price ($)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="border-gray-300 focus:border-blue-500 transition-colors"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearly_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Yearly Price ($)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="border-gray-300 focus:border-blue-500 transition-colors"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    Plan Features
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => append("")}
                    type="button"
                    className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    <Plus size={16} />
                    Add Feature
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {fields.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      Add features for your plan
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {fields.map((field, index) => (
                        <FormField
                          control={form.control}
                          name={`features.${index}`}
                          key={field.id}
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2 mb-0">
                              <FormControl className="flex-grow">
                                <Input
                                  placeholder="Enter feature"
                                  className="border-gray-300 focus:border-blue-500 transition-colors"
                                  {...field}
                                />
                              </FormControl>
                              <Button
                                type="button"
                                onClick={() => remove(index)}
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 text-red-500 border-red-200 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 size={16} />
                              </Button>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* You can add an image upload section here */}

            <CardFooter className="px-0 pt-6 flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 flex items-center gap-2"
              >
                <Save size={18} />
                {formType === "edit" ? "Save Changes" : "Submit Plan"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PlanForm;
