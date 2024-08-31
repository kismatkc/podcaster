"use client";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {voiceDetails} from "@/constants/index";
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
import CustomSelect from "@/components/custom-select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import GeneratePodcastAudio from "@/components/generate-podcast-audio";
import PodcastThumbnail from "@/components/podcast-thumbnail";
import {generateSpeech} from "@/lib/utils"

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  voiceType: z.string(),
  podcastDescription: z.string(),
  audioDetails: z.string(),
  podcastThumnail: z.string()
});

const CreatePodcast = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      voiceType: "",
      podcastDescription: "",
      audioDetails: "",
      podcastThumnail:""
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true);
  
    setIsSubmitting(false);
  }

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const voiceTypeWatcher = form.watch("voiceType");
  const inputPromptWatcher = form.watch("audioDetails");
  useEffect(() => {
    // console.log("inside the useffect", voiceTypeWatcher, inputPromptWatcher);


    // Call the function
    
    
    
  }, []);
  const disableGenerateButton = !(voiceTypeWatcher && inputPromptWatcher);


  return (
    <div className="flex flex-col mt-10">
      <Form {...form}>
        <h1 className="text-20 font-bold text-white-1">Create podcast</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-12 flex flex-col w-full"
        >
          <FormField
            control={form.control}
            name="podcastTitle"
            render={({ field }) => (
              <FormItem className="gap-2.5">
                <FormLabel className="text-16 text-white-1 font-bold">
                  Podcast Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="JRE Expereince, mark cuban..."
                    className="input-class  focus:ring-offset-orange-1"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-white-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="voiceType"
            render={({ field }) => (
              <FormItem className="gap-2.5">
                <FormLabel className="text-16 text-white-1 font-bold">
                  Select Ai voiceType
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    voices={voiceDetails}
                    value={field.value}
                    setValue={field.onChange}
                  />
                </FormControl>

                <FormMessage className="text-white-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="podcastDescription"
            render={({ field }) => (
              <FormItem className="gap-2.5">
                <FormLabel className="text-16 text-white-1 font-bold">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a short description"
                    className="input-class focus:ring-offset-orange-1"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-white-1" />
              </FormItem>
            )}
          />
          <div className="flex flex-col pt-10">
            {/* <GeneratePodcastAudio /> */}
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="audioDetails"
                render={({ field }) => (
                  <FormItem className="gap-2.5">
                    <FormLabel className="text-16 text-white-1 font-bold">
                      Audio prompt
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the audio prompt"
                        className="input-class focus:ring-offset-orange-1"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-white-1" />
                  </FormItem>
                )}
              />
              <Button
                disabled={disableGenerateButton}
                className="text-16 self-start bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
                onClick={async () => {
                  const audio = await generateSpeech(
                    inputPromptWatcher,
                    voiceTypeWatcher
                  );
                  const audioPlay = new Audio(audio);
                  audioPlay.play();
                }}
              >
                {isSubmitting ? (
                  <>
                    Generating Audio...
                    <Loader2 className="animate-spin ml-2" />
                  </>
                ) : (
                  "Generate Audio"
                )}
              </Button>
              <FormField
                control={form.control}
                name="podcastThumnail"
                render={({ field }) => (
                  <FormItem className="gap-2.5">
                    <FormLabel className="text-16 text-white-1 font-bold">
                      Podcast Thumnail
                    </FormLabel>
                    <FormControl>
                      <PodcastThumbnail />
                    </FormControl>

                    <FormMessage className="text-white-1" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isSubmitting}
              className="text-16 w-full mt-16 bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
              type="submit"
            >
              {isSubmitting ? (
                <>
                  Submittting...
                  <Loader2 className="animate-spin ml-2" />
                </>
              ) : (
                "submit and publish"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePodcast;
