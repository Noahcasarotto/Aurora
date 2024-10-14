'use client'

import React from "react"
import { submitJob, JobConfiguration } from "@/utils/jobUtils";
import { CalendarIcon, InfoIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function JobSubmission() {
  const [jobType, setJobType] = React.useState("matrix-multiplication");
  const [cpuAllocation, setCpuAllocation] = React.useState(50);
  const [memoryAllocation, setMemoryAllocation] = React.useState(50);
  const [useGpu, setUseGpu] = React.useState(false);
  const [priority, setPriority] = React.useState("medium");
  const [scheduleType, setScheduleType] = React.useState("immediate");
  const [scheduledDate, setScheduledDate] = React.useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const jobConfig: JobConfiguration = {
      jobType,
      cpuAllocation,
      memoryAllocation,
      useGpu,
      priority,
      scheduleType,
      scheduledDate,
    };

    try {
      await submitJob(jobConfig);
      // Optionally add a success message or reset form values here
      alert("Job successfully submitted!");
    } catch (error) {
      console.error("Job submission failed:", error);
      alert("An error occurred while submitting the job. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit a New Job</CardTitle>
          <CardDescription>Configure your job settings and submit to the distributed compute system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="job-type">Job Type</Label>
                <RadioGroup id="job-type" value={jobType} onValueChange={setJobType} className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="matrix-multiplication" id="matrix-multiplication" />
                    <Label htmlFor="matrix-multiplication">Matrix Multiplication</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ml-inference" id="ml-inference" />
                    <Label htmlFor="ml-inference">ML Inference</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="data-processing" id="data-processing" />
                    <Label htmlFor="data-processing">Data Processing</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Resource Allocation</Label>
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="cpu-allocation">CPU Allocation</Label>
                    <span>{cpuAllocation}%</span>
                  </div>
                  <Slider
                    id="cpu-allocation"
                    min={0}
                    max={100}
                    step={1}
                    value={[cpuAllocation]}
                    onValueChange={(value) => setCpuAllocation(value[0])}
                    className="mt-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="memory-allocation">Memory Allocation</Label>
                    <span>{memoryAllocation}%</span>
                  </div>
                  <Slider
                    id="memory-allocation"
                    min={0}
                    max={100}
                    step={1}
                    value={[memoryAllocation]}
                    onValueChange={(value) => setMemoryAllocation(value[0])}
                    className="mt-2"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="gpu-allocation" checked={useGpu} onCheckedChange={setUseGpu} />
                  <Label htmlFor="gpu-allocation">Use GPU</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="priority">Task Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority" className="mt-2">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="schedule-type">Scheduling Options</Label>
                <Select value={scheduleType} onValueChange={setScheduleType}>
                  <SelectTrigger id="schedule-type" className="mt-2">
                    <SelectValue placeholder="Select scheduling option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate Execution</SelectItem>
                    <SelectItem value="scheduled">Scheduled Execution</SelectItem>
                    <SelectItem value="recurring">Recurring Execution</SelectItem>
                  </SelectContent>
                </Select>
                {scheduleType !== "immediate" && (
                  <div className="mt-4">
                    <Label htmlFor="scheduled-date">Scheduled Date and Time</Label>
                    <Input
                      id="scheduled-date"
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Submit Job</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
