// aurora1/utils/jobUtils.ts

export interface JobConfiguration {
    jobType: string;
    cpuAllocation: number;
    memoryAllocation: number;
    useGpu: boolean;
    priority: string;
    scheduleType: string;
    scheduledDate?: string;
  }
  
  export const submitJob = async (config: JobConfiguration) => {
    // Simulate a backend API call
    try {
      console.log("Job Submitted:", config);
      // If you have a backend API, replace this with an actual HTTP call, for example:
      // const response = await fetch('/api/submitJob', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config),
      // });
      // const data = await response.json();
      // return data;
    } catch (error) {
      console.error("Error submitting job:", error);
    }
  };
  