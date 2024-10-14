"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Bell, Cpu, DollarSign, HardDrive, Mail, MessageSquare } from "lucide-react"

export function SettingsPageComponent() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="resource-policies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resource-policies">Resource Policies</TabsTrigger>
          <TabsTrigger value="budget">Budget & Cost</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="cluster">Cluster Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="resource-policies">
          <Card>
            <CardHeader>
              <CardTitle>Resource Policies</CardTitle>
              <CardDescription>Configure default resource limits and task settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpu-limit">Default CPU Limit (cores)</Label>
                <Slider id="cpu-limit" min={1} max={32} step={1} defaultValue={[4]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memory-limit">Default Memory Limit (GB)</Label>
                <Slider id="memory-limit" min={1} max={128} step={1} defaultValue={[16]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-chunk-size">Task Chunk Size (MB)</Label>
                <Input id="task-chunk-size" type="number" defaultValue={64} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority-levels">Default Priority Level</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="priority-levels">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle>Budget and Cost Control</CardTitle>
              <CardDescription>Manage spending limits and budget alerts for cloud resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthly-budget">Monthly Budget ($)</Label>
                <Input id="monthly-budget" type="number" defaultValue={1000} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-alert">Budget Alert Threshold (%)</Label>
                <Slider id="budget-alert" min={50} max={100} step={5} defaultValue={[80]} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="stop-on-limit" />
                <Label htmlFor="stop-on-limit">Stop tasks when budget limit is reached</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Notification Channels</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-notifications" />
                    <Label htmlFor="email-notifications"><Mail className="h-4 w-4 inline mr-1" /> Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sms-notifications" />
                    <Label htmlFor="sms-notifications"><MessageSquare className="h-4 w-4 inline mr-1" /> SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="inapp-notifications" />
                    <Label htmlFor="inapp-notifications"><Bell className="h-4 w-4 inline mr-1" /> In-App</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notification Events</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="task-completion" />
                    <Label htmlFor="task-completion">Task Completion</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="error-alerts" />
                    <Label htmlFor="error-alerts">Error Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="budget-alerts" />
                    <Label htmlFor="budget-alerts">Budget Alerts</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cluster">
          <Card>
            <CardHeader>
              <CardTitle>Cluster Configuration</CardTitle>
              <CardDescription>Manage node configurations and cluster health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Active Nodes</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((node) => (
                    <Card key={node}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Node {node}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2 text-sm">
                          <Cpu className="h-4 w-4" />
                          <span>4 cores</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <HardDrive className="h-4 w-4" />
                          <span>16 GB RAM</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-green-500" />
                          <span>Healthy</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-node">Add New Node</Label>
                <div className="flex space-x-2">
                  <Input id="add-node" placeholder="Node IP Address" />
                  <Button>Add Node</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}