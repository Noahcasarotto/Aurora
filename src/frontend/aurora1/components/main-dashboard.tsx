'use client'

import React, { useState } from "react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Bell, Cpu, HardDrive, Network, Settings } from "lucide-react"

import { submitJob, JobConfiguration } from "@/utils/jobUtils";



import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const utilizationData = [
  { time: "00:00", cpu: 30, memory: 50, network: 20 },
  { time: "04:00", cpu: 45, memory: 55, network: 25 },
  { time: "08:00", cpu: 60, memory: 70, network: 40 },
  { time: "12:00", cpu: 80, memory: 85, network: 65 },
  { time: "16:00", cpu: 70, memory: 80, network: 55 },
  { time: "20:00", cpu: 50, memory: 60, network: 35 },
]

export function MainDashboardComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold">Distributed Compute System</h1>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">Jobs</Button>
          <Button variant="ghost">Monitoring</Button>
          <Button variant="ghost">
            <Settings className="w-5 h-5" />
          </Button>
        </nav>
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Nodes</CardTitle>
              <Network className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18/20</div>
              <p className="text-xs text-muted-foreground">2 nodes disconnected</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Utilization</CardTitle>
              <Cpu className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76%</div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "76%" }}></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Utilization</CardTitle>
              <HardDrive className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">62%</div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "62%" }}></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Task Queue</CardTitle>
              <Bell className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">10 in progress, 15 queued</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={utilizationData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="memory" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="network" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Job Management</CardTitle>
              <CardDescription>Submit and manage distributed computing tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="task-type">Task Type</Label>
                    <Select>
                      <SelectTrigger id="task-type">
                        <SelectValue placeholder="Select task type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="data-processing">Data Processing</SelectItem>
                        <SelectItem value="ml-inference">ML Inference</SelectItem>
                        <SelectItem value="simulation">Simulation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="parameters">Parameters</Label>
                    <Input id="parameters" placeholder="Enter job parameters" />
                  </div>
                </div>
                <Button className="mt-4 w-full">Submit Job</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications and Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="errors">Errors</TabsTrigger>
                  <TabsTrigger value="warnings">Warnings</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      <p className="text-sm">Task failure: Job ID 1234 encountered an error.</p>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      <p className="text-sm">Resource constraint: High CPU usage on Node 3.</p>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <p className="text-sm">Job completed: Data processing task finished successfully.</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="errors">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      <p className="text-sm">Task failure: Job ID 1234 encountered an error.</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="warnings">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      <p className="text-sm">Resource constraint: High CPU usage on Node 3.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
