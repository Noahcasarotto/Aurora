"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for jobs
const mockJobs = [
  { id: "JOB001", type: "Matrix Multiplication", priority: "High", status: "In Progress", startTime: "2023-06-01 10:00", estimatedCompletion: "2023-06-01 11:00", progress: 75 },
  { id: "JOB002", type: "ML Inference", priority: "Medium", status: "Queued", startTime: "2023-06-01 11:00", estimatedCompletion: "2023-06-01 12:00", progress: 0 },
  { id: "JOB003", type: "Data Processing", priority: "Low", status: "Completed", startTime: "2023-06-01 09:00", estimatedCompletion: "2023-06-01 10:00", progress: 100 },
  { id: "JOB004", type: "Matrix Multiplication", priority: "High", status: "Failed", startTime: "2023-06-01 08:00", estimatedCompletion: "2023-06-01 09:00", progress: 50 },
]

// Mock data for resource usage
const mockResourceData = [
  { time: "00:00", cpu: 30, memory: 45 },
  { time: "00:05", cpu: 50, memory: 60 },
  { time: "00:10", cpu: 80, memory: 75 },
  { time: "00:15", cpu: 60, memory: 80 },
  { time: "00:20", cpu: 40, memory: 70 },
]

export function JobMonitoring() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState(null)

  const filteredJobs = mockJobs.filter(job => 
    (statusFilter === "all" || job.status === statusFilter) &&
    (priorityFilter === "all" || job.priority === priorityFilter)
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress": return "bg-blue-500"
      case "Completed": return "bg-green-500"
      case "Failed": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Job Monitoring</h1>
      
      {/* Filter Options */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Queued">Queued</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="priority-filter">Priority</Label>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger id="priority-filter">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="date-range">Date Range</Label>
          <Input id="date-range" type="date" />
        </div>
      </div>
      
      {/* Job List Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Estimated Completion</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.type}</TableCell>
              <TableCell>{job.priority}</TableCell>
              <TableCell>
                <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(job.status)} mr-2`}></span>
                {job.status}
              </TableCell>
              <TableCell>{job.startTime}</TableCell>
              <TableCell>{job.estimatedCompletion}</TableCell>
              <TableCell>
                <Progress value={job.progress} className="w-[60%]" />
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Job Details: {job.id}</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="overview">
                      <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="resources">Resource Usage</TabsTrigger>
                        <TabsTrigger value="logs">Logs</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview">
                        <Card>
                          <CardHeader>
                            <CardTitle>Job Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <dl className="grid grid-cols-2 gap-4">
                              <div>
                                <dt className="font-semibold">Type:</dt>
                                <dd>{job.type}</dd>
                              </div>
                              <div>
                                <dt className="font-semibold">Priority:</dt>
                                <dd>{job.priority}</dd>
                              </div>
                              <div>
                                <dt className="font-semibold">Status:</dt>
                                <dd>{job.status}</dd>
                              </div>
                              <div>
                                <dt className="font-semibold">Progress:</dt>
                                <dd>{job.progress}%</dd>
                              </div>
                              <div>
                                <dt className="font-semibold">Start Time:</dt>
                                <dd>{job.startTime}</dd>
                              </div>
                              <div>
                                <dt className="font-semibold">Estimated Completion:</dt>
                                <dd>{job.estimatedCompletion}</dd>
                              </div>
                            </dl>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="resources">
                        <Card>
                          <CardHeader>
                            <CardTitle>Resource Usage</CardTitle>
                            <CardDescription>CPU and Memory utilization over time</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={{
                                cpu: {
                                  label: "CPU Usage",
                                  color: "hsl(var(--chart-1))",
                                },
                                memory: {
                                  label: "Memory Usage",
                                  color: "hsl(var(--chart-2))",
                                },
                              }}
                              className="h-[300px]"
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockResourceData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="time" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Legend />
                                  <Line type="monotone" dataKey="cpu" stroke="var(--color-cpu)" name="CPU Usage" />
                                  <Line type="monotone" dataKey="memory" stroke="var(--color-memory)" name="Memory Usage" />
                                </LineChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="logs">
                        <Card>
                          <CardHeader>
                            <CardTitle>Job Logs</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[300px]">
                              {`[2023-06-01 10:00:15] INFO: Job started
[2023-06-01 10:00:20] INFO: Initializing resources
[2023-06-01 10:00:25] INFO: Processing data chunk 1/10
[2023-06-01 10:00:30] INFO: Processing data chunk 2/10
[2023-06-01 10:00:35] WARN: High CPU usage detected
[2023-06-01 10:00:40] INFO: Processing data chunk 3/10
...`}
                            </pre>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}