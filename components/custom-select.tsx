"use client"
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {cn} from "@/lib/utils";
export default function CustomSelect({voices,value,setValue}:{voices: {id: number,name:string,gender: string}[],value: string,setValue: (voice: string)=> void}) {
  const [voiceSelected, setVoiceSelected] = React.useState<string>("")
  React.useEffect(() => {
    if(voiceSelected){
   const audio = new Audio(`/${voiceSelected}.mp3`);
   audio.play();
    }
  }, [voiceSelected])
  return (
    <Select
      onValueChange={(voice) => {
        setVoiceSelected(voice);
        setValue(voice)
      }}
    >
      <SelectTrigger
        className={cn(
          "text-16 w-[180px]w-full border-none bg-black-1 text-gray-1 focus:ring-offset-orange-1",
          {}
        )}
      >
        <SelectValue placeholder="Select a voice" />
      </SelectTrigger>
      <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
        {voices.map(({ id, name ,gender}) => (
          <SelectItem key={id} value={name}>
            {name} {`(${gender})`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


